'use client';

// Must be used in a client component
// useFormState() manages the state of a page or component submitting a form using server actions
import { useFormState } from 'react-dom';

import { shareMeal } from '@/lib/actions';

import ImagePicker from '@/components/meals/image-picker';
import MealsFormSubmit from '@/components/meals/meals-form-submit';

import styles from './page.module.css';

export default function ShareMealPage() {
  // Arg 1: The action that should be performed when the form is submitted
  // Arg 2: The initial state of the response BEFORE the form has been submitted (matches up with the return object created in the server actions)
  // The hook generates a state property representing the most recent form state and a formAction function for calling the action (shareMeal) when the form gets submitted
  const [state, formAction] = useFormState(shareMeal, { message: null });

  return (
    <>
      <header className={styles.header}>
        <h1>
          Share your <span className={styles.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={styles.main}>
        {/* Use server action function to submit form data via the useFormState() hook */}
        <form className={styles.form} action={formAction}>
          <div className={styles.row}>
            <p>
              <label htmlFor='name'>Your name</label>
              <input type='text' id='name' name='name' required />
            </p>
            <p>
              <label htmlFor='email'>Your email</label>
              <input type='email' id='email' name='email' required />
            </p>
          </div>
          <p>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' name='title' required />
          </p>
          <p>
            <label htmlFor='summary'>Short Summary</label>
            <input type='text' id='summary' name='summary' required />
          </p>
          <p>
            <label htmlFor='instructions'>Instructions</label>
            <textarea
              id='instructions'
              name='instructions'
              rows='10'
              required></textarea>
          </p>
          <ImagePicker label='Your image' name='image' />
          {/* Conditionally render error message if one has been returned from the server action */}
          {state.message && <p>{state.message}</p>}
          <p className={styles.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
