import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

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

// Save a new meal
export async function saveMeal(meal) {
  // Generate slug from meal's title and make all letters lowercase
  meal.slug = slugify(meal.title, { lower: true });

  // Overwrite user's raw instructions with sanitized instructions
  meal.instructions = xss(meal.instructions);

  // Extract image's file extension and create file name from slug
  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  // Create a stream for writing data to a file and tell it the path to write to
  const stream = fs.createWriteStream(`public/images/${fileName}`);

  // Convert image into a buffered image (binary data stream) that can be transmitted in chucks
  const bufferedImage = await meal.image.arrayBuffer();

  // Write a chuck of the image data to the write stream
  // This method wants a regular buffer, not a buffer array
  // Use the Buffer.from() method to convert the array buffer into a regular buffer
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed');
    }
  });

  // Overwrite actual image file with the path to the uploaded image
  meal.image = `/images/${fileName}`;

  // Save meal to the database (make sure fields are in the same order in both lists)
  // Use the .run() method to write data
  db.prepare(
    `
    INSERT INTO meals
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
