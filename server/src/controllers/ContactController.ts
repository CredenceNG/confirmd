import {
  BadRequestError,
  Body,
  Get,
  InternalServerError,
  JsonController,
  Post,
} from "routing-controllers";
import { Service } from "typedi";

import { EmailService } from "../utils/EmailService";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

@JsonController("/contact")
@Service()
export class ContactController {
  private emailService: EmailService;

  public constructor() {
    this.emailService = new EmailService();
  }

  @Get("/test-smtp")
  public async testSmtpConnection() {
    try {
      const isConnected = await this.emailService.testConnection();
      return {
        success: isConnected,
        message: isConnected
          ? "SMTP connection successful"
          : "SMTP connection failed",
      };
    } catch (error) {
      console.error("SMTP test error:", error);
      return {
        success: false,
        message: "SMTP connection test failed",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  @Post("/send-email")
  public async sendContactEmail(@Body() contactData: ContactFormData) {
    try {
      const { name, email, phone, subject, message } = contactData;

      // Validate required fields
      if (!name || !email || !subject || !message) {
        throw new BadRequestError(
          "Missing required fields: name, email, subject, and message are required"
        );
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new BadRequestError("Invalid email format");
      }

      // Log the contact form submission
      console.log("Contact form submission received:", {
        name,
        email,
        phone,
        subject,
        message,
        timestamp: new Date().toISOString(),
      });

      // Attempt to send email to admin
      let emailSent = false;
      try {
        emailSent = await this.emailService.sendContactFormEmail({
          name,
          email,
          phone,
          subject,
          message,
        });
      } catch (error) {
        console.error("Failed to send contact form email:", error);
        // Continue execution - don't fail the entire request if email fails
      }

      if (!emailSent) {
        console.log(
          "Email delivery failed, but form submission was logged successfully"
        );
        // In production, you might want to store this in a database
        // or send to a backup notification system
      }

      // Return success response regardless of email status
      return {
        success: true,
        message:
          "Your message has been received! We will get back to you soon.",
        data: {
          name,
          email,
          subject,
          timestamp: new Date().toISOString(),
          // Don't expose email status to the user to maintain good UX
        },
      };
    } catch (error) {
      console.error("Error processing contact form:", error);
      if (error instanceof BadRequestError) {
        throw error;
      }
      throw new InternalServerError(
        "Failed to send your message. Please try again later."
      );
    }
  }
}
