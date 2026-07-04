export const metadata = {
  title: 'Contact Us | AfterALevel.com',
  description: 'Get in touch with the AfterALevel.com team for support, feedback, or business inquiries.',
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 pt-24 pb-32">
      <h1 className="text-4xl md:text-5xl font-serif mb-8 text-text-primary">Contact Us</h1>
      <div className="prose prose-slate dark:prose-invert prose-p:text-text-secondary prose-headings:text-text-primary max-w-none">
        <p className="text-lg mb-8">
          Have a question, feedback, or need support with one of our calculators? We'd love to hear from you.
        </p>

        <div className="bg-bg-surface border border-border rounded-xl p-8 mb-12 shadow-sm">
          <h2 className="text-2xl font-bold mt-0 mb-2">Email Us</h2>
          <p className="mb-6">
            For all inquiries, please email us directly at:
          </p>
          <a href="mailto:contact@afteralevel.com" className="inline-flex items-center gap-2 text-ink-navy font-semibold text-lg hover:underline decoration-2 underline-offset-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            contact@afteralevel.com
          </a>
        </div>

        <h2>Report an Issue</h2>
        <p>
          If you noticed an inaccuracy in a calculation or experienced a bug while using the site, please let us know. Be sure to include:
        </p>
        <ul>
          <li>The specific tool you were using (e.g., UCAS Points Calculator).</li>
          <li>The grades or data you entered.</li>
          <li>What you expected the result to be.</li>
        </ul>

        <h2>Business & Partnerships</h2>
        <p>
          If you represent an educational institution, university, or tutoring service and are interested in advertising or partnering with AfterALevel.com, please email us with the subject line <strong>"Partnership Inquiry"</strong>.
        </p>

        <p className="mt-8 text-sm">
          <em>Note: We aim to respond to all inquiries within 48 hours.</em>
        </p>
      </div>
    </main>
  );
}
