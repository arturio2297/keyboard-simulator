import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import useStores from "../../../../hooks/useStores";
import Button from "../../../../ui/button/Button";
import {NavLink} from "react-router-dom";
import urls from "../../../../urls";

function Header(): JSX.Element {

  const {accountStore} = useStores();
  const {account} = accountStore;

  return (
    <header className={styles['header']}>
      <section className={styles['logo-section']}>
        <h1>Keyboard Simulator</h1>
      </section>
      {account ?
        <section className={styles['account-section']}>

        </section>
        :
        <section className={styles['actions-section']}>
          <NavLink to={urls.registration}>
            <Button variant="light">Sign Up</Button>
          </NavLink>
          <NavLink to={urls.login}>
            <Button variant="light">Sing In</Button>
          </NavLink>
        </section>}
    </header>
  );
}

export default observer(Header);