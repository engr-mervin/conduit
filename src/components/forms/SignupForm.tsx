"use client";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateUserName,
} from "@/utils/validationFunctions";

import Form, { generateFormData, generateFormValidity } from "@/hooks/Form";

import { InputPropsDeclared } from "@/types/input-props";

const SignUpForm = function () {
  const inputsData: InputPropsDeclared[] = [
    {
      validatingFunction: validateEmail,
      label: "Email",
      field: "email",
      inputType: "email",
    },
    {
      validatingFunction: validateName,
      label: "First Name",
      field: "firstName",
    },
    {
      validatingFunction: validateName,
      label: "Last Name",
      field: "lastName",
    },
    {
      validatingFunction: validateName,
      label: "Preferred Name",
      field: "preferredName",
      isRequired: false,
    },
    {
      validatingFunction: validateUserName,
      label: "User Name",
      field: "userName",
    },
    {
      validatingFunction: validatePassword,
      label: "Password",
      field: "password",
      inputType: "password",
    },
    {
      validatingFunction: validatePassword,
      label: "Confirm Password",
      field: "confirmPassword",
      inputType: "password",
    },
  ];

  const initialFormData = generateFormData(inputsData);

  const initialFormValidity = generateFormValidity(inputsData);

  const onFormSubmit = async function (
    formData: any,
    changeStatusMessage: (status: string) => void
  ) {
    if (formData.password !== formData.confirmPassword) {
      changeStatusMessage("Passwords do not match.");
      return;
    }

    let formDataForRequest = new FormData();
    for (const key in formData) {
      formDataForRequest.append(key, formData[key]);
    }

    const signUpResponse = await fetch("/api/users", {
      method: "POST",
      body: formDataForRequest,
    });

    const signUpData = await signUpResponse.json();
    console.log(signUpData);
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

export default SignUpForm;
