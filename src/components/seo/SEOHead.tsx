import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  publishDate?: string;
  tags?: string[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl = 'https://portfolio.example.com',
  ogImage = '/og-image.png',
  type = 'website',
  publishDate,
  tags = [],
}) => {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = `${title} | Portfolio & Showcase`;
    document.title = fullTitle;

    // Helper to create or update meta tags
    const setMeta = (selector: string, attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Set Standard Meta Tags
    setMeta('meta[name="description"]', 'name', 'description', description);

    // 3. Set OpenGraph Meta Tags
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);

    // 4. Set Twitter Meta Tags
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 5. Set Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. Set JSON-LD Structured Data
    let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }

    const jsonLdPayload =
      type === 'article'
        ? {
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: title,
            description,
            image: ogImage,
            datePublished: publishDate,
            keywords: tags.join(', '),
            author: {
              '@type': 'Person',
              name: 'Software Engineer',
            },
          }
        : {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: title,
            description,
            url: canonicalUrl,
            jobTitle: 'Full-Stack Software Engineer',
            knowsAbout: ['React', 'TypeScript', 'Software Architecture', 'Swiss Design'],
          };

    scriptTag.textContent = JSON.stringify(jsonLdPayload);
  }, [title, description, canonicalUrl, ogImage, type, publishDate, tags]);

  return null;
};
