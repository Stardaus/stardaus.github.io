import React from 'react';
import { useForm } from 'react-hook-form';
import { ContactFormSchema, ContactFormInput } from '../../types/contact';
import { useContactForm } from '../../hooks/useContactForm';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

const zodResolver = (schema: typeof ContactFormSchema) => async (values: any) => {
  const result = schema.safeParse(values);
  if (result.success) {
    return { values: result.data, errors: {} };
  }
  
  const errors: Record<string, any> = {};
  result.error.issues.forEach((issue) => {
    const path = issue.path[0] as string;
    errors[path] = {
      type: issue.code,
      message: issue.message,
    };
  });
  return { values: {}, errors };
};

export const ContactForm: React.FC = () => {
  const { isSubmitting, isSuccess, error, submitForm } = useContactForm();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormInput) => {
    await submitForm(data);
    if (!error) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6 font-sans">
      {isSuccess && (
        <div className="p-4 swiss-border border-swiss-accent bg-swiss-accent/5 text-swiss-accent font-mono text-xs uppercase tracking-wide">
          ✓ Message sent successfully. I will get back to you shortly.
        </div>
      )}
      
      {error && (
        <div className="p-4 border-1 border-swiss-accent bg-swiss-accent text-swiss-white font-mono text-xs uppercase tracking-wide">
          ⚠ Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="name"
          label="Name"
          placeholder="Your name"
          error={errors.name?.message}
          disabled={isSubmitting}
          {...register('name')}
        />
        
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="your.email@example.com"
          error={errors.email?.message}
          disabled={isSubmitting}
          {...register('email')}
        />
      </div>

      <Input
        id="subject"
        label="Subject"
        placeholder="What is this inquiry about?"
        error={errors.subject?.message}
        disabled={isSubmitting}
        {...register('subject')}
      />

      <Input
        id="message"
        label="Message"
        type="textarea"
        placeholder="Write your message here..."
        error={errors.message?.message}
        disabled={isSubmitting}
        rows={6}
        {...register('message')}
      />

      <div className="flex justify-end mt-2">
        <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full md:w-auto">
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
};
