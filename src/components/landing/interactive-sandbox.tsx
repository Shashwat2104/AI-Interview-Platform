'use client';

import {
  Activity,
  Bot,
  CheckCircle2,
  Cpu,
  Play,
  RotateCcw,
  Sparkles,
  User,
  Volume2,
} from 'lucide-react';
import * as React from 'react';

import { CountUp } from '@/components/shared/count-up';
import { Reveal } from '@/components/shared/reveal';
import { SpotlightCard } from '@/components/shared/spotlight-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PromptPreset {
  id: string;
  category: string;
  question: string;
  candidateSnippet: string;
  depthScore: number;
  cadenceScore: number;
  clarityScore: number;
  followUp: string;
  signals: string[];
}

const PRESETS: PromptPreset[] = [
  {
    id: 'streaming',
    category: 'Distributed Scale',
    question:
      'How do you guarantee strict partition ordering in an event-driven system under node crash failure?',
    candidateSnippet:
      '"We anchor partition keys to immutable tenant IDs and enforce Raft-replicated write-ahead logs with synchronized sequence offsets before sending ACK."',
    depthScore: 96,
    cadenceScore: 94,
    clarityScore: 98,
    followUp:
      'Excellent. Now suppose a network partition isolates the leader during offset commit—how does your client handle split-brain ACKs?',
    signals: ['Consistent Partition Keying', 'WAL Replication', 'Atomic ACK semantics'],
  },
  {
    id: 'performance',
    category: 'Runtime Performance',
    question:
      'How would you eliminate Core Web Vitals CLS and keep INP sub-50ms during heavy streaming chart updates?',
    candidateSnippet:
      '"Reserve aspect-ratio bounding boxes upfront, offload chart coordinate math to Web Workers with SharedArrayBuffer, and schedule canvas repaints via requestAnimationFrame."',
    depthScore: 93,
    cadenceScore: 91,
    clarityScore: 95,
    followUp:
      'How would you handle fallback rendering gracefully for older mobile Safari browsers without SharedArrayBuffer support?',
    signals: ['Reserved Bounding Boxes', 'Web Worker Offload', 'rAF Paint Scheduling'],
  },
  {
    id: 'architecture',
    category: 'System Resilience',
    question:
      'Describe your strategy for circuit breakers in a microservice dependency chain experiencing cascading timeouts.',
    candidateSnippet:
      '"Implement exponential backoff with full jitter, set strict circuit thresholds at 50% error rate over 10s, and route traffic to a localized degraded cache tier."',
    depthScore: 97,
    cadenceScore: 95,
    clarityScore: 96,
    followUp:
      'What telemetry signals do you monitor to safely initiate half-open health trial requests without overwhelming the recovering cluster?',
    signals: ['Full Jitter Backoff', 'Degraded Cache Fallback', 'Half-Open Canary Probes'],
  },
];

