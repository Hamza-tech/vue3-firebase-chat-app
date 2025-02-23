import { reactive } from 'vue';

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  [key: string]: string | undefined;
}

export default function useValidation() {
  const errors = reactive<ValidationErrors>({});

  const validateName = (name: string): void => {
    if (!name) {
      errors.name = 'Name is required';
    } else {
      errors.name = undefined;
    }
  };

  const validateEmail = (email: string): void => {
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email';
    } else {
      errors.email = undefined;
    }
  };

  const validatePassword = (password: string): void => {
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    } else {
      errors.password = undefined;
    }
  };

  const validateConfirmPassword = (password: string, confirmPassword: string): void => {
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    } else {
      errors.confirmPassword = undefined;
    }
  };

  const isFormValid = (): boolean => {
    return Object.values(errors).every((error) => error === undefined);
  };

  return {
    errors,
    validateName,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    isFormValid,
  };
}
