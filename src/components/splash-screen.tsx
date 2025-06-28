'use client';
import React, { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(timer);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-center animate-fade-in">
      <div className="text-3xl font-bold mb-2">Made by Shashwat</div>
      <div className="text-muted-foreground text-sm">Loading your experience...</div>
    </div>
  );
}
