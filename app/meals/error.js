// Load this page when there's an error
// Next passes an error prop to error pages that can be used to render information about the error
// Error pages must be client components because the need to be able to catch both server and client side errors
'use client';

export default function error({ error }) {
  return (
    <main className='error'>
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </main>
  );
}
