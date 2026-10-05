'use client';

import {
  Check,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  FileText,
  Link2,
  Mic,
  ScanText,
  Send,
  Sparkles,
} from 'lucide-react';
import * as React from 'react';

import { CountUp } from '@/components/shared/count-up';
import { SuccessCheck } from '@/components/shared/success-check';
import { useLiveWhenVisible } from '@/lib/motion';
import { cn } from '@/lib/utils';

export interface StoryStep {
  title: string;
  description: string;
  cardTitle: string;
  label: string;
}

interface WorkflowStoryProps {
  eyebrow: string;
  title: string;
  description: string;
  steps: StoryStep[];
}

function vars(style: Record<string, string | number>): React.CSSProperties {
  return style as React.CSSProperties;
}

const STEP_ICONS = [FileText, Link2, Send, ScanText, Mic, ClipboardCheck];

/**
 * StepVisual: The living state of the product for each step of the pipeline.
 */
function StepVisual({ index, active }: { index: number; active: boolean }) {
  const [copied, setCopied] = React.useState(false);

  const fill = (delay: number) =>
    active ? vars({ animation: `bar-fill 800ms var(--ease-enter) ${delay}ms both` }) : undefined;

  // Step 1: Create Job Posting
  if (index === 0) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Role Specification</p>
          <span className="text-[11px] font-mono text-brand-cyan">AI Assisted</span>
        </div>
        <div className="space-y-2">
          {[
            'Staff Distributed Systems Architect',
            'Full-time · Remote · Global Engineering',
            'Core Stack: Go, Raft, Kafka, Kubernetes, eBPF',
          ].map((line, i) => (
            <div
              key={line}
              className="rounded-lg border bg-muted/40 px-3 py-2 text-xs text-foreground/90 font-medium"
              style={fill(120 + i * 110)}
            >
              {line}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs">
          <Sparkles className="size-3.5 text-brand-cyan" aria-hidden="true" />
          <span>Calibrate Adaptive Rubric</span>
        </div>
      </div>
    );
  }

  // Step 2: Unique Application URL
  if (index === 1) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-xl border border-border/80 bg-muted/40 p-2.5 font-mono text-xs">
          <div className="flex items-center gap-2 truncate">
            <Link2 className="size-4 shrink-0 text-brand-cyan" aria-hidden="true" />
            <span className="truncate">hirelytics.app/jobs/staff-dist-8f2c</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-card px-2.5 py-1 text-xs font-medium text-foreground ring-1 ring-border shadow-xs hover:bg-muted ml-2"
          >
            {copied ? (
              <>
                <Check className="size-3 text-success" />
                <span className="text-success text-[11px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="rounded-xl border bg-muted/20 p-3 space-y-2">
          <p className="text-xs font-semibold text-foreground">Candidate Distribution Matrix</p>
          <div className="grid grid-cols-6 gap-1.5">
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-2.5 rounded-sm transition-all',
                  i % 3 === 0 ? 'bg-primary/70' : 'bg-muted'
                )}
                style={
                  active
                    ? vars({ animation: `pop-in 400ms var(--ease-spring) ${60 + i * 20}ms both` })
                    : undefined
                }
              />
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground pt-1">
            Real-time candidate telemetry tracked per sourcing channel.
          </p>
        </div>
      </div>
    );
  }

  // Step 3: Candidate Application
  if (index === 2) {
    return (
      <div className="space-y-3">
        {['Candidate Profile Verified', 'Engineering Resume Parsed', 'Role Alignment Check'].map(
          (field, i) => (
            <div
              key={field}
              className="flex items-center justify-between rounded-lg border bg-muted/40 px-3.5 py-2 text-xs font-medium"
              style={fill(120 + i * 130)}
            >
              <span>{field}</span>
              <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
            </div>
          )
        )}
        <div className="flex items-center gap-3 rounded-xl border border-success/30 bg-success/10 p-3 mt-2">
          <SuccessCheck className="size-8 text-success shrink-0" />
          <div>
            <p className="text-xs font-bold text-foreground">Application Dispatched</p>
            <p className="text-[11px] text-muted-foreground">
              Candidate receives instant adaptive interview link
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Resume Parsing & Match
  if (index === 3) {
    return (
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Core Competency Radar</p>
          <span className="text-[11px] font-mono text-brand-cyan">94% Fit</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            'Distributed Consensus',
            'Raft & Paxos',
            'Go High Concurrency',
            'eBPF Profiling',
            'Kubernetes',
          ].map((skill, i) => (
            <span
              key={skill}
              className="rounded-lg border border-brand-cyan/30 bg-brand-cyan/10 px-2.5 py-1 text-xs font-mono text-foreground"
              style={
                active
                  ? vars({
                      animation: `chip-pop 300ms var(--ease-spring) ${100 + i * 80}ms both`,
                    })
                  : undefined
              }
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="rounded-xl border bg-muted/30 p-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground">Role Calibration Index</span>
            <span className="text-lg font-bold font-display tracking-tight text-foreground">
              <CountUp to={94} suffix="%" duration={1200} />
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={fill(200)} />
          </div>
        </div>
      </div>
    );
  }

  // Step 5: Adaptive AI Interview
  if (index === 4) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Live Adaptive Interview</span>
          <span className="numeric font-mono text-brand-cyan">Question 04 / 05</span>
        </div>
        <p
          className="type-line text-xs font-sans leading-relaxed text-foreground rounded-lg border bg-muted/30 p-3"
          style={vars({ '--type-duration': '1.4s', '--type-steps': '34', '--type-delay': '120ms' })}
        >
          How would you prevent stale reads in a multi-region Raft cluster with partitioned leader
          leases?
        </p>
        <div className="flex h-5 items-end gap-[3px] rounded-lg bg-muted/40 p-2">
          {[0.5, 0.85, 0.4, 1, 0.65, 0.9, 0.45, 0.75, 0.55, 0.85, 0.4, 0.7].map((h, i) => (
            <span
              key={i}
              className="live-anim meter-bar flex-1 rounded-full bg-primary/80"
              style={vars({
                height: `${Math.round(h * 16)}px`,
                animationDelay: `-${i * 80}ms`,
                '--meter-speed': `${680 + i * 50}ms`,
              })}
            />
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">
          Real-time follow-up probes adjust immediately based on candidate precision.
        </p>
      </div>
    );
  }

  // Step 6: Comprehensive Feedback
  return (
    <div className="space-y-3">
      {[
        { label: 'Distributed Systems Architecture', width: '96%', score: '4.8' },
        { label: 'Concurrency & Edge Mitigation', width: '92%', score: '4.6' },
        { label: 'Communication & Trade-offs', width: '94%', score: '4.7' },
      ].map((row, i) => (
        <div key={row.label} className="space-y-1">
          <div className="flex items-baseline justify-between text-xs">
            <span className="font-medium text-foreground">{row.label}</span>
            <span className="numeric font-mono text-xs font-bold text-muted-foreground">
              {row.score} / 5.0
            </span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={
                active
                  ? vars({
                      width: row.width,
                      transformOrigin: 'left',
                      animation: `bar-fill 800ms var(--ease-enter) ${120 + i * 140}ms both`,
                    })
                  : vars({ width: row.width })
              }
            />
            <div className="score-ticks absolute inset-0" />
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between rounded-xl border border-success/30 bg-success/10 px-3.5 py-2.5 mt-2">
        <span className="text-xs font-medium text-muted-foreground">Hiring Recommendation</span>
        <span className="text-xs font-bold font-display text-success">
          Strong Hire · Top 1% Percentile
        </span>
      </div>
    </div>
  );
}

/**
 * Scroll storytelling + interactive step navigation.
 */
export function WorkflowStory({ eyebrow, title, description, steps }: WorkflowStoryProps) {
  const [active, setActive] = React.useState(0);
  const itemRefs = React.useRef<Array<HTMLLIElement | null>>([]);
  const { ref: liveRef, live } = useLiveWhenVisible<HTMLDivElement>('300px 0px');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.step);
          if (!Number.isNaN(index)) setActive(index);
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    for (const el of itemRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="band-tint scroll-mt-16 border-t py-16 md:py-24">
      <div ref={liveRef} data-live={live} className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide uppercase text-brand-cyan">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{description}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
          {/* Sticky Product Simulation Panel */}
          <div className="lg:sticky lg:top-24">
            <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xl shadow-brand-deep/5">
              <div className="flex items-center gap-2 border-b bg-muted/20 px-5 py-3.5">
                <span className="live-anim meter-bar h-3.5 w-[3px] rounded-full bg-brand-cyan" />
                <p className="font-display text-sm font-semibold tracking-tight text-foreground">
                  {steps[active]?.title}
                </p>
                <span className="ml-auto numeric font-mono text-xs text-muted-foreground">
                  Stage {String(active + 1).padStart(2, '0')} /{' '}
                  {String(steps.length).padStart(2, '0')}
                </span>
              </div>

              {/* Reserved height so swapping stages never shifts layout */}
              <div className="relative min-h-[16.5rem] p-6 sm:min-h-[17.5rem]">
                {steps.map((_, index) => {
                  const Icon = STEP_ICONS[index] ?? FileText;
                  return (
                    <div
                      key={index}
                      className={cn(
                        'absolute inset-0 p-6 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none',
                        index === active
                          ? 'translate-y-0 opacity-100'
                          : 'pointer-events-none translate-y-3 opacity-0'
                      )}
                      aria-hidden={index !== active}
                    >
                      <div className="mb-4 flex items-center gap-2">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-brand-cyan/10 text-brand-cyan">
                          <Icon className="size-4" aria-hidden="true" />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {steps[index]?.label} Stage
                        </span>
                      </div>
                      <StepVisual index={index} active={index === active} />
                    </div>
                  );
                })}
              </div>

              {/* Segmented stage progress indicator (straightened logo orbit) */}
              <div className="flex gap-1.5 border-t bg-muted/20 px-5 py-3">
                {steps.map((step, index) => (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setActive(index)}
                    title={`Go to step ${index + 1}: ${step.title}`}
                    className={cn(
                      'h-1.5 flex-1 cursor-pointer rounded-full transition-all duration-300 motion-reduce:transition-none',
                      index <= active ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground/30'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Stage List */}
          <ol className="space-y-3">
            {steps.map((step, index) => {
              const isActive = index === active;
              return (
                <li
                  key={step.title}
                  data-step={index}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  onClick={() => setActive(index)}
                  className={cn(
                    'card-interactive cursor-pointer rounded-xl border p-4 sm:p-5 transition-all duration-200',
                    isActive
                      ? 'border-brand-cyan/60 bg-accent/60 shadow-md ring-1 ring-brand-cyan/20'
                      : 'border-border/60 bg-card/60 hover:border-brand-cyan/40 hover:bg-card'
                  )}
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className={cn(
                        'numeric mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300 motion-reduce:transition-none',
                        isActive
                          ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                          : 'border-border bg-background text-muted-foreground'
                      )}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-cyan">
                        {step.label}
                      </p>
                      <h3 className="mt-1 font-display text-base font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
