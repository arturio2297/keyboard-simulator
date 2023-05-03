import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import useStores from "../../../hooks/useStores";
import Button from "../../../ui/button/Button";
import urls from "../../../urls";
import ConfirmDialog from "../dialogs/ConfirmDialog";
import useDialog from "../../../hooks/useDialog";
import {cs} from "../../../utils/styles.utils";
import IconButton from "../../../ui/icon-button/IconButton";
import {User} from "react-feather";
import Link from "../../../ui/link/Link";

interface HeaderProps {
  classname?: string;
}

function Header(props: HeaderProps): JSX.Element {

  const {accountStore} = useStores();
  const {account} = accountStore;
  const logoutDialog = useDialog({
    confirm: () => accountStore.logout()
  });

  return (
    <header className={cs(styles['header'], props.classname)}>
      <section className={styles['logo-section']}>
        <Link
          href={urls.main}
          variant="dark"
          underline="none"
        >
          <h1>Keyboard Simulator</h1>
        </Link>
      </section>
      {account ?
        <section className={styles['account-section']}>
          <Link href={urls.profile} underline="none">
            <IconButton variant="dark">
              {account.email}
              <User/>
            </IconButton>
          </Link>
          <Button
            variant="warning"
            onClick={logoutDialog.open}
          >
            Logout
          </Button>
        </section>
        :
        <section className={styles['actions-section']}>
          <Link
            href={urls.registration}
            underline="none"
          >
            <Button variant="dark">Sign Up</Button>
          </Link>
          <Link
            href={urls.login}
            underline="none"
          >
            <Button variant="success">Sing In</Button>
          </Link>
        </section>}
      {logoutDialog.show &&
          <ConfirmDialog
              title="Logout"
              text="Are you sure you want to log out of your account?"
              onCancel={logoutDialog.close}
              onConfirm={logoutDialog.confirm}
          />}
    </header>
  );
}

export default observer(Header);