import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import {OnChange} from "../../../../contracts/common.contracts";
import * as yup from "yup";
import Card from "../../../../ui/card/Card";
import {cs, csc} from "../../../../utils/styles.utils";
import useClose from "../../../../hooks/useClose";
import {useFormik} from "formik";
import useStores from "../../../../hooks/useStores";
import Input from "../../../../ui/input/Input";
import Button from "../../../../ui/button/Button";
import Text from "../../../../ui/text/Text";
import schemas from "../../../../validation/schemas";

export interface FormValues {
  code: Code;
}

const initialValues: FormValues = {
  code: ''
}

const validationSchema = yup.object().shape({
  code: schemas.code()
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
        <Text variant="light">
          An email with a confirmation code was sent to {props.email}
        </Text>
        <Text variant="light">
          Please enter this code below and click to "Confirm"
        </Text>
        <form
          className={styles['form']}
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <Input
            classnames={{
              container: styles['code-field-container']
            }}
            name="code"
            placeholder="XXXXXX"
            value={formik.values.code}
            onChange={formik.handleChange}
            touched={formik.touched.code}
            error={formik.errors.code}
          />
          <Button
            type="submit"
            variant="success"
            loading={loading.checkCode}
          >
            Confirm
          </Button>
        </form>
      </Card>
    </section>
  );
}

export default observer(ConfirmFormSection);