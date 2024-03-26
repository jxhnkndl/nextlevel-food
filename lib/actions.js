// Define all functions in this file as server actions
'use server';

import { redirect } from 'next/navigation';

import { saveMeal } from './meals';

// The use server directive creates a SERVER ACTION that will only ever run on the server
// Server actions must be explicitly defined using 'use server'
// Server actions are always async functions
// This function will get called with the form gets submitted and will run directly on the server
// The formData interface will be used to grab the input values

// Since we're using the useFormState() hook on the share page to manage the form data, the prevState parameter must be reserved in order to get to the second formData paramter that takes in the actual form data
export async function shareMeal(prevState, formData) {
  // .get() pulls out the value of a field from the formData object
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  // Check if inputs area empty
  function isInvalidText(text) {
    return !text || text.trim() === '';
  }

  // Check if text inputs are empty
  // Check that email address has an @ symbol in it
  // Check if image is non-existent
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image || !meal.image.size === 0
  ) {
    // Return a serialized response object containing only properties (no methods)
    return {
      message: 'Invalid input'
    };
  }

  await saveMeal(meal);
  redirect('/meals');
}