export function InteractiveSandbox() {
  const [selectedId, setSelectedId] = React.useState('streaming');
  const [isEvaluating, setIsEvaluating] = React.useState(false);
  const [hasEvaluated, setHasEvaluated] = React.useState(true);

  const preset = PRESETS.find((p) => p.id === selectedId) ?? PRESETS[0];

  const handleRunEvaluation = () => {
    setIsEvaluating(true);
    setHasEvaluated(false);
    setTimeout(() => {
      setIsEvaluating(false);
      setHasEvaluated(true);
    }, 1100);
  };

  return (
    <section id="sandbox" className="atmosphere-light scroll-mt-16 py-16 md:py-24 border-t">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide uppercase text-brand-cyan">
            Live Interactive Simulator
          </p>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Experience Adaptive Evaluation in Action
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            Pick a technical scenario below to witness how Hirelytics analyzes candidate speech,
            calculates multi-dimensional criteria, and crafts contextual follow-up probes.
          </p>
        </Reveal>

        {/* Prompt Category Selector */}
        <Reveal variant="scale" delay={100} className="mt-8">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => {
              const active = p.id === preset.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(p.id);
                    setHasEvaluated(true);
                  }}
                  className={cn(
                    'cursor-pointer rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 border',
                    active
                      ? 'border-brand-cyan bg-brand-cyan/15 text-foreground shadow-xs ring-1 ring-brand-cyan/40'
                      : 'border-border/70 bg-card hover:border-brand-cyan/40 hover:bg-muted text-muted-foreground'
                  )}
                >
                  <span className="text-brand-cyan mr-1.5">&bull;</span>
                  {p.category}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Simulation Cockpit Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Left: The Candidate Dialogue & Audio Box */}
          <Reveal variant="up" delay={150}>
            <SpotlightCard className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-xl">
              {/* Top banner */}
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <Bot className="size-5 text-brand-cyan" />
                  <span className="font-display text-sm font-semibold text-foreground">
                    Hirelytics Interviewer
                  </span>
                </div>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-mono text-primary font-medium">
                  Autonomous Session
                </span>
              </div>

              {/* Question bubble */}
              <div className="mt-5 rounded-xl border bg-muted/30 p-4">
                <p className="text-xs font-semibold uppercase text-brand-cyan tracking-wider">
                  Question Prompt
                </p>
                <p className="mt-1 text-sm font-medium text-foreground leading-relaxed">
                  {preset.question}
                </p>
              </div>

              {/* Candidate simulated audio response */}
              <div className="mt-4 rounded-xl border border-border/70 bg-muted/10 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="size-4 text-muted-foreground" />
                    <span className="text-xs font-semibold text-foreground">
                      Candidate Response
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-brand-cyan">
                    <Volume2 className="size-3.5" />
                    44.1 kHz Speech
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-foreground/80 italic font-sans bg-muted/40 p-3 rounded-lg border">
                  {preset.candidateSnippet}
                </p>

                {/* Animated waveform visualizer */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex h-5 items-end gap-[3px]">
                    {[0.4, 0.8, 0.5, 0.95, 0.7, 0.9, 0.45, 0.85, 0.6, 1, 0.55, 0.75, 0.4].map(
                      (h, i) => (
                        <span
                          key={i}
                          className="live-anim meter-bar w-[3px] rounded-full bg-brand-cyan/80"
                          style={
                            {
                              height: `${Math.round(h * 18)}px`,
                              animationDelay: `-${i * 80}ms`,
                              '--meter-speed': `${700 + i * 50}ms`,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Duration: 32s · Jitter: 0.6ms
                  </span>
                </div>
              </div>

              {/* Run Assessment Action Button */}
              <div className="mt-5 flex items-center justify-between pt-4 border-t">
                <Button
                  onClick={handleRunEvaluation}
                  disabled={isEvaluating}
                  size="sm"
                  className="sweep btn-glow bg-brand-cyan text-brand-deep hover:bg-brand-cyan/90 font-semibold cursor-pointer"
                >
                  {isEvaluating ? (
                    <>
                      <Activity className="size-4 animate-spin" />
                      <span>Synthesizing Telemetry...</span>
                    </>
                  ) : (
                    <>
                      <Play className="size-4" />
                      <span>Re-Run AI Assessment</span>
                    </>
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(PRESETS[0].id);
                    setHasEvaluated(true);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <RotateCcw className="size-3" />
                  Reset
                </button>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Right: Real-Time Evaluated Telemetry Card */}
          <Reveal variant="scale" delay={200}>
            <SpotlightCard className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-xl">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="size-5 text-brand-cyan" />
                  <span className="font-display text-sm font-semibold text-foreground">
                    Telemetry Synthesis
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-success bg-success/10 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="size-3" />
                  100% Calibrated
                </span>
              </div>

              {/* Rubric metrics */}
              <div className="mt-5 space-y-4">
                {[
                  { label: 'Technical Reasoning Depth', value: preset.depthScore },
                  { label: 'Acoustic Cadence & Nuance', value: preset.cadenceScore },
                  { label: 'Architectural Articulation', value: preset.clarityScore },
                ].map((item, idx) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="font-medium text-foreground">{item.label}</span>
                      <span className="font-mono font-bold text-foreground">
                        {hasEvaluated ? (
                          <CountUp to={item.value} suffix="%" duration={1000 + idx * 200} />
                        ) : (
                          '--'
                        )}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-700"
                        style={{
                          width: hasEvaluated ? `${item.value}%` : '0%',
                          transitionDelay: `${idx * 120}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Captured Semantic Anchors */}
              <div className="mt-5 rounded-xl border bg-muted/20 p-3.5 space-y-2">
                <p className="text-xs font-semibold text-foreground">Validated Semantic Signals</p>
                <div className="flex flex-wrap gap-1.5">
                  {preset.signals.map((sig) => (
                    <span
                      key={sig}
                      className="inline-flex items-center gap-1 rounded-md border border-brand-cyan/30 bg-brand-cyan/10 px-2 py-0.5 text-[11px] font-mono text-foreground"
                    >
                      <CheckCircle2 className="size-3 text-brand-cyan" />
                      {sig}
                    </span>
                  ))}
                </div>
              </div>

              {/* Generated Contextual Follow-up Probe */}
              <div className="mt-4 rounded-xl border border-brand-cyan/30 bg-brand-cyan/5 p-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-cyan">
                  <Sparkles className="size-3.5" />
                  Contextual Follow-Up Probe
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed font-sans">
                  {preset.followUp}
                </p>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
