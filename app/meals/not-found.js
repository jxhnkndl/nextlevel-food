// By adding this 404 page to the app directory, it will handle ALL 404s across the entire site; by contrast, putting it in a page folder would limit the not found page to only handling 404 errors related to the specific page

export default function NotFound() {
  return (
    <main className='not-found'>
      <h1>Meal Not Found</h1>
      <p>Unfortunately, we could not find the requested page or meal.</p>
    </main>
  );
}
