import { useState } from "react";
import { InputPropsDeclared, InputPropsFromHook } from "@/types/input-props";
import Input from "@/components/reusable/Input";

interface FormProps extends React.ComponentProps<"form"> {
  initialFormData: any;
  initialFormValidity: any;
  inputsArray: InputPropsDeclared[];
  onFormSubmit: any;
}
const Form = function ({
  initialFormData,
  initialFormValidity,
  inputsArray,
  children,
  onFormSubmit,
}: FormProps) {
  const [formData, setFormData] = useState<any>(initialFormData);
  const [formValidity, setFormValidity] = useState<any>(initialFormValidity);
  const [touchFunctionsArray, setTouchFunctionsArray] = useState<
    (() => void)[]
  >([]);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const mutateFormValidity = function (field: string, newValue: any) {
    setFormValidity((previousValidity: any) => {
      return { ...previousValidity, [field]: newValue };
    });
  };

  const mutateFormData = function (field: string, newValue: any) {
    setFormData((previousData: any) => {
      return { ...previousData, [field]: newValue };
    });
  };

  const addTouch = function (touchFunction: () => void) {
    setTouchFunctionsArray((previousTouchFunctions) => {
      if (previousTouchFunctions.includes(touchFunction))
        return previousTouchFunctions;

      return [...previousTouchFunctions, touchFunction];
    });
  };

  const removeTouch = function (touchFunction: () => void) {
    setTouchFunctionsArray((previousTouchFunctions) => {
      const newTouchFunctions = [...previousTouchFunctions];
      const indexOfTouchFunction = previousTouchFunctions.findIndex(
        (touchFunctionElement) => touchFunctionElement === touchFunction
      );
      if (indexOfTouchFunction === -1) return previousTouchFunctions;
      newTouchFunctions.splice(indexOfTouchFunction, 1);
      return newTouchFunctions;
    });
  };

  const invokeAllTouchFunctions = function () {
    for (const touchFunction of touchFunctionsArray) {
      touchFunction();
    }
  };

  const inputParams: InputPropsFromHook = {
    addTouch,
    removeTouch,
    mutateFormData,
    mutateFormValidity,
  };

  const changeStatusMessage = function (status: string) {
    setStatusMessage(status);
  };

  const submitHandler = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    invokeAllTouchFunctions();

    if (Object.values(formValidity).includes(false)) {
      setStatusMessage("Please fix input errors.");
      return;
    }
    setStatusMessage("");
    await onFormSubmit(formData, changeStatusMessage);
  };

  return (
    <form onSubmit={submitHandler}>
      {inputsArray.map((input, index) => (
        <Input key={index} {...inputParams} {...input} />
      ))}
      <button type="submit">Submit</button>
      <p>{statusMessage}</p>
      {children}
    </form>
  );
};

export default Form;

export const generateFormData = function (inputsArray: InputPropsDeclared[]) {
  let formData: { [key: string]: string } = {};
  inputsArray.map((input) => {
    const initialValue = input.initialValue ? input.initialValue : "";
    const field = input.field;
    formData[field] = initialValue;
  });
  return formData;
};

export const generateFormValidity = function (
  inputsArray: InputPropsDeclared[]
) {
  let formValidity: { [key: string]: boolean } = {};
  inputsArray.map((input) => {
    const initialValidity =
      input.isRequired === undefined ? false : !input.isRequired;
    const field = input.field;
    formValidity[field] = initialValidity;
  });
  return formValidity;
};
