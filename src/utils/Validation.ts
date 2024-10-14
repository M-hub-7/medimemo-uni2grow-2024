const ERROR_MESSAGE = "this field is required";

const isNoEmpty = (value: string): string => {
  if (value != "") {
    return "";
  } else {
    return ERROR_MESSAGE;
  }
};

export const validationSchema: Record<string, validationType> = {
  username: isNoEmpty,
  password: isNoEmpty,
};

export interface formError {
  [key: string]: string;
}

export interface formValues {
  [key: string]: string;
}

type validationType = (value: string) => string;

export function validateForm(values: formValues): formError {
  const errors: formError = {};
  Object.keys(validationSchema).forEach((fieldName) => {
    const value = values[fieldName];
    const error = validationSchema[fieldName](value);
    if (error) errors[fieldName] = error;
  });
  return errors;
}

export function validationField(fieldName: string, value: string): string {
  const error = validationSchema[fieldName](value);
  return error;
}
