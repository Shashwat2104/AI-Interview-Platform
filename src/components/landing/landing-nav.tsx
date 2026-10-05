'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface NavLink {
  href: string;
  label: string;
}

interface LandingNavProps {
  links: NavLink[];
  cta: { href: string; label: string };
}

/**
 * Landing navigation.
 *
 * Desktop: anchor links with a brand underline that draws in on hover/focus,
 * plus theme toggle and high-impact CTA.
 * Mobile: a disclosure panel that slides under the header — links arrive with
 * the shared stagger, Escape closes it and returns focus to the trigger.
 */
export function LandingNav({ links, cta }: LandingNavProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <nav className="hidden items-center gap-6 text-sm text-white/75 md:flex" aria-label="Main">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="relative transition-colors hover:text-white focus-visible:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-brand-cyan after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:after:scale-x-100"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-2 md:flex">
        <ThemeToggle className="text-white/80 hover:bg-white/10 hover:text-white" />
        <Button
          asChild
          size="sm"
          className="sweep btn-glow bg-brand-cyan text-brand-deep hover:bg-brand-cyan/90 font-medium"
        >
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <Button
          ref={triggerRef}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 hover:text-white"
          aria-expanded={open}
          aria-controls="landing-nav-mobile"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
          ) : (
            <Menu className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
          )}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </Button>

        <div
          id="landing-nav-mobile"
          hidden={!open}
          className={cn(
            'absolute inset-x-0 top-full border-b border-white/10 bg-brand-deep/95 px-4 py-4 shadow-lg backdrop-blur',
            open && 'enter-fade'
          )}
        >
          <nav className="flex flex-col gap-1" aria-label="Main">
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white',
                  open && `enter enter-d${index + 1}`
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex items-center justify-between border-t border-white/10 px-3 pt-3">
            <span className="text-xs text-white/70">Theme</span>
            <ThemeToggle className="text-white/80 hover:bg-white/10 hover:text-white" />
          </div>
          <Button
            asChild
            className="sweep mt-3 w-full bg-brand-cyan text-brand-deep hover:bg-brand-cyan/90"
          >
            <Link href={cta.href} onClick={() => setOpen(false)}>
              {cta.label}
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
