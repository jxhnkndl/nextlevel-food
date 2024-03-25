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
