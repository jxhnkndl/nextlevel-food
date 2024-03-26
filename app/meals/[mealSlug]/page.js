import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMeal } from '@/lib/meals';
import styles from './page.module.css';

export default function MealDetailsPage({ params }) {
  // Get slug from URL paramters and use it to find a specific meal
  const meal = getMeal(params.mealSlug);

  // Check whether the meal was found in the database or not
  // Calling notFound() is will prevent the page from throwing an error if the meal isn't found
  // Instead, it will redirect to the nearest 404 page
  if (!meal) {
    notFound();
  }

  // Replace all new line characters with HTML <br /> elements
  // We're doing this because the instructions get injected as HTML rather than static text
  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={styles.headerText}>
          <h1>{meal.title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={styles.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        {/* dangerouslySetInnerHTML is used to insert HTML into a component. It's dangerous because it opens the site up to cross-site scripting attacks. To use this safely, you need to be sanitizing/validating the input. */}
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{
            // This property stores the HTML code that should be outputted on the screen
            __html: meal.instructions,
          }}></p>
      </main>
    </>
  );
}
