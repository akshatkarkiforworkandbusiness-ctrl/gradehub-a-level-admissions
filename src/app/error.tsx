'use client';
 
import { useEffect } from 'react';
import Link from 'next/link';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-6 py-32 text-center">
      <div className="w-16 h-16 rounded-2xl bg-bg-surface border border-border shadow-sm flex items-center justify-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-red">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" x2="12" y1="8" y2="12"/>
          <line x1="12" x2="12.01" y1="16" y2="16"/>
        </svg>
      </div>
      <h1 className="text-5xl font-serif text-text-primary mb-4 tracking-tight">500</h1>
      <h2 className="text-2xl font-bold text-text-primary mb-6">Something went wrong</h2>
      <p className="text-lg text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
        We apologize, but an unexpected error occurred on our servers. Please try again later.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-bg-surface border border-border text-text-primary px-8 py-3 rounded-lg font-medium hover:bg-border/50 transition-colors shadow-sm"
        >
          Try again
        </button>
        <Link 
          href="/" 
          className="bg-ink-navy text-[#FAFAF6] px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors shadow-sm"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}
