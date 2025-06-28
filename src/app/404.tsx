import Link from 'next/link';
import React from 'react';

export default function Custom404() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-8">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Oops! The page you are looking for does not exist.</p>
      <p className="text-muted-foreground text-sm mb-8">Made by Shashwat</p>
      <Link href="/" className="underline hover:text-primary" prefetch={false}>
        Go Home
      </Link>
    </main>
  );
}
