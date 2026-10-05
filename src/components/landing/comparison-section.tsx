'use client';

import { Check, Clock, UserX, X, Zap } from 'lucide-react';
import * as React from 'react';

import { Reveal } from '@/components/shared/reveal';
import { SpotlightCard } from '@/components/shared/spotlight-card';

const COMPARISON_ROWS = [
  {
    criterion: 'Time-to-Hire Velocity',
    traditional: '24–32 days avg cycle with recurring scheduling deadlocks',
    hirelytics: 'Under 48 hours from candidate application to executive decision',
    impact: '92% Faster',
  },
  {
    criterion: 'Engineering Team Overhead',
    traditional: '40+ hours per quarter of senior staff engineering panel fatigue',
    hirelytics: 'Zero engineer screening hours; AI handles technical qualification',
    impact: '100% Autonomous',
  },
  {
    criterion: 'Evaluation Objectivity',
    traditional: 'Subjective impressions, unconscious bias, and inconsistent bar',
    hirelytics: 'Standardized multi-dimensional rubrics calibrated against Title VII',
    impact: 'Zero Bias',
  },
  {
    criterion: 'Candidate Feedback',
    traditional: 'Generic rejection email or weeks of radio silence ghosting',
    hirelytics: 'Instant rubric breakdown & objective skill feedback within hours',
    impact: '98% Positive CSAT',
  },
  {
    criterion: 'Adaptive Problem Solving',
    traditional: 'Static LeetCode riddles memorized from prep repos',
    hirelytics: 'Dynamic architecture scenarios adapting live to candidate answers',
    impact: 'Authentic Signal',
  },
];

export function ComparisonSection() {
  return (
    <section className="band-tint scroll-mt-16 py-16 md:py-24 border-t">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide uppercase text-brand-cyan">
            The Structural Advantage
          </p>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Traditional Hiring vs. Hirelytics
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            Eliminate engineering panel fatigue and subjective evaluation variance with objective,
            autonomous intelligence.
          </p>
        </Reveal>

        <Reveal variant="scale" delay={100} className="mt-12">
          <SpotlightCard className="relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xl">
            {/* Top Header comparison */}
            <div className="grid grid-cols-1 divide-y border-b md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="p-5 sm:p-6 bg-muted/20">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                    <UserX className="size-4" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    Traditional Technical Recruitment
                  </h3>
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  High friction, slow iterations, and heavy cognitive load on senior engineers.
                </p>
              </div>

              <div className="p-5 sm:p-6 bg-brand-cyan/5 dark:bg-brand-cyan/10">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-brand-cyan/20 text-brand-cyan">
                    <Zap className="size-4" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    Hirelytics Autonomous Intelligence
                  </h3>
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Instantaneous calibration, objective rubrics, and high-velocity engineering
                  signals.
                </p>
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-border/60">
              {COMPARISON_ROWS.map((row) => (
                <div
                  key={row.criterion}
                  className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-border/60 transition-colors hover:bg-muted/30"
                >
                  {/* Traditional side */}
                  <div className="p-4 sm:p-5 flex items-start gap-3">
                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                      <X className="size-3" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {row.criterion}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {row.traditional}
                      </p>
                    </div>
                  </div>

                  {/* Hirelytics side */}
                  <div className="p-4 sm:p-5 flex items-start justify-between gap-3 bg-brand-cyan/5 dark:bg-brand-cyan/5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success/20 text-success">
                        <Check className="size-3" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-brand-cyan uppercase tracking-wider">
                          {row.criterion}
                        </p>
                        <p className="mt-1 text-sm font-medium text-foreground leading-relaxed">
                          {row.hirelytics}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full border border-brand-cyan/40 bg-brand-cyan/10 px-2.5 py-1 text-[11px] font-mono font-semibold text-brand-cyan">
                      {row.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
