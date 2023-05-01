import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import Avatar from "../../../../ui/avatar/Avatar";
import useStores from "../../../../hooks/useStores";
import {Account} from "../../../../stores/domain/Account";
import FileInput from "../../../../ui/file-input/FileInput";
import * as yup from "yup";
import {requiredSting} from "../../../../validation/schemas";
import {useFormik} from "formik";
import Input from "../../../../ui/input/Input";
import {prettyDate} from "../../../../utils/date.utils";
import Button from "../../../../ui/button/Button";

interface FormValues {
  email: Email;
  firstname: string;
  lastname: string;
  registrationDate: DateString;
}

const validationSchema = yup.object().shape({
  firstname: requiredSting('Firstname is required'),
  lastname: requiredSting('Lastname is required')
})

function InfoSection(): JSX.Element {

  const {accountStore} = useStores();
  const account = accountStore.account as Account;
  const formik = useFormik<FormValues>({
    initialValues: {
      email: account.email,
      firstname: account.firstname,
      lastname: account.lastname,
      registrationDate: account.registrationDate
    },
    validationSchema,
    onSubmit: ({firstname, lastname, ..._}) => {
      account.update({firstname, lastname});
    }
  });

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
          size="xxl"
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
        />
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
    </section>
  );
}

export default observer(InfoSection);