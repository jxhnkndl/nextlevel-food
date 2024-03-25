import React from 'react'

export default function MealPage({ params }) {
  return (
    <main>
      <h1>Meal: {params.id}</h1>
    </main>
  )
}
