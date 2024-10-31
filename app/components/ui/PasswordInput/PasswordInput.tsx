"use client";
import cl from "./style.module.css";
import Image from "next/image";
import src from "./assets/eye-close-line.png";
import { useState } from "react";

interface IPasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
export const PasswordInput = (props: IPasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={cl.inputContainer}>
      <input
        className={cl.input}
        type={isVisible ? "text" : "password"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
      />
      <button
        type="button"
        className={cl.eyeBtn}
        onClick={() => setIsVisible(!isVisible)}
      >
        <Image src={src} alt="eye" />
      </button>
    </div>
  );
};
