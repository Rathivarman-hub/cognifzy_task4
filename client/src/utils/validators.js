export const validateFullName = (value) => {
  if (!value) return 'Full name is required';
  if (value.trim().length < 3) return 'Name must be at least 3 characters';
  return '';
};

export const validateEmail = (value) => {
  if (!value) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return 'Enter a valid email address';
  return '';
};

export const validatePassword = (value) => {
  if (!value) return 'Password is required';
  if (value.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(value)) return 'Must contain at least 1 uppercase letter';
  if (!/[0-9]/.test(value)) return 'Must contain at least 1 number';
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) return 'Must contain at least 1 special character';
  return '';
};

export const validateConfirmPassword = (value, password) => {
  if (!value) return 'Please confirm your password';
  if (value !== password) return 'Passwords do not match';
  return '';
};

export const validatePhone = (value) => {
  if (!value) return 'Phone number is required';
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(value)) return 'Enter a valid 10-digit phone number';
  return '';
};

export const validateDOB = (value) => {
  if (!value) return 'Date of birth is required';
  const dob = new Date(value);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  if (age < 13) return 'You must be at least 13 years old';
  if (age > 120) return 'Invalid date of birth';
  return '';
};

export const validateGender = (value) => {
  if (!value) return 'Please select a gender';
  return '';
};

export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
  if (score <= 2) return { score, label: 'Weak', color: '#ef4444' };
  if (score <= 3) return { score, label: 'Medium', color: '#f59e0b' };
  return { score, label: 'Strong', color: '#10b981' };
};
