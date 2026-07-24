import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid email address'),
  subject: z.string().trim().min(5, 'Subject must be at least 5 characters'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

export interface Web3FormsPayload extends ContactFormInput {
  access_key: string;
  botcheck: boolean; // Honeypot spam protection
}

export interface Web3FormsResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}
