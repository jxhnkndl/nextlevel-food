import sql from 'better-sqlite3';

// Open db connection
const db = sql('meals.db');

// Query for all meals
// Use .all() to fetch all records that match the statement
// No promise is required
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return db.prepare('SELECT * FROM meals').all();
}

// Get single meal
// Use .get(meal) to search for a specific meal
// Use a prepared statement to insert data into the query
// Prepared statements allow SQLite to protect against SQL injection attacks
// Pass the actual value to use in the WHERE clause into the .get() method
export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}
