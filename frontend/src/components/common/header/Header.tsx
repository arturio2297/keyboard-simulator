import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import useStores from "../../../hooks/useStores";
import Button from "../../../ui/button/Button";
import {NavLink} from "react-router-dom";
import urls from "../../../urls";
import ConfirmDialog from "../dialogs/ConfirmDialog";
import useDialog from "../../../hooks/useDialog";
import {cs} from "../../../utils/styles.utils";

interface HeaderProps {
  showActions?: boolean;
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
        <NavLink to={urls.main}>
          <h1>Keyboard Simulator</h1>
        </NavLink>
      </section>
      {props.showActions
        ? <>
        {account ?
          <section className={styles['account-section']}>
            <p>{account.email}</p>
            <Button
              variant="warning"
              onClick={logoutDialog.open}
            >
              Logout
            </Button>
          </section>
          :
          <section className={styles['actions-section']}>
            <NavLink to={urls.registration}>
              <Button variant="dark">Sign Up</Button>
            </NavLink>
            <NavLink to={urls.login}>
              <Button variant="success">Sing In</Button>
            </NavLink>
          </section>}
      </>
      : <div/>}
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