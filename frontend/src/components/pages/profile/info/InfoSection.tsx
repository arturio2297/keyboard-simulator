import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import Avatar from "../../../../ui/avatar/Avatar";
import useStores from "../../../../hooks/useStores";
import {Account} from "../../../../stores/domain/Account";
import FileInput from "../../../../ui/file-input/FileInput";
import * as yup from "yup";
import {useFormik} from "formik";
import Input from "../../../../ui/input/Input";
import {prettyDate} from "../../../../utils/date.utils";
import Button from "../../../../ui/button/Button";
import {Edit} from "react-feather";
import IconButton from "../../../../ui/icon-button/IconButton";
import useDialog from "../../../../hooks/useDialog";
import ChangeEmailDialog from "./change-email-dialog/ChangeEmailDialog";
import ChangePasswordDialog from "./change-password-dialog/ChangePasswordDialog";
import schemas from "../../../../validation/schemas";

interface FormValues {
  email: Email;
  password: Password;
  firstname: string;
  lastname: string;
  registrationDate: DateString;
}

const validationSchema = yup.object().shape({
  firstname: schemas.requiredSting(),
  lastname: schemas.requiredSting()
})

function InfoSection(): JSX.Element {

  const {accountStore} = useStores();
  const account = accountStore.account as Account;
  const formik = useFormik<FormValues>({
    initialValues: {
      email: account.email,
      password: '******',
      firstname: account.firstname,
      lastname: account.lastname,
      registrationDate: account.registrationDate
    },
    validationSchema,
    onSubmit: ({firstname, lastname, ..._}) => {
      account.update({firstname, lastname});
    }
  });
  const {
    show: showChangeEmailDialog,
    open: openChangeEmailDialog,
    close: closeChangeEmailDialog
  } = useDialog();
  const {
    show: showChangePasswordDialog,
    open: openChangePasswordDialog,
    close: closeChangePasswordDialog
  } = useDialog();

  const onAvatarChange = (avatar: File) => {
    account.updateAvatar(avatar);
  }

  return (
    <section className={styles['info-section']}>
      <div className={styles['avatar-segment']}>
        <Avatar
          classname={styles['avatar']}
          loading={account.loading.updateAvatar}
          userId={account.id}
          size="xl"
        />
        <FileInput
          onChange={onAvatarChange}
          buttonProps={{
            variant: "success",
            loading: account.loading.updateAvatar
          }}
        >
          Upload Avatar
        </FileInput>
      </div>
      <form
        className={styles['form']}
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <Input
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          readOnly
        >
          <IconButton
            classname={styles['edit-button']}
            variant="text"
            type="button"
            onClick={openChangeEmailDialog}
          >
            <Edit/>
          </IconButton>
        </Input>
        <Input
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          readOnly
        >
          <IconButton
            classname={styles['edit-button']}
            variant="text"
            type="button"
            onClick={openChangePasswordDialog}
          >
            <Edit/>
          </IconButton>
        </Input>
        <Input
          name="firstname"
          label="Firstname"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          touched={formik.touched.firstname}
          error={formik.errors.firstname}
        />
        <Input
          name="lastname"
          label="Lastname"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          touched={formik.touched.lastname}
          error={formik.errors.lastname}
        />
        <Input
          name="registrationDate"
          label="Registration Date"
          value={prettyDate(formik.values.registrationDate)}
          onChange={formik.handleChange}
          readOnly
        />
        <Button
          variant="success"
          type="submit"
          loading={account.loading.update}
        >
          Update
        </Button>
      </form>
      {showChangeEmailDialog && <ChangeEmailDialog onCancel={closeChangeEmailDialog}/>}
      {showChangePasswordDialog && <ChangePasswordDialog onCancel={closeChangePasswordDialog}/>}
    </section>
  );
}

export default observer(InfoSection);