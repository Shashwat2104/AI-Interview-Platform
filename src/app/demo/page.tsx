'use client';

import { Building2, GraduationCap, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

export default function DemoPage() {
  const t = useTranslations('Demo');
  return (
    <div className="min-h-screen relative">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-40"></div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-[url('/patterns/waves.svg')] bg-repeat opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t('page.title')}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('page.description')}</p>
        </div>

        {/* Book a Demo CTA */}
        <div className="text-center mb-10">
          <Link href="/demo/book">
            <Button
              size="lg"
              variant="default"
              className="gap-3 text-lg font-medium px-8 h-14 bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <Sparkles className="h-6 w-6" />
              {t('page.bookPersonalizedDemo')}
            </Button>
          </Link>
        </div>

        {/* Demo Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-7p-xl mx-auto">
          {/* Recruiter Demo */}
          <div className="rounded-xl border bg-card shadow-lg overflow-hidden">
            <div className="aspect-video w-full relative">
              <iframe
                src="https://www.youtube.com/embed/WeKwq_9FSSI?si=zGqAo0q_hXc4J_ar"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">{t('sections.recruiter.title')}</h2>
              </div>
              <p className="text-muted-foreground">{t('sections.recruiter.description')}</p>
            </div>
          </div>
          {/* Candidate Demo */}
          <div className="rounded-xl border bg-card shadow-lg overflow-hidden">
            <div className="aspect-video w-full relative">
              <iframe
                src="https://www.youtube.com/embed/__lHYyjGtBM?si=WS1NzXx6UpIH7DQs"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">{t('sections.candidate.title')}</h2>
              </div>
              <p className="text-muted-foreground">{t('sections.candidate.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
