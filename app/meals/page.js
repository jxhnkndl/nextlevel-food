import Link from 'next/link';

import { getMeals } from '@/lib/meals';

import MealsGrid from '@/components/meals/meals-grid';
import styles from './page.module.css';
import { Suspense } from 'react';

// This function fetches the data and returns the meals grid. It can be wrapped in a React component called Suspense that will help handle its loading state and show a fallback element while data is being loaded.
async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={styles.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={styles.cta}>
          <Link href='/meals/share'>Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={styles.main}>
        {/* Suspense is a React component that handles loading states and shows a fallback until the data has loaded. Using Suspense tells Next that only this single component should display a fallback while the rest of the page is partially rendered. */}
        <Suspense
          fallback={<p className={styles.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
