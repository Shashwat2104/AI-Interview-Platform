'use client';

import {
  Activity,
  Check,
  CheckCircle2,
  Cpu,
  FileSearch,
  Headphones,
  Pause,
  Play,
  Radio,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import * as React from 'react';

import { CountUp } from '@/components/shared/count-up';
import { SpotlightCard } from '@/components/shared/spotlight-card';
import { useLiveWhenVisible, usePointerParallax } from '@/lib/motion';
import { cn } from '@/lib/utils';

/** Candidate profiles for the interactive hero demonstration. */
interface CandidateProfile {
  id: string;
  name: string;
  role: string;
  category: string;
  score: number;
  percentile: string;
  verdict: string;
  question: string;
  questionIndex: string;
  duration: string;
  rubrics: Array<{ label: string; score: string; width: string }>;
  skills: string[];
  telemetry: {
    clarity: string;
    pacing: string;
    latency: string;
    biasIndex: string;
  };
}

const CANDIDATES: CandidateProfile[] = [
  {
    id: 'systems',
    name: 'Dr. Elena Rostova',
    role: 'Staff Distributed Systems Engineer',
    category: 'Systems & Scale',
    score: 94,
    percentile: 'Top 1%',
    verdict: 'Strong Hire',
    questionIndex: '03 of 05',
    duration: '14:22',
    question:
      'Walk me through keeping the consensus log consistent during an asymmetric network partition.',
    rubrics: [
      { label: 'System Architecture & Scale', score: '4.8', width: '96%' },
      { label: 'Concurrency & Edge Mitigation', score: '4.6', width: '92%' },
      { label: 'Communication & Trade-offs', score: '4.7', width: '94%' },
    ],
    skills: ['Raft Consensus', 'Distributed Logs', 'eBPF', 'Go', 'Fault Tolerance'],
    telemetry: {
      clarity: '98.8%',
      pacing: '142 wpm',
      latency: '14.2ms',
      biasIndex: '0.00%',
    },
  },
  {
    id: 'frontend',
    name: 'Marcus Vance',
    role: 'Senior Frontend Architect',
    category: 'UI & Performance',
    score: 91,
    percentile: 'Top 3%',
    verdict: 'Strong Hire',
    questionIndex: '04 of 05',
    duration: '18:05',
    question:
      'How do you orchestrate 60fps streaming telemetry without causing main-thread long tasks?',
    rubrics: [
      { label: 'Component Architecture', score: '4.7', width: '94%' },
      { label: 'Runtime Performance & CLS', score: '4.5', width: '90%' },
      { label: 'Design System Precision', score: '4.4', width: '88%' },
    ],
    skills: ['Next.js 15', 'Turbopack', 'Web Workers', 'Tailwind', 'A11y (WCAG)'],
    telemetry: {
      clarity: '97.9%',
      pacing: '138 wpm',
      latency: '12.8ms',
      biasIndex: '0.00%',
    },
  },
  {
    id: 'ai',
    name: 'Aria Patel',
    role: 'Lead AI Systems Engineer',
    category: 'AI & Inference',
    score: 96,
    percentile: 'Top 0.5%',
    verdict: 'Exceptional Hire',
    questionIndex: '02 of 05',
    duration: '09:40',
    question:
      'Explain your strategy for p99 latency optimization with speculative decoding and KV-cache sharding.',
    rubrics: [
      { label: 'Model Serving & Latency', score: '4.9', width: '98%' },
      { label: 'Evaluation & Safety Guardrails', score: '4.7', width: '94%' },
      { label: 'Algorithmic Reasoning', score: '4.8', width: '96%' },
    ],
    skills: ['vLLM', 'FlashAttention-3', 'Triton', 'RAG Guardrails', 'CUDA'],
    telemetry: {
      clarity: '99.4%',
      pacing: '145 wpm',
      latency: '11.5ms',
      biasIndex: '0.00%',
    },
  },
];

/** Voice meter baseline frequencies. */
const METER_BASE = [0.45, 0.8, 0.35, 0.95, 0.65, 1, 0.5, 0.85, 0.4, 0.75, 0.6, 0.9];

function vars(style: Record<string, string | number>): React.CSSProperties {
  return style as React.CSSProperties;
}

/**
 * Depth layer: shifts with the pointer by `depth` pixels at full deflection.
 * Driven entirely on the compositor via CSS variables.
 */
function Layer({
  depth,
  className,
  children,
}: {
  depth: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none', className)}
      style={vars({
        transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)`,
      })}
    >
      {children}
    </div>
  );
}

/**
 * HeroStage: The interactive flagship product centerpiece.
 *
 * Designed as a real-time AI interview intelligence cockpit:
 * - Live candidate persona switching
 * - 3 interactive telemetry tabs (Scorecard, Acoustic Telemetry, AI Reasoning)
 * - Interactive audio simulation toggle with dynamic waveform
 * - Logo-derived orbital radar scan rings
 * - Parallax depth layers with fine-pointer gating
 * - Guaranteed CLS stability & 100% compositor-friendly animation
 */
export function HeroStage({ className }: { className?: string }) {
  const { ref: liveRef, live } = useLiveWhenVisible<HTMLDivElement>('280px 0px');
  const { ref: stageRef, handlers } = usePointerParallax<HTMLDivElement>(0.8);

  const [activeCandidateId, setActiveCandidateId] = React.useState('systems');
  const [activeTab, setActiveTab] = React.useState<'scorecard' | 'telemetry' | 'reasoning'>(
    'scorecard'
  );
  const [isSimulating, setIsSimulating] = React.useState(true);

  const candidate = CANDIDATES.find((c) => c.id === activeCandidateId) ?? CANDIDATES[0];

  return (
    <div ref={liveRef} data-live={live} className={cn('relative w-full max-w-xl', className)}>
      <div ref={stageRef} {...handlers} className="relative">
        {/* Brand ambient lighting */}
        <Layer depth={10} className="absolute -top-24 -right-14 h-72 w-72">
          <div className="live-anim glow-drift glow-cyan h-full w-full rounded-full blur-3xl opacity-60" />
        </Layer>
        <Layer depth={6} className="absolute -bottom-24 -left-16 h-64 w-64">
          <div className="live-anim glow-drift-slow glow-blue h-full w-full rounded-full blur-3xl opacity-50" />
        </Layer>

        {/* Orbit system — the logo's dashed scan ring + concentric telemetry radars */}
        <Layer depth={14} className="absolute -top-16 -right-10 hidden h-48 w-48 sm:block">
          <div className="relative h-full w-full">
            {/* Outer dashed ring */}
            <div className="live-anim orbit-ring absolute inset-0 rounded-full border border-dashed border-brand-cyan/40" />
            {/* Rotating cyan sweep arc */}
            <div className="live-anim orbit-arc absolute inset-4" />
            {/* Mid ring */}
            <div className="live-anim orbit-ring-rev absolute inset-8 rounded-full border border-dashed border-white/20" />
            {/* Inner glowing core */}
            <div className="absolute inset-14 rounded-full border border-brand-cyan/30 bg-brand-cyan/5" />
            {/* Orbiting photon node */}
            <div className="live-anim node-orbit absolute inset-0">
              <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand-cyan shadow-[0_0_14px_3px] shadow-brand-cyan/60" />
            </div>
            {/* Orbiting secondary node */}
            <div className="live-anim node-orbit-rev absolute inset-6">
              <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_2px] shadow-white/80" />
            </div>
          </div>
        </Layer>

        {/* Main Product Cockpit Surface */}
        <SpotlightCard className="enter-settle relative overflow-hidden rounded-2xl border border-white/20 bg-card/95 shadow-2xl shadow-brand-deep/50 backdrop-blur-md">
          {/* Cockpit Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-3.5 bg-muted/20">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Radio className="size-4 animate-pulse text-brand-cyan" aria-hidden="true" />
              </div>
              <div>
                <p className="font-display text-xs font-semibold tracking-tight sm:text-sm">
                  {candidate.name}
                </p>
                <p className="text-[11px] text-muted-foreground">{candidate.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSimulating((v) => !v)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-2.5 py-1 text-[11px] font-medium text-brand-cyan transition-colors hover:bg-brand-cyan/20"
                title={isSimulating ? 'Pause simulation' : 'Resume simulation'}
              >
                {isSimulating ? (
                  <>
                    <Pause className="size-3" />
                    <span>Live Telemetry</span>
                  </>
                ) : (
                  <>
                    <Play className="size-3" />
                    <span>Paused</span>
                  </>
                )}
              </button>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning/10 px-2.5 py-1 text-[11px] font-medium text-warning">
                <span className="relative flex size-1.5">
                  <span className="live-anim absolute inline-flex size-full animate-ping rounded-full bg-warning opacity-70 motion-reduce:hidden" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-warning" />
                </span>
                Active
              </span>
            </div>
          </div>

          {/* Interactive Candidate Persona Switcher */}
          <div className="flex border-b bg-muted/40 p-1.5 gap-1 overflow-x-auto text-xs">
            {CANDIDATES.map((c) => {
              const active = c.id === candidate.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCandidateId(c.id)}
                  className={cn(
                    'flex-1 cursor-pointer rounded-lg px-2.5 py-1.5 text-center font-medium transition-all duration-200 whitespace-nowrap',
                    active
                      ? 'bg-card text-foreground shadow-xs ring-1 ring-border text-brand-cyan dark:text-brand-cyan'
                      : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                  )}
                >
                  <span className="block text-[11px]">{c.category}</span>
                </button>
              );
            })}
          </div>

          {/* Telemetry Tabs */}
          <div className="flex border-b px-5 pt-3 gap-4 text-xs font-medium text-muted-foreground">
            <button
              type="button"
              onClick={() => setActiveTab('scorecard')}
              className={cn(
                'cursor-pointer pb-2.5 transition-colors relative',
                activeTab === 'scorecard'
                  ? 'text-foreground font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-cyan'
                  : 'hover:text-foreground'
              )}
            >
              Evaluation Scorecard
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('telemetry')}
              className={cn(
                'cursor-pointer pb-2.5 transition-colors relative',
                activeTab === 'telemetry'
                  ? 'text-foreground font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-cyan'
                  : 'hover:text-foreground'
              )}
            >
              Acoustic & Latency
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reasoning')}
              className={cn(
                'cursor-pointer pb-2.5 transition-colors relative',
                activeTab === 'reasoning'
                  ? 'text-foreground font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-cyan'
                  : 'hover:text-foreground'
              )}
            >
              AI Semantic Chain
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="p-5 min-h-[17.5rem]">
            {activeTab === 'scorecard' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Session status row */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Radio className="size-3 text-brand-cyan" />
                    Adaptive Question {candidate.questionIndex}
                  </span>
                  <span className="numeric font-mono text-[11px] tracking-wider">
                    {candidate.duration} elapsed
                  </span>
                </div>

                {/* Progress bar */}
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3, 4].map((step) => (
                    <span
                      key={step}
                      className={cn(
                        'h-1.5 flex-1 rounded-full transition-colors duration-300',
                        step < 3 ? 'bg-primary' : 'bg-muted'
                      )}
                      style={
                        step < 3
                          ? vars({
                              animation: `bar-fill 800ms var(--ease-enter) ${200 + step * 70}ms both`,
                            })
                          : undefined
                      }
                    />
                  ))}
                </div>

                {/* Rubric Breakdown */}
                <div className="space-y-3 pt-1">
                  {candidate.rubrics.map((item, index) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="font-medium text-foreground">{item.label}</span>
                        <span className="numeric font-mono text-xs font-semibold text-muted-foreground">
                          {item.score} / 5.0
                        </span>
                      </div>
                      <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-500"
                          style={vars({
                            width: item.width,
                            transformOrigin: 'left',
                            animation: `bar-fill 900ms var(--ease-enter) ${400 + index * 100}ms both`,
                          })}
                        />
                        <div className="score-ticks absolute inset-0" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Follow-up & Live Audio Waveform Box */}
                <div className="mt-4 rounded-xl border border-border/80 bg-muted/40 p-3.5 shadow-inner">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-medium text-foreground">
                      <Sparkles className="size-3.5 text-brand-cyan" aria-hidden="true" />
                      <span>Adaptive AI Probe</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground">Synthesizing live</span>
                  </div>
                  <p
                    className="type-line mt-2 text-xs leading-relaxed text-foreground/90 font-sans"
                    style={vars({
                      '--type-delay': '300ms',
                      '--type-duration': '1.4s',
                      '--type-steps': '36',
                    })}
                  >
                    {candidate.question}
                  </p>

                  <div className="mt-3 flex items-center justify-between pt-1 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="flex h-4 items-end gap-[3px]">
                        {METER_BASE.map((height, index) => (
                          <span
                            key={index}
                            className={cn(
                              'w-[3px] rounded-full transition-all duration-150',
                              isSimulating
                                ? 'live-anim meter-bar bg-primary/80'
                                : 'bg-muted-foreground/40'
                            )}
                            style={vars({
                              height: `${Math.round(height * (isSimulating ? 18 : 8))}px`,
                              animationDelay: `-${index * 80}ms`,
                              '--meter-speed': `${600 + index * 60}ms`,
                            })}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {isSimulating ? 'Audio streaming' : 'Stream paused'}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-medium text-brand-cyan">
                      {candidate.telemetry.latency}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'telemetry' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border bg-muted/30 p-3">
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Headphones className="size-3.5 text-brand-cyan" />
                      Acoustic Clarity
                    </p>
                    <p className="mt-1 font-mono text-lg font-bold text-foreground">
                      {candidate.telemetry.clarity}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Speech-to-text SNR &gt; 24dB
                    </p>
                  </div>
                  <div className="rounded-xl border bg-muted/30 p-3">
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Activity className="size-3.5 text-brand-cyan" />
                      Speech Pacing
                    </p>
                    <p className="mt-1 font-mono text-lg font-bold text-foreground">
                      {candidate.telemetry.pacing}
                    </p>
                    <p className="text-[11px] text-muted-foreground">Optimal cognitive pacing</p>
                  </div>
                  <div className="rounded-xl border bg-muted/30 p-3">
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Zap className="size-3.5 text-brand-cyan" />
                      Inference Latency
                    </p>
                    <p className="mt-1 font-mono text-lg font-bold text-brand-cyan">
                      {candidate.telemetry.latency}
                    </p>
                    <p className="text-[11px] text-muted-foreground">Sub-20ms edge pipeline</p>
                  </div>
                  <div className="rounded-xl border bg-muted/30 p-3">
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ShieldCheck className="size-3.5 text-success" />
                      Anti-Bias Index
                    </p>
                    <p className="mt-1 font-mono text-lg font-bold text-success">
                      {candidate.telemetry.biasIndex}
                    </p>
                    <p className="text-[11px] text-muted-foreground">Calibrated audit verified</p>
                  </div>
                </div>

                <div className="rounded-xl border bg-muted/40 p-3">
                  <p className="text-xs font-medium text-foreground">Extracted Skill Anchors</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {candidate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-brand-cyan/30 bg-brand-cyan/10 px-2 py-0.5 font-mono text-[11px] text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reasoning' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="space-y-2">
                  {[
                    {
                      label: 'Cognitive Architecture Signal',
                      desc: 'Candidate structured answer with trade-off analysis between CP & AP invariants.',
                      status: 'Validated',
                    },
                    {
                      label: 'Failure Mitigation Analysis',
                      desc: 'Demonstrated deep familiarity with heartbeat timeouts and split-brain resolution.',
                      status: 'Validated',
                    },
                    {
                      label: 'Acoustic Nuance Assessment',
                      desc: 'Low hesitation index; steady cadenced explanation without semantic drift.',
                      status: 'Validated',
                    },
                  ].map((item, idx) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-2.5 rounded-lg border bg-muted/30 p-2.5 text-xs"
                      style={vars({
                        animation: `rise-in 400ms var(--ease-enter) ${idx * 90}ms both`,
                      })}
                    >
                      <CheckCircle2 className="size-4 shrink-0 text-success mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground">{item.label}</span>
                          <span className="text-[10px] font-mono text-success bg-success/10 px-1.5 py-0.5 rounded">
                            {item.status}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Recommendation & Verdict Bottom Row */}
          <div className="flex items-center justify-between border-t bg-muted/30 px-5 py-3.5">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Calibrated Signal:</span>
              <span className="font-semibold text-xs text-foreground">{candidate.percentile}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-success/30 bg-success/15 px-3 py-1 text-xs font-semibold text-success shadow-xs">
              <Check className="size-3.5" aria-hidden="true" />
              <span>{candidate.verdict}</span>
            </div>
          </div>
        </SpotlightCard>

        {/* Floating Result Badges with High Contrast on Both Themes */}
        <Layer
          depth={20}
          className="absolute -top-12 -left-6 xl:-left-10 hidden max-w-[13.5rem] sm:block pointer-events-none"
        >
          <div className="live-anim float-y enter-fade enter-d5 rounded-xl border border-white/20 bg-card/95 p-3 shadow-xl backdrop-blur-md">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <FileSearch className="size-3.5 text-brand-cyan" aria-hidden="true" />
              <span>Resume Parsed</span>
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {candidate.skills.length} core competencies matched
            </p>
          </div>
        </Layer>

        <Layer
          depth={24}
          className="absolute -bottom-12 -left-6 xl:-left-10 hidden sm:block pointer-events-none"
        >
          <div className="live-anim float-y-slow rounded-xl border border-white/20 bg-card/95 p-3 shadow-xl backdrop-blur-md">
            <p className="text-[11px] font-medium text-muted-foreground">Overall Fit Score</p>
            <div className="mt-0.5 flex items-baseline gap-1 text-xl font-bold tracking-tight text-foreground font-display">
              <CountUp to={candidate.score} suffix=" / 100" duration={1200} />
            </div>
            <p className="text-[10px] text-brand-cyan font-mono">
              {candidate.percentile} percentile
            </p>
          </div>
        </Layer>

        <Layer
          depth={22}
          className="absolute -bottom-11 -right-6 xl:-right-10 hidden lg:block pointer-events-none"
        >
          <div className="live-anim float-y rounded-xl border border-white/20 bg-card/95 px-3.5 py-2.5 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-success">
              <Cpu className="size-3.5 text-brand-cyan" aria-hidden="true" />
              <span>AI Guardrails: Bias-Free</span>
            </div>
            <p className="mt-0.5 text-[10px] text-muted-foreground font-mono">
              Audited against Title VII standards
            </p>
          </div>
        </Layer>
      </div>
    </div>
  );
}
