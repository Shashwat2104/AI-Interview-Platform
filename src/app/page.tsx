'use client';

import {
  ArrowRight,
  Briefcase,
  Building2,
  ClipboardCheck,
  FileText,
  LineChart,
  Link2,
  MessageSquareText,
  Upload,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { LandingHeader } from '@/components/landing/landing-header';
import { Reveal } from '@/components/shared/reveal';
import { SpotlightCard } from '@/components/shared/spotlight-card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/ui/footer';

export default function Home() {
  const t = useTranslations('HomePage');
  const common = useTranslations('Common');

  const features = [
    {
      icon: FileText,
      title: t('featuresSection.smartJobPosting.title'),
      description: t('featuresSection.smartJobPosting.description'),
    },
    {
      icon: Link2,
      title: t('featuresSection.uniqueApplicationLinks.title'),
      description: t('featuresSection.uniqueApplicationLinks.description'),
    },
    {
      icon: Upload,
      title: t('featuresSection.resumeAnalysis.title'),
      description: t('featuresSection.resumeAnalysis.description'),
    },
    {
      icon: MessageSquareText,
      title: t('featuresSection.aiPoweredInterviews.title'),
      description: t('featuresSection.aiPoweredInterviews.description'),
    },
    {
      icon: ClipboardCheck,
      title: t('featuresSection.comprehensiveFeedback.title'),
      description: t('featuresSection.comprehensiveFeedback.description'),
    },
    {
      icon: LineChart,
      title: t('featuresSection.dataDrivenInsights.title'),
      description: t('featuresSection.dataDrivenInsights.description'),
    },
  ];

  const steps = [
    {
      title: t('howItWorks.steps.step1.title'),
      description: t('howItWorks.steps.step1.description'),
    },
    {
      title: t('howItWorks.steps.step2.title'),
      description: t('howItWorks.steps.step2.description'),
    },
    {
      title: t('howItWorks.steps.step3.title'),
      description: t('howItWorks.steps.step3.description'),
    },
    {
      title: t('howItWorks.steps.step4.title'),
      description: t('howItWorks.steps.step4.description'),
    },
    {
      title: t('howItWorks.steps.step5.title'),
      description: t('howItWorks.steps.step5.description'),
    },
    {
      title: t('howItWorks.steps.step6.title'),
      description: t('howItWorks.steps.step6.description'),
    },
  ];

  const testimonials = [
    {
      quote:
        'Hirelytics reduced our time-to-hire by 40% and the quality of candidates reaching final rounds is noticeably better.',
      name: 'Sarah Johnson',
      role: 'HR Director',
      company: 'TechCorp',
    },
    {
      quote:
        'The AI interviews ask relevant, role-specific questions and the structured feedback helps us compare candidates fairly.',
      name: 'David Rodriguez',
      role: 'Talent Acquisition Manager',
      company: 'InnovateX',
    },
    {
      quote:
        'I was matched with roles that fit my skills, and the interview itself felt like a real conversation rather than a form.',
      name: 'Michael Chen',
      role: 'Software Engineer',
      company: 'Hired via Hirelytics',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader className="rise-in">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2" aria-label="Hirelytics home">
            <Image
              src="/images/hirelytics-logo.svg"
              alt=""
              width={24}
              height={24}
              className="size-6 rounded-md ring-1 ring-white/25 dark:invert-[0.15] dark:brightness-110"
            />
            <span className="font-display text-sm font-semibold tracking-tight text-white">
              Hirelytics
            </span>
          </Link>
          <nav
            className="hidden items-center gap-6 text-sm text-white/70 md:flex"
            aria-label="Main"
          >
            <a href="#features" className="transition-colors hover:text-white">
              {t('featuresSection.title')}
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-white">
              {t('howItWorks.title')}
            </a>
            <Link href="/jobs" className="transition-colors hover:text-white">
              {t('userAccess.findJobs')}
            </Link>
            <Link href="/demo/book" className="transition-colors hover:text-white">
              {t('demo.bookDemo')}
            </Link>
          </nav>
          <Button
            asChild
            size="sm"
            className="bg-brand-cyan text-brand-deep shadow-md shadow-brand-cyan/25 hover:bg-brand-cyan/90"
          >
            <Link href="/login">{common('buttons.getStarted')}</Link>
          </Button>
        </div>
      </LandingHeader>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-brand-blue/40 bg-gradient-to-br from-brand-deep via-[#0d4166] to-brand-blue">
          <div
            aria-hidden="true"
            className="bg-dots-fade absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:22px_22px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-[6%] h-[480px] w-[640px] rounded-full bg-brand-cyan/20 blur-[110px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-[4%] h-[380px] w-[520px] rounded-full bg-white/10 blur-[100px]"
          />
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent to-background" />
          <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="font-display text-4xl font-medium tracking-tight text-pretty text-white sm:text-5xl">
                {[
                  ...t('hero.revolutionizeHiring').split(' '),
                  ...t('typingAnimation.smartRecruitment').split(' '),
                ].map((word, index) => (
                  <span
                    key={`${word}-${index}`}
                    className="hero-word"
                    style={{ animationDelay: `${150 + index * 60}ms` }}
                  >
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="rise-in mt-5 max-w-xl text-lg text-pretty text-white/75">
                {t('hero.description')}
              </p>
              <div className="rise-in rise-in-d1 mt-8 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="group bg-brand-cyan text-brand-deep shadow-lg shadow-brand-cyan/25 hover:bg-brand-cyan/90"
                >
                  <Link href="/login">
                    {common('buttons.getStarted')}
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  <Link href="/jobs">
                    <Briefcase className="size-4" />
                    {t('userAccess.findJobs')}
                  </Link>
                </Button>
              </div>
              <div className="rise-in rise-in-d1 mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/75">
                <Link
                  href="/login/candidate"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <User className="size-4" />
                  {t('userAccess.candidateLogin')}
                </Link>
                <span aria-hidden="true" className="h-3 w-px bg-white/25" />
                <Link
                  href="/login/recruiter"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <Building2 className="size-4" />
                  {t('userAccess.recruiterLogin')}
                </Link>
                <span aria-hidden="true" className="h-3 w-px bg-white/25" />
                <Link
                  href="/demo/book"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <MessageSquareText className="size-4" />
                  {t('demo.bookDemo')}
                </Link>
              </div>
            </div>

            {/* Product illustration */}
            <div aria-hidden="true" className="rise-in rise-in-d2 relative lg:justify-self-end">
              <div className="orbit-ring pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full border-2 border-dashed border-brand-cyan/60" />
              <SpotlightCard className="w-full max-w-md overflow-hidden rounded-xl border bg-card shadow-xl shadow-brand-deep/40 ring-1 ring-white/15">
                <div className="flex items-center justify-between border-b px-5 py-3.5">
                  <div>
                    <p className="font-display text-sm font-medium tracking-tight">
                      Interview scorecard
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Senior Frontend Engineer, live session
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/25 bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-warning" />
                    In progress
                  </span>
                </div>
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Question 3 of 5</span>
                    <span className="numeric font-mono">14:22</span>
                  </div>
                  <div className="mt-2 flex gap-1">
                    {[0, 1, 2, 3, 4].map((step) => (
                      <span
                        key={step}
                        style={{ animationDelay: `${450 + step * 70}ms` }}
                        className={`h-1 flex-1 rounded-full ${step < 3 ? 'bar-fill bg-primary' : 'bg-muted'}`}
                      />
                    ))}
                  </div>
                  <div className="mt-5 space-y-4">
                    {[
                      { label: 'Communication', score: '4.2', width: '84%' },
                      { label: 'Problem solving', score: '3.8', width: '76%' },
                      { label: 'Technical depth', score: '4.5', width: '90%' },
                    ].map((item, index) => (
                      <div key={item.label}>
                        <div className="flex items-baseline justify-between text-sm">
                          <span className="font-medium">{item.label}</span>
                          <span className="numeric font-mono text-muted-foreground">
                            {item.score}
                          </span>
                        </div>
                        <div className="relative mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                          <div
                            className="bar-fill h-full rounded-full bg-primary"
                            style={{ width: item.width, animationDelay: `${600 + index * 130}ms` }}
                          />
                          <div className="score-ticks absolute inset-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t bg-muted/40 px-5 py-3">
                  <span className="text-xs text-muted-foreground">Recommendation</span>
                  <span className="pop-in inline-flex items-center rounded-full border border-success/25 bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                    Proceed to final round
                  </span>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-16 py-16 md:py-24">
          <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-primary">{t('featuresSection.title')}</p>
              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">
                {t('featuresSection.subtitle')}
              </h2>
              <p className="mt-3 text-muted-foreground">{t('featuresSection.description')}</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="bg-card p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <feature.icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-16 border-t bg-brand-cyan/5 py-16 md:py-24">
          <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-primary">{t('howItWorks.title')}</p>
              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">
                {t('howItWorks.subtitle')}
              </h2>
              <p className="mt-3 text-muted-foreground">{t('howItWorks.description')}</p>
            </div>
            <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <div className="numeric flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-14">
              <Button asChild size="lg">
                <Link href="/login">
                  {t('howItWorks.getStarted')}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* Testimonials */}
        <section className="border-t py-16 md:py-24">
          <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-primary">{t('testimonials.title')}</p>
              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">
                {t('testimonials.subtitle')}
              </h2>
              <p className="mt-3 text-muted-foreground">{t('testimonials.description')}</p>
            </div>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <figure key={testimonial.name}>
                  <blockquote className="text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="px-4 pb-16 sm:px-6 md:pb-24">
          <Reveal className="mx-auto w-full max-w-6xl">
            <div className="brand-panel rounded-xl bg-gradient-to-br from-brand-deep to-brand-blue px-6 py-14 text-center md:py-20">
              <h2 className="font-display text-3xl font-medium tracking-tight text-balance text-white">
                {t('footer.cta.heading')}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-pretty text-white/70">
                {t('footer.cta.description')}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-cyan text-brand-deep shadow-lg shadow-brand-cyan/25 hover:bg-brand-cyan/90"
                >
                  <Link href="/login">{common('buttons.getStarted')}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  <a href="#how-it-works">{t('footer.cta.learnMore')}</a>
                </Button>
              </div>
              <p className="mt-6 text-sm text-white/60">{t('footer.cta.noCreditCard')}</p>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
