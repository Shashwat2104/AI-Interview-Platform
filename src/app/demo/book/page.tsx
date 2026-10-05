'use client';

import Cal from '@calcom/embed-react';
import { useTranslations } from 'next-intl';

export default function BookDemoPage() {
  const t = useTranslations('Demo');
  return (
    <div className="min-h-screen relative">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-40"></div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-[url('/patterns/grid.svg')] bg-repeat opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 pt-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{t('book.title')}</h1>
          <p className="text-muted-foreground text-lg">{t('book.description')}</p>
        </div>
        <Cal
          calLink="shashwat-mahendra/Interview-booking"
          style={{ width: '100%', height: '800px' }}
          config={{
            name: 'Hirelytics Demo',
            hideEventTypeDetails: '0',
            layout: 'month_view',
          }}
        />
      </div>
    </div>
  );
}
