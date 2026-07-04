export const metadata = {
  title: 'About Us | AfterALevel.com',
  description: 'Learn more about AfterALevel.com and our mission to simplify university admissions for students.',
};

export default function AboutUsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 pt-24 pb-32">
      <h1 className="text-4xl md:text-5xl font-serif mb-8 text-text-primary">About Us</h1>
      <div className="prose prose-slate dark:prose-invert prose-p:text-text-secondary prose-headings:text-text-primary max-w-none">
        <p className="text-lg">
          Welcome to <strong>AfterALevel.com</strong>, your trusted companion in navigating the transition from high school to higher education.
        </p>
        <h2>Our Mission</h2>
        <p>
          We believe that every student deserves clear, accurate, and accessible information about their academic future. The journey to university is often clouded by confusing entry requirements, complicated points systems, and differing international grading scales. Our mission is to demystify this process.
        </p>
        <h2>What We Do</h2>
        <p>
          AfterALevel.com provides a suite of completely free, lightning-fast assessment tools tailored for A-Level students and international applicants. Whether you need to:
        </p>
        <ul>
          <li>Calculate your UCAS Tariff Points for UK university entry.</li>
          <li>Convert your A-Level grades into a US 4.0 GPA equivalent.</li>
          <li>Predict the UMS marks required to hit your target grades.</li>
          <li>Discover degree paths matching your specific A-Level subjects.</li>
          <li>Explore aggregated entry requirements for top global universities.</li>
        </ul>
        <p>
          Our platform is built to give you the answers you need in seconds, without requiring you to create an account or navigate through endless pages of dense text.
        </p>
        <h2>Independent & Student-Focused</h2>
        <p>
          We are an independent educational utility platform. We are not officially affiliated with UCAS, any specific university, or any examination board. This independence allows us to build tools solely focused on what students actually need. 
        </p>
        <p>
          Thank you for trusting us with your academic journey. We wish you the absolute best in your studies and your future career!
        </p>
      </div>
    </main>
  );
}
