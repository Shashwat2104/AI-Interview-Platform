'use client';

import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('HomePage');

  return (
    <footer className="w-full bg-card py-16 relative overflow-hidden">
      {/* Developer Credit */}
      <div className="absolute top-2 right-4 z-20 text-xs text-muted-foreground">
        Developed by{' '}
        <a
          href="https://github.com/Shashwat2104"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary"
        >
          Shashwat
        </a>
      </div>
      {/* Background gradients and patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background/80"></div>
        <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[80px] animate-pulse-slow"></div>
        <div
          className="absolute bottom-0 left-0 h-[250px] w-[250px] rounded-full bg-blue-600/10 dark:bg-blue-500/10 blur-[80px] animate-pulse-slow"
          style={{ animationDelay: '2s' }}
        ></div>
        <div className="h-full w-full bg-[url('/patterns/dots.svg')] bg-repeat opacity-10"></div>

        {/* Additional light effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.05),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <div className="mb-6 flex items-center justify-center">
            <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="text-primary" size={20} />
            </div>
            <h2 className="text-2xl font-bold">{t('title')}</h2>
          </div>
          <p className="max-w-md text-center text-muted-foreground">{t('footer.description')}</p>
          <div className="mt-4 text-sm">
            <a href="/credits" className="underline hover:text-primary">
              Meet the Developer
            </a>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('footer.platform.title')}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/#features"
                  className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                >
                  <span>{t('footer.platform.features')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                >
                  <span>{t('footer.platform.howItWorks')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/learn-more"
                  className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                >
                  <span>{t('footer.platform.learnMore')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                >
                  <span>{t('footer.platform.wishlist')}</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('footer.forRecruiters.title')}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/login/recruiter"
                  className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                >
                  <span>{t('footer.forRecruiters.login')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/register/recruiter"
                  className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                >
                  <span>{t('footer.forRecruiters.register')}</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('footer.forCandidates.title')}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                >
                  <span>{t('footer.forCandidates.findJobs')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/login/candidate"
                  className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                >
                  <span>{t('footer.forCandidates.login')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/register/candidate"
                  className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                >
                  <span>{t('footer.forCandidates.register')}</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('footer.company.title')}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                >
                  <span>{t('footer.company.aboutUs')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                >
                  <span>{t('footer.company.contact')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                >
                  <span>{t('footer.company.privacyPolicy')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                >
                  <span>{t('footer.company.termsOfService')}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center">
          <div className="mb-4 flex justify-center space-x-6">
            <Link
              href="https://www.linkedin.com/in/shashwat-mahendra-214598163/"
              target="_blank"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
            <Link
              href="https://github.com/shashwat2104/"
              target="_blank"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
              </svg>
            </Link>
            <Link
              href="https://leetcode.com/u/shashwatmahender2104/"
              target="_blank"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M21.7 13.35l-9-9a1 1 0 0 0-1.4 0l-7.65 7.65a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l7.65-7.65a1 1 0 0 0 0-1.4zm-8.35 7.65l-8-8 7-7 8 8-7 7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <p className="text-xs mt-2 text-muted-foreground">Made with ❤️ by Shashwat</p>
        </div>
      </div>
    </footer>
  );
}
