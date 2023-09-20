"use client";
import { validateEmail } from "@/utils/validationFunctions";

import Form, { generateFormData, generateFormValidity } from "@/hooks/Form";

import { InputPropsDeclared } from "@/types/input-props";

const SigninForm = function () {
  const inputsData: InputPropsDeclared[] = [
    {
      validatingFunction: (inputString) => true,
      label: "Email",
      field: "email",
      inputType: "email",
    },
    {
      validatingFunction: (inputString) => true,
      label: "Password",
      field: "password",
      inputType: "password",
    },
  ];

  const initialFormData = generateFormData(inputsData);

  const initialFormValidity = generateFormValidity(inputsData);

  const onFormSubmit = async function (
    formData: any,
    changeStatusMessage: (status: string) => void
  ) {
    let formDataForRequest = new FormData();
    for (const key in formData) {
      formDataForRequest.append(key, formData[key]);
    }

    const signInResponse = await fetch("/api/users/signin", {
      method: "POST",
      body: formDataForRequest,
    });

    const signInData = await signInResponse.json();
    console.log(signInData);
  };

  return (
    <Form
      initialFormData={initialFormData}
      initialFormValidity={initialFormValidity}
      inputsArray={inputsData}
      onFormSubmit={onFormSubmit}
    ></Form>
  );
};

export default SigninForm;
