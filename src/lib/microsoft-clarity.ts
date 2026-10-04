'use client';
import Clarity from '@microsoft/clarity';
import { useEffect } from 'react';

const clarityId = process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_PROJECT_ID!;

const MicrosoftClarity = () => {
  useEffect(() => {
    if (!clarityId) return;

    // Defer Clarity init to after the browser is idle — does not block hydration or paint
    const init = () => {
      Clarity.init(clarityId);
      Clarity.consent();
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(init, { timeout: 2000 });
    } else {
      // Fallback for Safari < 15.4: small timeout keeps init off the critical path
      setTimeout(init, 200);
    }
  }, []);

  return null;
};

export default MicrosoftClarity;
