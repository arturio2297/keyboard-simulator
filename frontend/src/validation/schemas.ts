import * as yup from "yup";

const defaultMessages = {
  requiredSting: 'Field is required',
  email: 'Invalid email',
  password: 'Password must be contains 8 characters or more',
  code: 'Code must be contains 6 digits'
}

const requiredSting = (message?: string) => yup.string()
  .required(message || defaultMessages.requiredSting);

const email = (message?: string) => requiredSting()
  .email(message || defaultMessages.email);

const password = (message?: string) => requiredSting()
  .min(8, message || defaultMessages.password);

const code = (message?: string) => yup.string().test({
  message: message || defaultMessages.code,
  name: 'code',
  test: value => /^[0-9]{6}$/.test(value || '')
});

const schemas = {
  requiredSting,
  email,
  password,
  code
}

export default schemas;