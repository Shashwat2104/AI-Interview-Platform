'use client';

import {
  Check,
  ClipboardCheck,
  Copy,
  FileText,
  LineChart,
  Link2,
  MessageSquareText,
  Sparkles,
  TrendingUp,
  Upload,
} from 'lucide-react';
import * as React from 'react';

import { Reveal } from '@/components/shared/reveal';
import { SpotlightCard } from '@/components/shared/spotlight-card';
import { cn } from '@/lib/utils';

interface FeaturesGridProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function FeaturesGrid({ eyebrow, title, description }: FeaturesGridProps) {
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [hoveredSkill, setHoveredSkill] = React.useState<string | null>(null);

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  return (
    <section id="features" className="atmosphere-light scroll-mt-16 py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide uppercase text-brand-cyan">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{description}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: AI-Powered Interviews (Hero Feature Card) */}
          <Reveal variant="scale" delay={50} className="h-full">
            <SpotlightCard className="card-interactive card-beam relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-lg hover:shadow-brand-cyan/10">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MessageSquareText className="size-5 text-brand-cyan" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                AI-Powered Adaptive Interviews
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Automated conversational panels that dynamically probe candidate responses, adapting
                questions based on depth and previous answers.
              </p>

              {/* Live interactive waveform visualization */}
              <div aria-hidden="true" className="mt-auto pt-6">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="relative flex size-1.5">
                      <span className="live-anim absolute inline-flex size-full animate-ping rounded-full bg-brand-cyan opacity-80" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-brand-cyan" />
                    </span>
                    Audio Stream Active
                  </span>
                  <span>SNR 24.2 dB</span>
                </div>
                <div className="flex h-7 items-end gap-[3px] rounded-lg bg-muted/40 p-2">
                  {[
                    0.4, 0.7, 0.35, 0.95, 0.6, 1, 0.55, 0.85, 0.45, 0.9, 0.65, 0.8, 0.5, 0.75, 0.4,
                  ].map((h, i) => (
                    <span
                      key={i}
                      className="live-anim meter-bar flex-1 rounded-full bg-primary/80"
                      style={
                        {
                          height: `${Math.round(h * 20)}px`,
                          animationDelay: `-${i * 80}ms`,
                          '--meter-speed': `${650 + i * 50}ms`,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Card 2: Resume Analysis */}
          <Reveal variant="up" delay={100} className="h-full">
            <SpotlightCard className="card-interactive card-beam relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-lg hover:shadow-brand-cyan/10">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Upload className="size-5 text-brand-cyan" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                Intelligent Resume Analysis
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Deep semantic parsing identifies genuine technical competencies, evaluating code
                projects and experience without keyword stuffing vulnerabilities.
              </p>

              {/* Interactive skill extraction chips */}
              <div className="mt-auto pt-6">
                <p className="text-[11px] font-medium text-muted-foreground mb-2">
                  Hover to inspect semantic confidence:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { name: 'TypeScript', confidence: '99%' },
                    { name: 'Distributed Systems', confidence: '96%' },
                    { name: 'Next.js 15', confidence: '98%' },
                    { name: 'System Design', confidence: '94%' },
                  ].map((skill) => (
                    <span
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={cn(
                        'cursor-default rounded-md px-2 py-1 text-xs font-mono transition-all duration-200 border',
                        hoveredSkill === skill.name
                          ? 'border-brand-cyan bg-brand-cyan/20 text-brand-cyan shadow-xs'
                          : 'border-border/60 bg-muted/40 text-foreground'
                      )}
                    >
                      {skill.name} {hoveredSkill === skill.name && `(${skill.confidence})`}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Card 3: Unique Application Links */}
          <Reveal variant="blur" delay={150} className="h-full">
            <SpotlightCard className="card-interactive card-beam relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-lg hover:shadow-brand-cyan/10">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Link2 className="size-5 text-brand-cyan" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                Direct Role Assessment Links
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Generate dedicated application and screening URLs for every open position. Share
                across LinkedIn, job boards, or private recruiter emails with instant tracking.
              </p>

              {/* Interactive Copy URL snippet */}
              <div className="mt-auto pt-6">
                <div className="flex items-center justify-between rounded-xl border border-border/80 bg-muted/30 p-2 text-xs font-mono">
                  <span className="truncate text-muted-foreground mr-2">
                    hirelytics.app/jobs/staff-fe-9a2
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-card px-2 py-1 text-[11px] font-sans font-medium text-foreground shadow-xs ring-1 ring-border transition-colors hover:bg-muted"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="size-3 text-success" />
                        <span className="text-success">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Card 4: Smart Job Posting */}
          <Reveal variant="up" delay={200} className="h-full">
            <SpotlightCard className="card-interactive card-beam relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-lg hover:shadow-brand-cyan/10">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="size-5 text-brand-cyan" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                AI Job Spec Generation
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Transform rough hiring manager bullet points into comprehensive, inclusive job
                descriptions with automated rubric calibration in seconds.
              </p>

              <div className="mt-auto pt-6">
                <div className="rounded-lg border bg-muted/30 p-2.5 text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <Sparkles className="size-3 text-brand-cyan" />
                    Auto-generated requirements
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Senior Distributed Systems &bull; 5+ yrs Raft &bull; High-throughput Golang
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Card 5: Comprehensive Feedback */}
          <Reveal variant="scale" delay={250} className="h-full">
            <SpotlightCard className="card-interactive card-beam relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-lg hover:shadow-brand-cyan/10">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ClipboardCheck className="size-5 text-brand-cyan" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                Multi-Dimensional Feedback
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Both recruiters and candidates receive objective evaluation breakdowns covering
                technical correctness, communication cadence, and problem-solving depth.
              </p>

              <div className="mt-auto pt-6 space-y-2">
                {[
                  { label: 'Architecture Reason', width: '92%' },
                  { label: 'Trade-off Analysis', width: '88%' },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-mono text-foreground font-semibold">{item.width}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: item.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Card 6: Data-Driven Insights */}
          <Reveal variant="blur" delay={300} className="h-full">
            <SpotlightCard className="card-interactive card-beam relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-lg hover:shadow-brand-cyan/10">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <LineChart className="size-5 text-brand-cyan" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                Predictive Hiring Insights
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Track candidate pipeline velocity, interview completion rates, and benchmark your
                talent quality against industry engineering panels.
              </p>

              <div className="mt-auto pt-6">
                <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-2.5">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-success" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">Pipeline Velocity</p>
                      <p className="text-[10px] text-muted-foreground">Time-to-hire down 68%</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-success bg-success/10 px-2 py-0.5 rounded">
                    +42% MoM
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
