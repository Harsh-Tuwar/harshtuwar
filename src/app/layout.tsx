import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from './providers';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DottedSvgs from '@/components/DottedSvgs';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Harsh Tuwar | Senior Software Developer',
  description: 'Harsh Tuwar is a full stack senior developer with 5+ years of experience. This is his portfolio website.',
  robots: 'index, follow, max-snippet:-1, max-image-preview: -1, max-video-preview:-1',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <DottedSvgs />
          <main>
            {children}
            <SpeedInsights />
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
