import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import {OnChange} from "../../../../contracts/common.contracts";
import * as yup from "yup";
import {code} from "../../../../validation/schemas";
import Card from "../../../../ui/card/Card";
import {cs, csc} from "../../../../utils/styles.utils";
import useClose from "../../../../hooks/useClose";
import {useFormik} from "formik";
import useStores from "../../../../hooks/useStores";
import Input from "../../../../ui/input/Input";
import Button from "../../../../ui/button/Button";
import Loader from "../../../../ui/loader/Loader";

export interface FormValues {
  code: Code;
}

const initialValues: FormValues = {
  code: ''
}

const validationSchema = yup.object().shape({
  code: code('Code must be 6 digits')
})

interface Props {
  onCodeChecked: OnChange<FormValues>;
  email: Email;
}

function ConfirmFormSection(props: Props): JSX.Element {

  const [closed, close] = useClose();
  const {registrationStore} = useStores();
  const {loading} = registrationStore;
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      registrationStore.checkCode(
        values.code, props.email,
        () => close(() => props.onCodeChecked(values)),
        () => formik.setFieldError('code', 'Incorrect value of the registration confirmation code or the code has already expired')
      );
    }
  });

  return (
    <section className={styles['confirm-form-section']}>
      <Card classname={cs(styles['inner'], 'section-appearance', csc({
        'section-disappearance': closed
      }))}>
        <form
          className={styles['form']}
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <p className={styles['text']}>An email with a confirmation code was sent to {props.email}.</p>
          <p className={styles['text']}>Please enter this code below and click "Confirm"</p>
          <Input
            classnames={{
              container: styles['code-field-container']
            }}
            name="code"
            label="Confirmation code"
            placeholder="XXXXXX"
            value={formik.values.code}
            onChange={formik.handleChange}
            touched={formik.touched.code}
            error={formik.errors.code}
          />
          <Button
            type="submit"
            variant="success"
          >
            Confirm
          </Button>
        </form>
      </Card>
      {loading.checkCode && <Loader/>}
    </section>
  );
}

export default observer(ConfirmFormSection);