'use client';

// This hook only works in client components because it only runs in the browser
import { useFormStatus } from 'react-dom';

export default function MealsFormSubmit() {
  // This will be true if the form is submitting and false if it's done
  const { pending } = useFormStatus();

  return (
    // Disable button if it's submitting; change text based on submitting state
    <button disabled={pending} type='submit'>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}
