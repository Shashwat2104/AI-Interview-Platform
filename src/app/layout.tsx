import './globals.css';

import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

import { FloatingControls } from '@/components/floating-controls';
import MicrosoftClarity from '@/lib/microsoft-clarity';
import PostHogScript from '@/lib/posthog-script';
import RootProvider from '@/provider/root-provider';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Hirelytics - AI Interview Platform for Modern Hiring',
  description:
    'Our AI-driven platform transforms the recruitment process from job posting to candidate selection. Automate interviews, analyze resumes, and make data-driven hiring decisions.',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' }],
    apple: '/images/favicon.svg',
  },
  authors: [{ name: 'Shashwat', url: 'https://github.com/Shashwat2104' }],
  // manifest: "/manifest.json",
  // themeColor: "#0C4A6E",
  // openGraph: {
  //   title: "Hirelytics - AI Interview Platform for Modern Hiring",
  //   description:
  //     "Transform your hiring process with AI-powered interviews and candidate analysis",
  //   images: ["/images/hirelytics-logo.svg"],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Hirelytics - AI Interview Platform for Modern Hiring",
  //   description:
  //     "Transform your hiring process with AI-powered interviews and candidate analysis",
  //   images: ["/images/hirelytics-logo.svg"],
  // },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="author" content="Shashwat" />
        <meta property="og:site_name" content="Hirelytics by Shashwat" />
        <meta name="twitter:creator" content="@Shashwat" />
        <script dangerouslySetInnerHTML={{ __html: `console.log('Developed by Shashwat')` }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextTopLoader color="hsl(var(--primary))" />
        <RootProvider>
          <div className="relative flex min-h-screen flex-col">
            <FloatingControls />
            <MicrosoftClarity />
            <PostHogScript />
            <Analytics />
            {/* Easter Egg: Press 'D' to see developer credit */}
            {/* Easter Egg and SplashScreen are client components, so render them only in client-side trees */}
            {/* <EasterEgg /> and <SplashScreen /> should be imported and rendered in a client boundary, not here */}
            <div className="flex-1">{children}</div>
          </div>
          <Toaster richColors />
        </RootProvider>
      </body>
    </html>
  );
}
