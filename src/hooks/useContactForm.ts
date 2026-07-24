import { useState } from 'react';
import { ContactFormInput, Web3FormsPayload, Web3FormsResponse } from '../types/contact';

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (data: ContactFormInput) => {
    setIsSubmitting(true);
    setIsSuccess(false);
    setError(null);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';
    
    const payload: Web3FormsPayload = {
      ...data,
      access_key: accessKey,
      botcheck: false,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result: Web3FormsResponse = await response.json();

      if (result.success) {
        setIsSuccess(true);
      } else {
        setError(result.message || 'Submission failed');
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        setError('Request timed out. Please try emailing directly.');
      } else {
        setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    isSuccess,
    error,
    submitForm,
  };
}
