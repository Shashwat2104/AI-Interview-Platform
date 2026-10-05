'use client';

import { House } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { LanguageSelector } from '@/components/language-selector';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

/**
 * Compact utility cluster for public pages (home, theme, language).
 * Hidden inside the dashboard, where the site header owns these controls.
 */
export function FloatingControls() {
  const pathname = usePathname();

  if (pathname.startsWith('/dashboard') || pathname === '/') return null;

  return (
    <div className="bg-card/95 fixed right-4 bottom-4 z-40 flex flex-col items-center gap-0.5 rounded-lg border p-1 shadow-sm">
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground"
      >
        <Link href="/">
          <House className="h-[1.1rem] w-[1.1rem]" />
          <span className="sr-only">Home</span>
        </Link>
      </Button>
      <ThemeToggle />
      <LanguageSelector />
    </div>
  );
}
