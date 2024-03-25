import Link from 'next/link';
import Header from '@/src/components/header';

export default function HomePage() {
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p>
        <Link href='/about'>About Us</Link>
      </p>
    </main>
  );
}
