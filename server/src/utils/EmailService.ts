import nodemailer from 'nodemailer'

export interface EmailOptions {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export class EmailService {
  private transporter: nodemailer.Transporter

  public constructor() {
    // Log the configuration being used (without exposing sensitive data)
    console.log('SMTP Configuration:', {
      host: process.env['SMTP-Server'] || 'smtp-relay.brevo.com',
      port: parseInt(process.env['SMTP-Port'] || '587'),
      user: process.env['SMTP-Login'] || '',
      hasApiKey: !!(process.env['SMTP-APIKEY'] || ''),
    })

    // Create transporter using the SMTP configuration from environment variables
    this.transporter = nodemailer.createTransport({
      host: process.env['SMTP-Server'] || 'smtp-relay.brevo.com',
      port: parseInt(process.env['SMTP-Port'] || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env['SMTP-Login'] || '',
        pass: process.env['SMTP-APIKEY'] || '',
      },
      tls: {
        rejectUnauthorized: false, // Accept self-signed certificates
      },
      debug: false, // Disable debug logging for now
      logger: false, // Disable logging
    })
  }

  public async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: {
          name: 'Confirmed Person Contact Form',
          address: process.env['SMTP-Login'] || 'noreply@confirmedperson.com',
        },
        to: options.to,
        subject: options.subject,
        html: options.html,
        replyTo: options.replyTo,
      }

      const info = await this.transporter.sendMail(mailOptions)
      console.log('Email sent successfully:', info.messageId)
      return true
    } catch (error) {
      console.error('Failed to send email:', error)
      return false
    }
  }

  public async sendContactFormEmail(formData: {
    name: string
    email: string
    phone?: string
    subject: string
    message: string
  }): Promise<boolean> {
    const adminEmail = process.env.ADMIN_EMAIL || 'hello@confirmedperson.com' // Configurable via env var

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background-color: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .field-label { font-weight: bold; color: #1e40af; }
          .field-value { margin-top: 5px; padding: 10px; background-color: white; border-radius: 4px; border-left: 4px solid #ea580c; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>You have received a new message through the Confirmed Person contact form.</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Name:</div>
              <div class="field-value">${formData.name}</div>
            </div>
            <div class="field">
              <div class="field-label">Email:</div>
              <div class="field-value">${formData.email}</div>
            </div>
            ${
              formData.phone
                ? `
            <div class="field">
              <div class="field-label">Phone:</div>
              <div class="field-value">${formData.phone}</div>
            </div>
            `
                : ''
            }
            <div class="field">
              <div class="field-label">Subject:</div>
              <div class="field-value">${formData.subject}</div>
            </div>
            <div class="field">
              <div class="field-label">Message:</div>
              <div class="field-value">${formData.message.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="field">
              <div class="field-label">Submitted on:</div>
              <div class="field-value">${new Date().toLocaleString()}</div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent automatically from the Confirmed Person contact form.</p>
            <p>Please reply directly to ${formData.email} to respond to this inquiry.</p>
          </div>
        </div>
      </body>
      </html>
    `

    return this.sendEmail({
      to: adminEmail,
      subject: `Contact Form: ${formData.subject} - From ${formData.name}`,
      html: htmlContent,
      replyTo: formData.email,
    })
  }

  public async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify()
      console.log('SMTP connection verified successfully')
      return true
    } catch (error) {
      console.error('SMTP connection failed:', error)
      return false
    }
  }
}
