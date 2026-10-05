'use client';

import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  MessageSquareText,
  Quote,
  Sparkles,
  Star,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { CSSProperties } from 'react';

import { ComparisonSection } from '@/components/landing/comparison-section';
import { FaqSection } from '@/components/landing/faq-section';
import { FeaturesGrid } from '@/components/landing/features-grid';
import { HeroStage } from '@/components/landing/hero-stage';
import { InteractiveSandbox } from '@/components/landing/interactive-sandbox';
import { LandingHeader } from '@/components/landing/landing-header';
import { LandingNav } from '@/components/landing/landing-nav';
import { TelemetryBar } from '@/components/landing/telemetry-bar';
import { WorkflowStory } from '@/components/landing/workflow-story';
import { Reveal } from '@/components/shared/reveal';
import { SpotlightCard } from '@/components/shared/spotlight-card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/ui/footer';
import { useLiveWhenVisible } from '@/lib/motion';

/** Inline custom property for staggered word-cycle timing */
function cycleIndex(index: number): CSSProperties {
  return { '--cycle-index': index } as CSSProperties;
}

export default function Home() {
  const t = useTranslations('HomePage');
  const common = useTranslations('Common');
  const { ref: heroRef, live: heroLive } = useLiveWhenVisible<HTMLElement>('160px 0px');

  const heroWords = t('hero.revolutionizeHiring').split(' ');
  const rotatingPhrases = [
    t('hero.typingAnimation.smartRecruitment'),
    t('hero.typingAnimation.automatedInterviews'),
    t('hero.typingAnimation.aiPowered'),
    t('hero.typingAnimation.futureHiring'),
  ];

  const storySteps = [1, 2, 3, 4, 5, 6].map((step) => {
    const key = `step${step}` as 'step1' | 'step2' | 'step3' | 'step4' | 'step5' | 'step6';
    return {
      title: t(`howItWorks.steps.${key}.title`),
      description: t(`howItWorks.steps.${key}.description`),
      cardTitle: t(`howItWorks.steps.${key}.cardTitle`),
      label: t(`howItWorks.steps.${key}.label`),
    };
  });

  const testimonials = [
    {
      quote: t('testimonials.items.0.quote'),
      name: t('testimonials.items.0.name'),
      role: t('testimonials.items.0.role'),
      company: t('testimonials.items.0.company'),
      rating: 5,
    },
    {
      quote: t('testimonials.items.1.quote'),
      name: t('testimonials.items.1.name'),
      role: t('testimonials.items.1.role'),
      company: t('testimonials.items.1.company'),
      rating: 5,
    },
    {
      quote: t('testimonials.items.2.quote'),
      name: t('testimonials.items.2.name'),
      role: t('testimonials.items.2.role'),
      company: t('testimonials.items.2.company'),
      rating: 5,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* ------------------------------------------------------------------
          Header & Navigation
      ------------------------------------------------------------------- */}
      <LandingHeader className="enter-fade">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
            aria-label="Hirelytics home"
          >
            <div className="relative flex size-8 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/images/hirelytics-logo.svg"
                alt="Hirelytics logo"
                width={28}
                height={28}
                priority
                className="size-7 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base font-bold tracking-tight text-white">
                Hirelytics
              </span>
              <span className="text-[10px] font-mono tracking-wider text-brand-cyan uppercase -mt-1 hidden sm:block">
                AI Platform
              </span>
            </div>
          </Link>

          <LandingNav
            links={[
              { href: '#features', label: t('featuresSection.title') },
              { href: '#how-it-works', label: t('howItWorks.title') },
              { href: '#sandbox', label: 'Live Simulator' },
              { href: '#comparison', label: 'Advantage' },
              { href: '#faq', label: 'FAQ' },
              { href: '/jobs', label: t('userAccess.findJobs') },
            ]}
            cta={{ href: '/login', label: common('buttons.getStarted') }}
          />
        </div>
      </LandingHeader>

      <main className="flex-1">
        {/* ------------------------------------------------------------------
            Hero Section — Brand Environment & Interactive Stage
        ------------------------------------------------------------------- */}
        <section
          ref={heroRef}
          data-live={heroLive}
          className="brand-field relative overflow-hidden border-b border-brand-blue/40 pb-16 pt-8 sm:pb-24 sm:pt-14"
        >
          {/* Subtle grid texture & dot mask */}
          <div aria-hidden="true" className="grid-veil absolute inset-0" />
          <div
            aria-hidden="true"
            className="bg-dots-fade absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:24px_24px] opacity-75"
          />

          {/* Ambient light blooms */}
          <div
            aria-hidden="true"
            className="live-anim glow-drift glow-cyan pointer-events-none absolute -top-40 left-[8%] h-[32rem] w-[36rem] rounded-full blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="live-anim glow-drift-slow glow-blue pointer-events-none absolute -bottom-32 right-[4%] h-[26rem] w-[32rem] rounded-full blur-[110px]"
          />

          {/* Background orbital motif from logo */}
          <div
            aria-hidden="true"
            className="live-anim orbit-ring pointer-events-none absolute top-1/4 -left-20 hidden h-80 w-80 rounded-full border border-dashed border-white/10 lg:block"
          />

          {/* Bottom fade into canvas */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-background" />

          <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            {/* Left Column: Typography & CTAs */}
            <div>
              <div className="enter enter-d1 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white shadow-xs backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="live-anim absolute inline-flex size-full animate-ping rounded-full bg-brand-cyan opacity-80 motion-reduce:hidden" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand-cyan" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-brand-cyan mr-1">
                  Autonomous Engine v4
                </span>
                <span className="text-white/40">&bull;</span>
                <span className="word-cycle font-medium text-white">
                  {rotatingPhrases.map((phrase, index) => (
                    <span key={phrase} style={cycleIndex(index)}>
                      {phrase}
                    </span>
                  ))}
                </span>
              </div>

              <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
                {heroWords.map((word, index) => (
                  <span
                    key={`${word}-${index}`}
                    className="hero-word mr-[0.24em]"
                    style={{ animationDelay: `${100 + index * 50}ms` }}
                  >
                    {word}
                  </span>
                ))}
                <span className="bg-gradient-to-r from-brand-cyan via-white to-brand-cyan bg-clip-text text-transparent block mt-1">
                  {t('hero.typingAnimation.smartRecruitment')}
                </span>
              </h1>

              <p className="enter enter-fade enter-d3 mt-6 max-w-xl text-base text-white/80 leading-relaxed sm:text-lg text-pretty">
                {t('hero.description')}
              </p>

              {/* Action Buttons */}
              <div className="enter enter-fade enter-d4 mt-8 flex flex-wrap items-center gap-3.5">
                <Button
                  asChild
                  size="lg"
                  className="sweep btn-glow group bg-brand-cyan text-brand-deep hover:bg-brand-cyan/95 font-semibold shadow-lg shadow-brand-cyan/25 cursor-pointer"
                >
                  <Link href="/login">
                    {common('buttons.getStarted')}
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  className="border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white cursor-pointer"
                >
                  <a href="#sandbox">
                    <Sparkles className="size-4 text-brand-cyan mr-1.5" />
                    Test Live Simulator
                  </a>
                </Button>
              </div>

              {/* Trust & Quick Portal Links */}
              <div className="enter enter-fade enter-d5 mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs text-white/75 font-medium">
                <Link
                  href="/login/candidate"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <User className="size-3.5 text-brand-cyan" />
                  {t('userAccess.candidateLogin')}
                </Link>
                <span aria-hidden="true" className="h-3 w-px bg-white/20" />
                <Link
                  href="/login/recruiter"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <Building2 className="size-3.5 text-brand-cyan" />
                  {t('userAccess.recruiterLogin')}
                </Link>
                <span aria-hidden="true" className="h-3 w-px bg-white/20" />
                <Link
                  href="/demo/book"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <MessageSquareText className="size-3.5 text-brand-cyan" />
                  {t('demo.bookDemo')}
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive Product Cockpit */}
            <HeroStage className="lg:justify-self-end mt-4 lg:mt-0" />
          </div>
        </section>

        {/* ------------------------------------------------------------------
            Enterprise Telemetry Bar
        ------------------------------------------------------------------- */}
        <TelemetryBar />

        {/* ------------------------------------------------------------------
            Features Grid
        ------------------------------------------------------------------- */}
        <FeaturesGrid
          eyebrow={t('featuresSection.title')}
          title={t('featuresSection.subtitle')}
          description={t('featuresSection.description')}
        />

        {/* ------------------------------------------------------------------
            Workflow Story (How It Works)
        ------------------------------------------------------------------- */}
        <WorkflowStory
          eyebrow={t('howItWorks.title')}
          title={t('howItWorks.subtitle')}
          description={t('howItWorks.description')}
          steps={storySteps}
        />

        {/* ------------------------------------------------------------------
            Interactive Live Sandbox / Evaluation Simulator
        ------------------------------------------------------------------- */}
        <InteractiveSandbox />

        {/* ------------------------------------------------------------------
            Comparison Section (Traditional vs Hirelytics)
        ------------------------------------------------------------------- */}
        <div id="comparison">
          <ComparisonSection />
        </div>

        {/* ------------------------------------------------------------------
            Testimonials / Success Stories
        ------------------------------------------------------------------- */}
        <section className="atmosphere-light border-t py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold tracking-wide uppercase text-brand-cyan">
                {t('testimonials.title')}
              </p>
              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl text-foreground">
                {t('testimonials.subtitle')}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                {t('testimonials.description')}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Reveal key={testimonial.name} delay={index * 90} className="h-full">
                  <SpotlightCard className="card-interactive card-beam relative flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-lg hover:shadow-brand-cyan/10">
                    <div>
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="size-4 fill-amber-400" />
                        ))}
                      </div>

                      <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>
                    </div>

                    <figcaption className="mt-6 flex items-center gap-3 border-t pt-4">
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </figcaption>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            Interactive FAQ Section
        ------------------------------------------------------------------- */}
        <FaqSection />

        {/* ------------------------------------------------------------------
            Closing CTA
        ------------------------------------------------------------------- */}
        <section className="px-4 pb-16 sm:px-6 md:pb-24 pt-6">
          <Reveal variant="scale" className="mx-auto w-full max-w-6xl">
            <div className="brand-field relative overflow-hidden rounded-3xl px-6 py-16 text-center md:py-24 shadow-2xl">
              <div aria-hidden="true" className="grid-veil absolute inset-0" />
              <div
                aria-hidden="true"
                className="live-anim orbit-arc pointer-events-none absolute -top-24 -right-20 size-64"
              />
              <div
                aria-hidden="true"
                className="live-anim glow-drift glow-cyan pointer-events-none absolute -bottom-24 left-[10%] size-80 rounded-full blur-[100px]"
              />

              <div className="relative z-10 max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-brand-cyan backdrop-blur-md">
                  <Sparkles className="size-3.5" />
                  Zero Friction Setup
                </span>

                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl text-balance">
                  {t('cta.title')}
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-white/80 text-pretty">
                  {t('cta.description')}
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3.5">
                  <Button
                    asChild
                    size="lg"
                    className="sweep btn-glow group bg-brand-cyan text-brand-deep hover:bg-brand-cyan/95 font-semibold shadow-lg shadow-brand-cyan/30 cursor-pointer"
                  >
                    <Link href="/login">
                      {common('buttons.getStarted')}
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white cursor-pointer"
                  >
                    <a href="#how-it-works">
                      <Sparkles className="size-4 mr-1.5 text-brand-cyan" />
                      {t('cta.learnMore')}
                    </a>
                  </Button>
                </div>

                <p className="mt-6 text-xs text-white/60 font-medium">{t('cta.noCreditCard')}</p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
