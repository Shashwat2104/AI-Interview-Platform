'use client';
import { useEffect } from 'react';

export default function EasterEgg() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'd') {
        alert('👨‍💻 Site crafted by Shashwat!');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  return null;
}
