'use client';

import { Activity, Award, ShieldCheck, Zap } from 'lucide-react';
import * as React from 'react';

import { CountUp } from '@/components/shared/count-up';
import { Reveal } from '@/components/shared/reveal';

interface MetricItem {
  icon: React.ElementType;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  detail: string;
}

const METRICS: MetricItem[] = [
  {
    icon: Award,
    value: 99.4,
    suffix: '%',
    decimals: 1,
    label: 'Rubric Calibration',
    detail: 'Verified against senior principal panels',
  },
  {
    icon: Zap,
    value: 18,
    prefix: '< ',
    suffix: 'ms',
    label: 'Acoustic Latency',
    detail: 'Edge speech evaluation pipeline',
  },
  {
    icon: Activity,
    value: 1.4,
    suffix: 'M+',
    decimals: 1,
    label: 'Evaluations Completed',
    detail: 'Across global engineering organizations',
  },
  {
    icon: ShieldCheck,
    value: 0.0,
    suffix: '%',
    decimals: 1,
    label: 'Algorithmic Bias Index',
    detail: 'Third-party audited demographic parity',
  },
];

/**
 * Enterprise Telemetry & Trust Bar:
 * Displays mission-critical platform benchmarks using Tabular figures and CountUp,
 * bridging the Hero and Feature systems.
 */
export function TelemetryBar() {
  return (
    <section className="relative z-10 -mt-6 mx-auto w-full max-w-6xl px-4 sm:px-6">
      <Reveal variant="scale" delay={100}>
        <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-6 shadow-xl shadow-brand-deep/5 backdrop-blur-md dark:border-white/10 dark:bg-card/80">
          {/* Subtle top edge beam */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/60 to-transparent"
          />

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {METRICS.map((metric, idx) => (
              <div
                key={metric.label}
                className={`relative flex flex-col justify-between ${
                  idx < METRICS.length - 1 ? 'lg:border-r lg:border-border/60 lg:pr-6' : ''
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <metric.icon className="size-4 text-brand-cyan" aria-hidden="true" />
                  <span>{metric.label}</span>
                </div>

                <div className="mt-2 text-2xl font-bold tracking-tight font-display text-foreground sm:text-3xl">
                  <CountUp
                    to={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    decimals={metric.decimals}
                    duration={1400}
                  />
                </div>

                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
