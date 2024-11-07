import React, { useEffect } from "react";
import { useRef } from "react";
import cls from "./Smsinner.module.css";

export const Smsinner = ({
  digits,
  changeHandler,
  submit,
}: {
  digits: any;
  changeHandler: Function;
  submit: Function;
}) => {
  const inputRefs = useRef(new Array(digits.length));

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);
  useEffect(() => {
    if (!inputRefs.current[0].value) {
      inputRefs.current[0].focus();
    }
  }, [digits]);
  const handleChange = (index: number, newValue: any, event: any) => {
    const newDigits = [...digits];
    if (event == "deleteContentBackward") {
      newDigits[index] = "";
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
      changeHandler(newDigits);
    }
    if (!/^[0-9]*$/.test(newValue.value)) {
      return;
    }
    if (event.inputType == "insertText") {
      if (newDigits[index].length < 1) {
        newDigits[index] = newValue.value.replace(/\D/g, "");
        if (index < digits.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      } else {
        newDigits[index] = newValue.value.split("")[1].replace(/\D/g, "");
        if (index < digits.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }
      changeHandler(newDigits);
    }
    if (event.inputType == "insertFromPaste") {
      changeHandler(["", "", "", ""]);
    }
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className={cls.form}
      >
        {digits.map((digit: any, index: number) => (
          <input
            onPaste={(event) => {
              event.preventDefault();
            }}
            onInput={(event) => {
              handleChange(index, event.target, event.nativeEvent);
            }}
            onKeyDown={(event) =>
              event.nativeEvent.key === "Backspace"
                ? handleChange(index, event.target, "deleteContentBackward")
                : event.nativeEvent.key === "Enter" && index == 3
                ? submit()
                : null
            }
            autoFocus
            value={digit}
            key={index}
            type="tel"
            autoComplete="one-time-code"
            inputMode="decimal"
            className={cls.code__input}
            max="1"
            ref={(element: any) => (inputRefs.current[index] = element)}
          />
        ))}
      </form>
    </div>
  );
};
