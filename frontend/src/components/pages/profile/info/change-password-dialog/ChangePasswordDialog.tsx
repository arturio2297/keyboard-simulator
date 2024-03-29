import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import {Action} from "../../../../../contracts/common.contracts";
import Modal from "../../../../../ui/modal/Modal";
import Button from "../../../../../ui/button/Button";
import * as yup from "yup";
import {useFormik} from "formik";
import useStores from "../../../../../hooks/useStores";
import {Account} from "../../../../../stores/domain/Account";
import PasswordInput from "../../../../../ui/password-input/PasswordInput";
import schemas from "../../../../../validation/schemas";

interface FormValues {
  oldPassword: Password;
  newPassword: Password;
  repeatNewPassword: Password;
}

const initialValues: FormValues = {
  oldPassword: '',
  newPassword: '',
  repeatNewPassword: ''
}

const validationSchema = yup.object().shape({
  oldPassword: schemas.password(),
  newPassword: schemas.password(),
  repeatNewPassword: yup.string().test({
    name: 'repeatNewPassword',
    message: 'Passwords must be equal',
    test: (value, {parent}) => parent.newPassword === value
  })
})

interface Props {
  onCancel: Action;
}

function ChangePasswordDialog(props: Props): JSX.Element {

  const {accountStore} = useStores();
  const account = accountStore.account as Account;
  const loading = account.loading.checkPassword || account.loading.updatePassword;
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: ({newPassword: password}) => {
      account.checkPassword(
        formik.values.oldPassword,
        // old password correct
        () => account.updatePassword({password}, props.onCancel),
        // old password incorrect
        () => formik.setFieldError('oldPassword', 'Incorrect old password. Check the correctness of the entered password')
      );
    }
  });

  const submitForm = async () => await formik.submitForm();

  return (
    <Modal
      show
      onClose={props.onCancel}
      onBackdropClick={props.onCancel}
      header={<b>Change password</b>}
      body={
        <form
          className={styles['form']}
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <PasswordInput
            classnames={{
              label: styles['label']
            }}
            name="oldPassword"
            label="Old Password"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            touched={formik.touched.oldPassword}
            error={formik.errors.oldPassword}
            readOnly={loading}
          />
          <PasswordInput
            classnames={{
              label: styles['label']
            }}
            name="newPassword"
            label="New Password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            touched={formik.touched.newPassword}
            error={formik.errors.newPassword}
            readOnly={loading}
          />
          <PasswordInput
            classnames={{
              label: styles['label']
            }}
            name="repeatNewPassword"
            label="Repeat New Password"
            value={formik.values.repeatNewPassword}
            onChange={formik.handleChange}
            touched={formik.touched.repeatNewPassword}
            error={formik.errors.repeatNewPassword}
            readOnly={loading}
          />
        </form>
      }
      footer={
        <>
          <Button
            variant="danger"
            onClick={props.onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={submitForm}
            loading={loading}
          >
            Confirm
          </Button>
        </>
      }
    />
  );
}

export default observer(ChangePasswordDialog);