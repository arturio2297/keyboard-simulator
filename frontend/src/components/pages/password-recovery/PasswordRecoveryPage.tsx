import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";
import {useState} from "react";
import {cs} from "../../../utils/styles.utils";
import Card from "../../../ui/card/Card";
import * as yup from "yup";
import {useFormik} from "formik";
import useStores from "../../../hooks/useStores";
import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";
import PasswordInput from "../../../ui/password-input/PasswordInput";
import Loader from "../../../ui/loader/Loader";
import Text from "../../../ui/text/Text";
import schemas from "../../../validation/schemas";

interface EmailFormValues {
  email: Email;
}

const emailValidationSchema = yup.object().shape({
  email: schemas.email()
})

interface CodeFormValues {
  code: Code
}

const codeValidationSchema = yup.object().shape({
  code: schemas.code()
})

interface ConfirmFormValues {
  password: Password;
  repeatPassword: Password;
}

const confirmValidationSchema = yup.object().shape({
  password: schemas.password(),
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
    onSubmit: ({password}) => {
      passwordRecoveryStore.confirm(
        {password, email: emailFormik.values.email, code: codeFormik.values.code},
        () => accountStore.login({password, email: emailFormik.values.email})
      );
    }
  });

  const submitConfirmForm = async () => await confirmFormik.submitForm();

  return (
    <main className={styles['password-recovery-page']}>
      <Header classname="fixed-header" showActions/>
      <section className={styles['section']}>
        <Card classname={cs(styles['inner'], 'section-appearance')}>
          {state.step === Step.NONE &&
              <Text variant="light">
                  Please enter your email
              </Text>}
          {state.step === Step.CODE_SENT &&
          <>
              <Text variant="light">
                  An email with a confirmation code was sent to {emailFormik.values.email}
              </Text>
              <Text variant="light">
                  Please enter this code below and click "Confirm"
              </Text>
          </>}
          {state.step === Step.CODE_CHECKED &&
              <Text variant="light">
                  Enter new password
              </Text>}
          {state.step === Step.NONE &&
              <form
                  className={styles['form']}
                  onSubmit={emailFormik.handleSubmit}
                  noValidate
              >
                  <Input
                      name="email"
                      type="email"
                      value={emailFormik.values.email}
                      onChange={emailFormik.handleChange}
                      touched={emailFormik.touched.email}
                      error={emailFormik.errors.email}
                      readOnly={passwordRecoveryStore.loading.sendCode}
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
                  <Input
                      name="code"
                      value={codeFormik.values.code}
                      onChange={codeFormik.handleChange}
                      touched={codeFormik.touched.code}
                      error={codeFormik.errors.code}
                      readOnly={passwordRecoveryStore.loading.checkCode}
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
                  <PasswordInput
                      name="password"
                      label="Password"
                      value={confirmFormik.values.password}
                      onChange={confirmFormik.handleChange}
                      touched={confirmFormik.touched.password}
                      error={confirmFormik.errors.password}
                      readOnly={passwordRecoveryStore.loading.confirm}
                  />
                  <PasswordInput
                      name="repeatPassword"
                      label="Repeat Password"
                      value={confirmFormik.values.repeatPassword}
                      onChange={confirmFormik.handleChange}
                      touched={confirmFormik.touched.repeatPassword}
                      error={confirmFormik.errors.repeatPassword}
                      readOnly={passwordRecoveryStore.loading.confirm}
                  />
                  <Button
                      variant="success"
                      type="button"
                      onClick={submitConfirmForm}
                      loading={passwordRecoveryStore.loading.confirm}
                  >
                      Change Password
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