"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

interface IImagePicker {
  label: string;
  name: string;
}

export default function ImagePicker({ label, name }: IImagePicker) {
  const [image, setImage] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handlePick = () => {
    if (inputRef.current) inputRef.current.click();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) {
      setImage(undefined);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <div className={classes.picker}>
      <label htmlFor="image">{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {image ? (
            <Image src={image} alt="pick image" fill />
          ) : (
            <p>No image picked yet.</p>
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          name={name}
          ref={inputRef}
          required
          onChange={handleChange}
        />

        <button className={classes.button} type="button" onClick={handlePick}>
          Pick an image
        </button>
      </div>
    </div>
  );
}
