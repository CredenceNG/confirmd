import type { AxiosResponse } from 'axios'

import { apiCall } from './BaseUrl'

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
  data?: {
    name: string
    email: string
    subject: string
    timestamp: string
  }
}

export const sendContactForm = async (formData: ContactFormData): Promise<AxiosResponse<ContactResponse>> => {
  console.log('[ContactApi] Sending contact form:', {
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
  })
  try {
    const response = await apiCall.post<ContactResponse>('/demo/contact/send-email', formData)
    console.log('[ContactApi] Contact form sent successfully:', response.data)
    return response
  } catch (error) {
    console.error('[ContactApi] Failed to send contact form:', error)
    throw error
  }
}
