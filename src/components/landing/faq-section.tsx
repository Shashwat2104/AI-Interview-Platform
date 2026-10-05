'use client';

import { HelpCircle } from 'lucide-react';
import * as React from 'react';

import { Reveal } from '@/components/shared/reveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQS = [
  {
    id: 'adaptive',
    question: 'How does the adaptive AI interview probe candidate depth?',
    answer:
      'Unlike static questionnaire forms or LeetCode tests, Hirelytics operates a conversational reasoning engine. When a candidate explains an architectural choice or code approach, the system dynamically generates tailored follow-up probes to test edge cases, trade-offs, and failure mode mitigation in real time.',
  },
  {
    id: 'bias',
    question: 'How does Hirelytics guarantee zero demographic and accent bias?',
    answer:
      'Our acoustic pipeline normalizes speech input using Signal-to-Noise Ratio (SNR) filtering, isolating technical semantic tokens from regional accents or vocal timbre. The scoring engine is continuously audited against Title VII demographic parity standards, resulting in an audited 0.00% bias index across protected categories.',
  },
  {
    id: 'customization',
    question: 'Can hiring managers customize evaluation rubrics and scoring bars?',
    answer:
      'Yes. Engineering leaders define specific core competencies, seniority benchmarks (e.g. L5 Staff vs L6 Principal), and priority skills. The platform calibrates its question weighting and grading scales to match your engineering rubric precisely.',
  },
  {
    id: 'candidate-exp',
    question: 'What is the candidate experience like during the interview?',
    answer:
      'Candidates apply through a clean, accessible web portal without installing proprietary software. The interview is conducted through a conversational audio/text interface. Upon completion, candidates receive a constructive, objective scorecard detailing their performance, eliminating the frustration of hiring ghosting.',
  },
  {
    id: 'security',
    question: 'How is candidate audio and interview telemetry secured?',
    answer:
      'All audio streams, transcripts, and evaluation data are encrypted at rest with AES-256 and in transit via TLS 1.3. We adhere to enterprise SOC-2 Type II standards and never use private interview recordings to train public foundation models.',
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="atmosphere-light scroll-mt-16 py-16 md:py-24 border-t">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <Reveal className="text-center">
          <div className="mx-auto flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <HelpCircle className="size-5 text-brand-cyan" />
          </div>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground text-sm leading-relaxed">
            Everything you need to know about the Hirelytics autonomous recruitment and adaptive
            evaluation architecture.
          </p>
        </Reveal>

        <Reveal variant="up" delay={100} className="mt-10">
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-md">
            <Accordion type="single" collapsible defaultValue="adaptive" className="w-full">
              {FAQS.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-border/60 py-1 transition-colors"
                >
                  <AccordionTrigger className="text-sm font-semibold text-foreground hover:text-brand-cyan hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
