'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './nav-link.module.css';

export default function NavLink({ href, children }) {
  const path = usePathname();

  return (
    // Check if path starts with href value
    <Link
      href='/meals'
      className={
        path.startsWith(href) ? `${styles.link} ${styles.active}` : styles.link
      }>
      {children}
    </Link>
  );
}
