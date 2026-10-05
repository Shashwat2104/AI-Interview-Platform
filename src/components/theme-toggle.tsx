'use client';

import { Check, Laptop, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { flushSync } from 'react-dom';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps = {}) {
  const { setTheme, theme } = useTheme();
  const t = useTranslations('Common.theme');
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  /**
   * Theme changes transform the interface between two visual worlds.
   *
   * Preferred: a View Transition reveal that expands from the toggle itself
   * (one clip-path pass over a snapshot — user-initiated, so the cost is paid
   * exactly once, on the frame the user asked for).
   * Fallback: the brief `.theme-transitioning` class, which lets surfaces
   * interpolate smoothly without capturing the page.
   * Reduced motion: an immediate swap.
   */
  const changeTheme = (value: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const startViewTransition = (
      document as Document & {
        startViewTransition?: (callback: () => void) => { finished: Promise<void> };
      }
    ).startViewTransition;

    if (!reduceMotion && typeof startViewTransition === 'function') {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) {
        root.style.setProperty('--theme-x', `${rect.left + rect.width / 2}px`);
        root.style.setProperty('--theme-y', `${rect.top + rect.height / 2}px`);
      }
      startViewTransition.call(document, () => {
        flushSync(() => setTheme(value));
      });
      return;
    }

    if (!reduceMotion) {
      root.classList.add('theme-transitioning');
    }
    setTheme(value);
    window.setTimeout(() => root.classList.remove('theme-transitioning'), 400);
  };

  const options = [
    { value: 'light', label: t('light'), icon: Sun },
    { value: 'dark', label: t('dark'), icon: Moon },
    { value: 'system', label: t('system'), icon: Laptop },
  ] as const;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild ref={triggerRef}>
        <Button
          variant="ghost"
          size="icon"
          className={cn('text-muted-foreground hover:text-foreground', className)}
        >
          <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-32">
        {options.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => changeTheme(value)}
            className="cursor-pointer"
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
            {theme === value && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
