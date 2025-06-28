import React from 'react';

export default function CreditsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Credits</h1>
      <p className="text-lg mb-6">
        This website was proudly developed by{' '}
        <span className="font-semibold text-primary">Shashwat</span>.
      </p>
      <p className="mb-4">Connect with Shashwat:</p>
      <div className="flex gap-4 justify-center mb-8">
        <a
          href="https://github.com/Shashwat2104"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          GitHub
        </a>
        <a
          href="https://leetcode.com/u/shashwatmahender2104/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-500 hover:underline"
        >
          LeetCode
        </a>
        <a
          href="https://www.linkedin.com/in/shashwat-mahendra-214598163/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          LinkedIn
        </a>
      </div>
      <p className="text-muted-foreground">Thank you for visiting and using this platform!</p>
    </div>
  );
}
