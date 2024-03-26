import ImagePicker from '@/components/meals/image-picker';
import styles from './page.module.css';

export default function ShareMealPage() {
  // The use server directive creates a SERVER ACTION that will only ever run on the server
  // Server actions must be explicitly defined using 'use server'
  // Server actions are always async functions
  // This function will get called with the form gets submitted and will run directly on the server
  // The formData interface will be used to grab the input values 
  async function shareMeal(formData) {
    'use server';

    // .get() pulls out the value of a field from the formData object
    const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name'),
      creator_email: formData.get('email')
    }

    console.log(meal)
  }

  return (
    <>
      <header className={styles.header}>
        <h1>
          Share your <span className={styles.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={styles.main}>
        {/* Use server action function to submit form data */}
        <form className={styles.form} action={shareMeal}>
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
          <ImagePicker label="Your image" name="image" />
          <p className={styles.actions}>
            <button type='submit'>Share Meal</button>
          </p>
        </form>
      </main>
    </>
  );
}
