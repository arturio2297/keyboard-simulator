import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import {Action} from "../../../../../contracts/common.contracts";
import Modal from "../../../../../ui/modal/Modal";
import * as yup from "yup";
import {useFormik} from "formik";
import {useState} from "react";
import useStores from "../../../../../hooks/useStores";
import {Account} from "../../../../../stores/domain/Account";
import Input from "../../../../../ui/input/Input";
import Button from "../../../../../ui/button/Button";
import schemas from "../../../../../validation/schemas";

interface EmailFormValues {
  oldEmail: Email;
  newEmail: Email;
}

interface CodeFormValues {
  code: Code;
}

const emailValidationSchema = yup.object().shape({
  oldEmail: yup.string(),
  newEmail: schemas.email()
    .test({
      name: 'newEmail',
      message: 'New email must be different from the old one',
      test: (value, {parent}) => value !== parent.oldEmail
    })
})

const codeValidationSchema = yup.object().shape({
  code: schemas.code()
})

interface Props {
  onCancel: Action;
}

interface State {
  codeSent: boolean;
}

const initialState: State = {
  codeSent: false
}

function ChangeEmailDialog(props: Props): JSX.Element {

  const [state, setState] = useState<State>(initialState);
  const {accountStore} = useStores();
  const account = accountStore.account as Account;
  const loading = account.loading.sendChangeEmailCode || account.loading.confirmChangeEmail;
  const emailFormik = useFormik<EmailFormValues>({
    initialValues: {newEmail: '', oldEmail: account.email},
    validationSchema: emailValidationSchema,
    onSubmit: ({newEmail: email}) => {
      account.sendChangeEmailCode(
        {email},
        () => setState({...state, codeSent: true})
      );
    }
  });
  const codeFormik = useFormik<CodeFormValues>({
    initialValues: {code: ''},
    validationSchema: codeValidationSchema,
    onSubmit: ({code}) => {
      account.confirmChangeEmail(
        {email: emailFormik.values.newEmail, code},
        () => accountStore.logout()
      );
    }
  });

  const submitEmailForm = async () => await emailFormik.submitForm();

  const submitCodeForm = async () => await codeFormik.submitForm();

  return (
    <Modal
      show
      onClose={props.onCancel}
      onBackdropClick={props.onCancel}
      header={<b>Change email</b>}
      body={
        <>
          {state.codeSent
            ? <>
              <p>An email with a confirmation code was sent to {emailFormik.values.newEmail}.</p>
              <p>Please enter this code below and click "Confirm"</p>
            </>
            : <p>After changing the email, you will need to re-login to the account using the new email</p>
          }
          {state.codeSent
            ? <form
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
                readOnly={loading}
              />
            </form>
            : <form
              className={styles['form']}
              onSubmit={emailFormik.handleSubmit}
              noValidate
            >
              <Input
                classnames={{
                  label: styles['label']
                }}
                name="newEmail"
                value={emailFormik.values.newEmail}
                onChange={emailFormik.handleChange}
                touched={emailFormik.touched.newEmail}
                error={emailFormik.errors.newEmail}
                readOnly={loading}
              />
            </form>}
        </>
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
            onClick={state.codeSent ? submitCodeForm : submitEmailForm}
            loading={loading}
          >
            Confirm
          </Button>
        </>
      }
    />
  );
}

export default observer(ChangeEmailDialog);