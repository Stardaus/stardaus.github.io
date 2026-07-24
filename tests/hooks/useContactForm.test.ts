import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { useContactForm } from '../../src/hooks/useContactForm';

describe('useContactForm hook', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    // Mock import.meta.env
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-access-key');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should submit successfully with valid input', async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({ success: true, message: 'Submitted successfully' }),
    };
    (fetch as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useContactForm());

    let promise;
    act(() => {
      promise = result.current.submitForm({
        name: 'Jane Doe',
        email: 'jane@example.com',
        subject: 'Collaboration',
        message: 'Hello, I want to collaborate.',
      });
    });

    expect(result.current.isSubmitting).toBe(true);

    await act(async () => {
      await promise;
    });

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.error).toBeNull();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('should handle API failure response', async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({ success: false, message: 'Invalid access key' }),
    };
    (fetch as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useContactForm());

    let promise;
    act(() => {
      promise = result.current.submitForm({
        name: 'Jane Doe',
        email: 'jane@example.com',
        subject: 'Collaboration',
        message: 'Hello, I want to collaborate.',
      });
    });

    await act(async () => {
      await promise;
    });

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.error).toBe('Invalid access key');
  });
});
