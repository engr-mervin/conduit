import {
  VALIDATION_EMAIL_MAX_LENGTH,
  VALIDATION_EMAIL_MIN_LENGTH,
  VALIDATION_EMAIL_REGEX_PATTERN,
  VALIDATION_NAME_MAX_LENGTH,
  VALIDATION_NAME_MIN_LENGTH,
  VALIDATION_NAME_REGEX_PATTERN,
  VALIDATION_PASSWORD_MAX_LENGTH,
  VALIDATION_PASSWORD_MIN_LENGTH,
  VALIDATION_PASSWORD_REGEX_PATTERN,
  VALIDATION_USER_NAME_MAX_LENGTH,
  VALIDATION_USER_NAME_MIN_LENGTH,
  VALIDATION_USER_NAME_REGEX_PATTERN,
} from "./constants";

const validate = function (
  minLength: number,
  maxLength: number,
  regexPattern: RegExp
) {
  return (inputString: string): boolean => {
    if (inputString.length > maxLength || inputString.length < minLength) {
      return false;
    }

    return regexPattern.test(inputString);
  };
};

export const validateName = validate(
  VALIDATION_NAME_MIN_LENGTH,
  VALIDATION_NAME_MAX_LENGTH,
  VALIDATION_NAME_REGEX_PATTERN
);

export const validateUserName = validate(
  VALIDATION_USER_NAME_MIN_LENGTH,
  VALIDATION_USER_NAME_MAX_LENGTH,
  VALIDATION_USER_NAME_REGEX_PATTERN
);
export const validatePassword = validate(
  VALIDATION_PASSWORD_MIN_LENGTH,
  VALIDATION_PASSWORD_MAX_LENGTH,
  VALIDATION_PASSWORD_REGEX_PATTERN
);

export const validateEmail = validate(
  VALIDATION_EMAIL_MIN_LENGTH,
  VALIDATION_EMAIL_MAX_LENGTH,
  VALIDATION_EMAIL_REGEX_PATTERN
);
