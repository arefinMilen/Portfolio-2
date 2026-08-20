import React from 'react';
import { personalDetails } from '@/data/portfolioData';

export function JsonLd() {
  const baseUrl = 'https://samsul-arefin.dev';
  
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalDetails.name,
    jobTitle: 'Software Engineer & Full-Stack Developer',
    description: personalDetails.bio,
    url: baseUrl,
    image: `${baseUrl}${personalDetails.avatar}`,
    email: personalDetails.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'Bangladesh',
    },
    sameAs: [
      personalDetails.github,
      personalDetails.linkedin,
      personalDetails.youtube,
      personalDetails.facebook,
    ],
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'Agentic AI',
      'Claude Agent',
      'PostgreSQL',
      'MongoDB',
      'Tailwind CSS',
      'Full-Stack Web Development',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'AppifyDevs',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${personalDetails.name} Portfolio`,
    url: baseUrl,
    description: personalDetails.bio,
    author: {
      '@type': 'Person',
      name: personalDetails.name,
    },
    inLanguage: ['en', 'bn'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
