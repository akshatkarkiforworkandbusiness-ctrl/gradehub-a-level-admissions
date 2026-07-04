import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-6 py-32 text-center">
      <div className="w-16 h-16 rounded-2xl bg-bg-surface border border-border shadow-sm flex items-center justify-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <path d="M10 10.5c3.8 0 5 2 5 2"/>
          <line x1="9" x2="9.01" y1="15" y2="15"/>
          <line x1="15" x2="15.01" y1="15" y2="15"/>
        </svg>
      </div>
      <h1 className="text-5xl font-serif text-text-primary mb-4 tracking-tight">404</h1>
      <h2 className="text-2xl font-bold text-text-primary mb-6">Page Not Found</h2>
      <p className="text-lg text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link 
        href="/" 
        className="bg-ink-navy text-[#FAFAF6] px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors shadow-sm"
      >
        Return to Home
      </Link>
    </main>
  );
}
