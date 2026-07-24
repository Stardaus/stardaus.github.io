import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { ContactForm } from '../../src/components/forms/ContactForm';
import * as contactHook from '../../src/hooks/useContactForm';

vi.mock('../../src/hooks/useContactForm');

describe('ContactForm component', () => {
  const mockSubmitForm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (contactHook.useContactForm as any).mockReturnValue({
      isSubmitting: false,
      isSuccess: false,
      error: null,
      submitForm: mockSubmitForm,
    });
  });

  test('should show inline validation errors for empty submissions', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeDefined();
      expect(screen.getByText(/please enter a valid email address/i)).toBeDefined();
      expect(screen.getByText(/subject must be at least 5 characters/i)).toBeDefined();
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeDefined();
    });
  });

  test('should trigger submitForm hook on valid form submit', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Project Request' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Please build my website.' } });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Project Request',
        message: 'Please build my website.',
      });
    });
  });

  test('should render success alert when isSuccess is true', () => {
    (contactHook.useContactForm as any).mockReturnValue({
      isSubmitting: false,
      isSuccess: true,
      error: null,
      submitForm: mockSubmitForm,
    });

    render(<ContactForm />);
    expect(screen.getByText(/message sent successfully/i)).toBeDefined();
  });
});
