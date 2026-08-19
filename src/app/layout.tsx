import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BackgroundCanvas } from '@/components/ui/BackgroundCanvas';
import { ProjectDetailModal } from '@/components/sections/ProjectDetailModal';
import { personalDetails } from '@/data/portfolioData';

export const metadata: Metadata = {
  metadataBase: new URL('https://samsul-arefin.dev'),
  title: `${personalDetails.name} | Web Developer & Frontend Specialist`,
  description: personalDetails.bio,
  keywords: [
    'Samsul Arefin',
    'Web Developer',
    'Frontend Developer',
    'Next.js Specialist',
    'React Developer',
    'TypeScript',
    'Tailwind CSS',
    'Portfolio',
    'Dhaka Bangladesh',
  ],
  authors: [{ name: personalDetails.name }],
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: `${personalDetails.name} | Web Developer Portfolio`,
    description: personalDetails.bio,
    type: 'website',
    locale: 'en_US',
    siteName: `${personalDetails.name} Portfolio`,
    images: [
      {
        url: personalDetails.avatar,
        width: 800,
        height: 800,
        alt: personalDetails.name,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-bg text-slate-100 antialiased relative min-h-screen">
        <Providers>
          <BackgroundCanvas />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
          <ProjectDetailModal />
        </Providers>
      </body>
    </html>
  );
}
