// Needs to be a client component because event handlers are necessary
'use client';
import { useRef } from 'react';

import styles from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  // Create a ref to attach to the hidden image picker input
  const imageInput = useRef();

  // Trigger a click on the hidden image pick input when the custom button is clicked
  function handlePickClick() {
    imageInput.current.click();
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        {/* Use accept to make sure only images can be uploaded */}
        <input
          // Hide this browser default file input
          className={styles.input}
          type='file'
          name={name}
          id={name}
          accept='image/png, image/jpeg'
          ref={imageInput}
        />
        {/* Clicks on the button get forwarded to the hidden input */}
        <button type='button' className={styles.button} onClick={handlePickClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
