import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import {Action} from "../../../../../contracts/common.contracts";
import Modal from "../../../../../ui/modal/Modal";
import * as yup from "yup";
import {code, requiredSting} from "../../../../../validation/schemas";
import {useFormik} from "formik";
import {useState} from "react";
import useStores from "../../../../../hooks/useStores";
import {Account} from "../../../../../stores/domain/Account";
import Input from "../../../../../ui/input/Input";
import Button from "../../../../../ui/button/Button";
import {noOp} from "../../../../../utils/object.utils";

interface EmailFormValues {
  email: Email;
}

interface CodeFormValues {
  code: Code;
}

const emailValidationSchema = yup.object().shape({
  email: requiredSting('Email is required')
})

const codeValidationSchema = yup.object().shape({
  code: code('Code must be 6 digits')
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
    initialValues: {email: ''},
    validationSchema: emailValidationSchema,
    onSubmit: noOp // ignored
  });
  const codeFormik = useFormik<CodeFormValues>({
    initialValues: {code: ''},
    validationSchema: codeValidationSchema,
    onSubmit: noOp // ignored
  });

  const submitEmailForm = async () => {
    await emailFormik.submitForm();
    if (emailFormik.isValid) {
      account.sendChangeEmailCode(
        {email: emailFormik.values.email},
        () => setState({...state, codeSent: true})
      );
    }
  }

  const submitCodeForm = async () => {
    account.confirmChangeEmail(
      {email: emailFormik.values.email, code: codeFormik.values.code},
      () => accountStore.logout()
    );
  }

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
              <p>An email with a confirmation code was sent to {emailFormik.values.email}.</p>
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
                name="email"
                label="New Email"
                value={emailFormik.values.email}
                onChange={emailFormik.handleChange}
                touched={emailFormik.touched.email}
                error={emailFormik.errors.email}
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