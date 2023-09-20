"use client";

import { InputProps } from "@/types/input-props";
import { useEffect, useState, useCallback } from "react";

const Input = function ({
  validatingFunction,
  label,
  inputType = "text",
  isRequired = true,
  mutateFormData,
  mutateFormValidity,
  field,
  addTouch,
  removeTouch,
  initialValue = "",
}: InputProps) {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(isRequired);

  const inputId = `${label.replace(" ", "").toLowerCase()}`;

  const touch = function () {
    if (isTouched === false) setIsTouched(true);
  };

  useEffect(() => {
    addTouch(touch);

    return () => {
      removeTouch(touch);
    };
  }, []);

  const inputChangeHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    touch();

    const newInputValue = e.target.value;

    setInputValue(newInputValue);
    mutateFormData(field, newInputValue);

    const isValid = isRequired
      ? validatingFunction(newInputValue)
      : validatingFunction(newInputValue) || newInputValue === "";

    setIsInvalid(!isValid);
    mutateFormValidity(field, isValid);
  };

  return (
    <div className="Input">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type={inputType}
        onChange={inputChangeHandler}
        value={inputValue}
        onBlur={touch}
      />
      {isInvalid && isTouched ? <p>Invalid input</p> : ""}
    </div>
  );
};

export default Input;
