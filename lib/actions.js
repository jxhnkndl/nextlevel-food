// Define all functions in this file as server actions
'use server';

import { redirect } from 'next/navigation';

import { saveMeal } from './meals';

// The use server directive creates a SERVER ACTION that will only ever run on the server
// Server actions must be explicitly defined using 'use server'
// Server actions are always async functions
// This function will get called with the form gets submitted and will run directly on the server
// The formData interface will be used to grab the input values

export async function shareMeal(formData) {
  // .get() pulls out the value of a field from the formData object
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  await saveMeal(meal);
  redirect('/meals');
}
