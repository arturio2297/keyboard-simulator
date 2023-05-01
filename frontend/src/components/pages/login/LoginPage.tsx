import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import Card from "../../../ui/card/Card";
import {cs, csc} from "../../../utils/styles.utils";
import useClose from "../../../hooks/useClose";
import * as yup from "yup";
import {password, requiredSting} from "../../../validation/schemas";
import {useFormik} from "formik";
import useStores from "../../../hooks/useStores";
import Loader from "../../../ui/loader/Loader";
import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";
import PasswordInput from "../../../ui/password-input/PasswordInput";
import {useNavigate} from "react-router-dom";
import urls from "../../../urls";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";

interface FormValues {
  email: Email;
  password: Password;
}

const initialValues: FormValues = {
  email: '',
  password: ''
}

const validationSchema = yup.object().shape({
  email: requiredSting('Email is required'),
  password: password('Password must be contains 8 characters or more')
})

function LoginPage(): JSX.Element {

  const [closed, close] = useClose();
  const {accountStore} = useStores();
  const {loading} = accountStore;
  const navigate = useNavigate();
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      accountStore.login(values);
    }
  });

  const onRegistrationPageClick = () => {
    close(() => navigate(urls.registration));
  }

  return (
    <main className={styles['login-page']}>
      <Header classname="fixed-header"/>
      <section className={styles['section']}>
        <Card classname={cs(styles['inner'], 'section-appearance', csc({
          'section-disappearance': closed
        }))}>
          <form
            className={styles['form']}
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <Input
              name="email"
              type="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              touched={formik.touched.email}
              error={formik.errors.email}
            />
            <PasswordInput
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              touched={formik.touched.password}
              error={formik.errors.password}
            />
            <Button
              type="submit"
              variant="success"
            >
              Confirm
            </Button>
            <Button
              type="button"
              variant="text"
              onClick={onRegistrationPageClick}
            >
              I don't have an account yet
            </Button>
          </form>
        </Card>
      </section>
      <Footer classname="fixed-footer"/>
      {(loading.login || loading.fetchAccount) && <Loader/>}
    </main>
  );
}

export default observer(LoginPage);