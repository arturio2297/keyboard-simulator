import * as yup from "yup";

export const requiredSting = (message?: string) => yup.string().required(message);

export const password = (message?: string) => yup.string().required(message).min(8, message);

export const code = (message?: string) => yup.string().test({
  message,
  name: 'code',
  test: value => /^[0-9]{6}$/.test(value || '')
});