// Needs to be a client component because event handlers are necessary
'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';

import styles from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState(null);

  // Create a ref to attach to the hidden image picker input
  const imageInput = useRef();

  // Trigger a click on the hidden image pick input when the custom button is clicked
  function handlePickClick() {
    imageInput.current.click();
  }

  // Listen for changes on the image picker input
  function handleImageChange(event) {
    // Event stores files as an array; choose index 0 if there's only one file
    const file = event.target.files[0];

    // If no file was selected, bail out
    if (!file) {
      setPickedImage(null);
      return;
    }

    // Read image file and convert image into data URL that can be used as an image src attribte
    const fileReader = new FileReader();

    // This handler will be triggered once the fileReader.readAsDataURL(file) function finishes
    // It will be used to access the final URL from the result of the fileReader operation
    // Store the completely uploaded image to state
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    // This method doesn't return anything
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="The user's selected image" fill />
          )}
        </div>
        {/* Use accept to make sure only images can be uploaded */}
        <input
          // Hide this browser default file input
          className={styles.input}
          type='file'
          name={name}
          id={name}
          accept='image/png, image/jpeg'
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        {/* Clicks on the button get forwarded to the hidden input */}
        <button
          type='button'
          className={styles.button}
          onClick={handlePickClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
