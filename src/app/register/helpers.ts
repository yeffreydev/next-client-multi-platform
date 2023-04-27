export function validateEmail(email: string): string {
  if (!email.length) return "email is required";
  const regex = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
  return !regex.test(email) ? "Invalid email" : "";
}

export function validateUsername(username: string): string {
  if (!username.length) return "username is required";
  if (username.length < 3) return "Username must be at least 3 characters long";
  if (username.length > 20) return "Username must be less than 20 characters long";
  if (!username.match(/^[a-zA-Z0-9_]+$/)) return "Username can only contain letters, numbers and underscores";
  return "";
}

export function validatePassword(password: string): string {
  if (!password.length) return "password is required";
  const minLength = 6;
  return password.length < minLength ? `Password must be at least ${minLength} characters long` : "";
}

export function validateConfirmPassword(password: string, confirmPassword: string): string {
  return password !== confirmPassword ? "Passwords must match" : "";
}

export function validateFields(fields: { email: string; username: string; password: string; confirmPassword: string; terms: boolean }) {
  let keyError = "";
  let error = "";
  //validate email
  keyError = "email";
  error = validateEmail(fields.email);
  if (error) return { key: keyError, error };
  //validate username
  keyError = "username";
  error = validateUsername(fields.username);
  if (error) return { key: keyError, error };
  //validate password
  keyError = "password";
  error = validatePassword(fields.password);
  if (error) return { key: keyError, error };
  //validate confirm passwor
  keyError = "confirmPassword";
  error = validateConfirmPassword(fields.password, fields.confirmPassword);
  if (error) return { key: keyError, error };
  //validate terms
  if (!fields.terms) return { key: "terms", error: "You must agree to the terms and conditions" };
  return { key: keyError, error };
}
