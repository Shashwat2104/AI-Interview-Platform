'use client';

import { Check, Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Locale, localsLanguages } from '@/i18n/config';
import { setUserLocale } from '@/i18n/service';

export function LanguageSelector() {
  const locale = useLocale();
  const t = useTranslations('Common.language');

  const handleLanguageChange = async (newLocale: Locale) => {
    await setUserLocale(newLocale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Languages className="h-[1.1rem] w-[1.1rem]" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {localsLanguages
          .filter((lang) => lang.active)
          .map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code as Locale)}
              className="cursor-pointer"
            >
              <span className="font-medium">{t(lang.code as 'en' | 'hi')}</span>
              {locale === lang.code && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
