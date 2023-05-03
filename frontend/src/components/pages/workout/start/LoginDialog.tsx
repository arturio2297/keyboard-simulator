import {observer} from "mobx-react-lite";
import Modal from "../../../../ui/modal/Modal";
import {Action} from "../../../../contracts/common.contracts";
import Text from "../../../../ui/text/Text";
import Button from "../../../../ui/button/Button";
import Link from "../../../../ui/link/Link";
import urls from "../../../../urls";
import {useFormik} from "formik";
import Checkbox from "../../../../ui/checkbox/Checkbox";
import settingsStorage from "../../../../storage/SettingsStorage";

interface FormValues {
  dontShowDialog: boolean;
}

const initialValues: FormValues = {
  dontShowDialog: false
}

interface Props {
  onCancel: Action;
  onContinueWithoutLogin: Action;
}

function LoginDialog(props: Props): JSX.Element {

  const formik = useFormik<FormValues>({
    initialValues,
    onSubmit: () => {
      settingsStorage.setField('showLoginDialogBeforeWorkout', !formik.values.dontShowDialog);
      props.onContinueWithoutLogin();
    }
  });

  const submitForm = async () => await formik.submitForm();

  return (
    <Modal
      show
      onClose={props.onCancel}
      onBackdropClick={props.onCancel}
      header={<Text fontWeight={600}>Saving statistics</Text>}
      body={
      <>
        <Text>Remember that you need to log in to save your work statistics</Text>
        <Checkbox
          name="dontShowDialog"
          formik={formik}
          label="Don`t show this dialog"
          variant="dark"
        />
      </>
      }
      footer={
        <>
          <Button
            variant="warning"
            onClick={submitForm}
          >
            Continue without login
          </Button>
          <Link
            href={urls.login}
            underline="none"
          >
            <Button variant="success">
              Login
            </Button>
          </Link>
        </>
      }
    />
  );
}

export default observer(LoginDialog);