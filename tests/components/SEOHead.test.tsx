import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import { SEOHead } from '../../src/components/seo/SEOHead';

describe('SEOHead component', () => {
  beforeEach(() => {
    document.title = '';
    document.head.innerHTML = '';
  });

  test('updates document title, description, and OpenGraph meta tags', () => {
    render(
      <SEOHead
        title="Custom Page Title"
        description="Custom description for SEO testing."
        canonicalUrl="https://example.com/custom"
        ogImage="https://example.com/og.png"
      />
    );

    expect(document.title).toBe('Custom Page Title | Portfolio & Showcase');

    const descMeta = document.querySelector('meta[name="description"]');
    expect(descMeta?.getAttribute('content')).toBe('Custom description for SEO testing.');

    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle?.getAttribute('content')).toBe('Custom Page Title');

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe('https://example.com/custom');

    const jsonLd = document.querySelector('script[type="application/ld+json"]');
    expect(jsonLd).not.toBeNull();
    expect(jsonLd?.textContent).toContain('Custom Page Title');
  });
});
