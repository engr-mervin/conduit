"use client";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateUserName,
} from "@/utils/validationFunctions";

import Form, { generateFormData, generateFormValidity } from "@/hooks/Form";

import { InputPropsDeclared } from "@/types/input-props";
import { supabase } from "@/client";

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

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          preferred_name: formData.preferredName,
          user_name: formData.userName,
          full_name: "Mervin Bocatcat the third",
        },
      },
    });

    console.log(data, error);
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
