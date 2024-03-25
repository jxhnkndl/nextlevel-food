'use client';

import Link from 'next/link';
import Image from 'next/image';

import MainHeaderBackground from './main-header-background';
import logoImg from '@/assets/logo.png';
import styles from './main-header.module.css';
import { usePathname } from 'next/navigation';
import NavLink from './nav-link';

export default function MainHeader() {
  const path = usePathname();

  return (
    <>
      <MainHeaderBackground />
      <header className={styles.header}>
        <Link href='/' className={styles.logo}>
          <Image priority src={logoImg} alt='A plate with food on it' />
          NextLevel Food
        </Link>

        {/* The NavLink component is a client component; by splitting the nav links into separate components, they can use client side JavaScript WITHOUT converting the entire mainHeader component into a client component. */}
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink href='/meals'>Meals</NavLink>
            </li>
            <li>
              <NavLink href='/community'>Browse Meals</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
