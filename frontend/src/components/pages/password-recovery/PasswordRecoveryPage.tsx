import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";
import {useState} from "react";
import {cs} from "../../../utils/styles.utils";
import Card from "../../../ui/card/Card";
import * as yup from "yup";
import {code, password, requiredSting} from "../../../validation/schemas";
import {useFormik} from "formik";
import useStores from "../../../hooks/useStores";
import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";
import PasswordInput from "../../../ui/password-input/PasswordInput";
import {noOp} from "../../../utils/object.utils";
import {useNavigate} from "react-router-dom";
import urls from "../../../urls";
import Loader from "../../../ui/loader/Loader";

interface EmailFormValues {
  email: Email;
}

const emailValidationSchema = yup.object().shape({
  email: requiredSting('Email is required')
})

interface CodeFormValues {
  code: Code
}

const codeValidationSchema = yup.object().shape({
  code: code('Code must be 6 digits')
})

interface ConfirmFormValues {
  password: Password;
  repeatPassword: Password;
}

const confirmValidationSchema = yup.object().shape({
  password: password('Password must be contains 8 characters or more'),
  repeatPassword: yup.string().test({
    name: 'repeatPassword',
    message: 'Password must be equal',
    test: (value, {parent}) => parent.password === value
  })
})

enum Step {
  NONE,
  CODE_SENT,
  CODE_CHECKED
}

interface State {
  step: Step;
}

const initialState: State = {
  step: Step.NONE
}

function PasswordRecoveryPage(): JSX.Element {

  const [state, setState] = useState<State>(initialState);
  const {passwordRecoveryStore, accountStore} = useStores();
  const emailFormik = useFormik<EmailFormValues>({
    initialValues: {email: ''},
    validationSchema: emailValidationSchema,
    onSubmit: (values) => {
      passwordRecoveryStore.sendCode(
        values,
        () => setState({...state, step: Step.CODE_SENT})
      );
    }
  });
  const codeFormik = useFormik<CodeFormValues>({
    initialValues: {code: ''},
    validationSchema: codeValidationSchema,
    onSubmit: ({code}) => {
      passwordRecoveryStore.checkCode(
        code, emailFormik.values.email,
        () => setState({...state, step: Step.CODE_CHECKED}),
        () => codeFormik.setFieldError('code', 'Invalid password recovery code. Please check the correctness of entered code')
      );
    }
  });
  const confirmFormik = useFormik<ConfirmFormValues>({
    initialValues: {password: '', repeatPassword: ''},
    validationSchema: confirmValidationSchema,
    onSubmit: noOp // ignored
  });
  const navigate = useNavigate();

  const submitConfirmForm = async (login: boolean) => {
    await confirmFormik.submitForm();
    if (confirmFormik.isValid) {
      passwordRecoveryStore.confirm(
        { password: confirmFormik.values.password, email: emailFormik.values.email, code: codeFormik.values.code },
        () => {
          if (login) {
            accountStore.login({ password: confirmFormik.values.password, email: emailFormik.values.email })
          } else {
            navigate(urls.login);
          }
        }
      );
    }
  }

  return (
    <main className={styles['password-recovery-page']}>
      <Header classname="fixed-header" showActions/>
      <section className={styles['section']}>
        <Card classname={cs(styles['inner'], 'section-appearance')}>
          {state.step === Step.NONE &&
              <form
                  className={styles['form']}
                  onSubmit={emailFormik.handleSubmit}
                  noValidate
              >
                  <p className={styles['text']}>Please enter your email</p>
                  <Input
                      name="email"
                      type="email"
                      value={emailFormik.values.email}
                      onChange={emailFormik.handleChange}
                      touched={emailFormik.touched.email}
                      error={emailFormik.errors.email}
                  />
                  <Button
                      variant="success"
                      type="submit"
                      loading={passwordRecoveryStore.loading.sendCode}
                  >
                      Send Code
                  </Button>
              </form>}
          {state.step === Step.CODE_SENT &&
              <form
                  className={styles['form']}
                  onSubmit={codeFormik.handleSubmit}
                  noValidate
              >
                  <p className={styles['text']}>An email with a confirmation code was sent to {emailFormik.values.email}.</p>
                  <p className={styles['text']}>Please enter this code below and click "Confirm"</p>
                  <Input
                      name="code"
                      value={codeFormik.values.code}
                      onChange={codeFormik.handleChange}
                      touched={codeFormik.touched.code}
                      error={codeFormik.errors.code}
                  />
                  <Button
                      variant="success"
                      type="submit"
                      loading={passwordRecoveryStore.loading.checkCode}
                  >
                      Confirm
                  </Button>
              </form>}
          {state.step === Step.CODE_CHECKED &&
              <form
                  className={styles['form']}
                  onSubmit={confirmFormik.handleSubmit}
                  noValidate
              >
                  <p className={styles['text']}>Enter new password</p>
                  <PasswordInput
                      name="password"
                      label="Password"
                      value={confirmFormik.values.password}
                      onChange={confirmFormik.handleChange}
                      touched={confirmFormik.touched.password}
                      error={confirmFormik.errors.password}
                  />
                  <PasswordInput
                      name="repeatPassword"
                      label="Repeat Password"
                      value={confirmFormik.values.repeatPassword}
                      onChange={confirmFormik.handleChange}
                      touched={confirmFormik.touched.repeatPassword}
                      error={confirmFormik.errors.repeatPassword}
                  />
                  <Button
                      variant="success"
                      type="button"
                      onClick={() => submitConfirmForm(false)}
                      loading={passwordRecoveryStore.loading.confirm}
                  >
                      Change Password
                  </Button>
                  <Button
                      variant="warning"
                      type="button"
                      onClick={() => submitConfirmForm(true)}
                      loading={passwordRecoveryStore.loading.confirm}
                  >
                      Change password and login
                  </Button>
              </form>}
        </Card>
      </section>
      {accountStore.loading.login && <Loader/>}
      <Footer classname="fixed-footer"/>
    </main>
  );
}

export default observer(PasswordRecoveryPage);