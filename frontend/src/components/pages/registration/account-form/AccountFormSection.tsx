import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import {cs, csc} from "../../../../utils/styles.utils";
import useClose from "../../../../hooks/useClose";
import Card from "../../../../ui/card/Card";
import * as yup from "yup";
import {useFormik} from "formik";
import Input from "../../../../ui/input/Input";
import Button from "../../../../ui/button/Button";
import {useNavigate} from "react-router-dom";
import urls from "../../../../urls";
import useStores from "../../../../hooks/useStores";
import {OnChange} from "../../../../contracts/common.contracts";
import PasswordInput from "../../../../ui/password-input/PasswordInput";
import schemas from "../../../../validation/schemas";

export interface FormValues {
  email: Email;
  firstname: string;
  lastname: string;
  password: string;
  repeatPassword: string;
}

const initialValues: FormValues = {
  email: '',
  firstname: '',
  lastname: '',
  password: '',
  repeatPassword: ''
}

const validationSchema = yup.object().shape({
  email: schemas.email(),
  firstname: schemas.requiredSting(),
  lastname: schemas.requiredSting(),
  password: schemas.password(),
  repeatPassword: yup.string().test({
    message: 'Passwords must be equal',
    name: 'repeatPassword',
    test: (value, {parent}) => value === parent.password
  })
})

interface Props {
  onCodeSend: OnChange<FormValues>;
}

function AccountFormSection(props: Props): JSX.Element {

  const [closed, close] = useClose();
  const {registrationStore} = useStores();
  const {loading} = registrationStore;
  const navigate = useNavigate();
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      registrationStore.sendCode(
        {email: values.email},
        () => close(() => props.onCodeSend(values))
      );
    }
  });

  const onLoginPageClick = () => {
    close(() => navigate(urls.login));
  }

  return (
    <section className={styles['account-form-section']}>
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
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            touched={formik.touched.email}
            error={formik.errors.email}
            readOnly={loading.sendCode}
          />
          <Input
            name="firstname"
            label="Firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            touched={formik.touched.firstname}
            error={formik.errors.firstname}
            readOnly={loading.sendCode}
          />
          <Input
            name="lastname"
            label="Lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            touched={formik.touched.lastname}
            error={formik.errors.lastname}
            readOnly={loading.sendCode}
          />
          <PasswordInput
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            touched={formik.touched.password}
            error={formik.errors.password}
            readOnly={loading.sendCode}
          />
          <PasswordInput
            name="repeatPassword"
            label="Repeat Password"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            touched={formik.touched.repeatPassword}
            error={formik.errors.repeatPassword}
            readOnly={loading.sendCode}
          />
          <Button
            variant="success"
            type="submit"
          >
            Confirm
          </Button>
          <Button
            variant="text"
            type="button"
            onClick={onLoginPageClick}
            loading={loading.sendCode}
          >
            I already have account
          </Button>
        </form>
      </Card>
    </section>
  );
}

export default observer(AccountFormSection);