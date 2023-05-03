import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import AccountFormSection, {FormValues as AccountFormValues} from "./account-form/AccountFormSection";
import {FormValues as CodeFormValues} from "./confirm-form/ConfirmFormSection";
import {useState} from "react";
import ConfirmFormSection from "./confirm-form/ConfirmFormSection";
import useStores from "../../../hooks/useStores";
import Loader from "../../../ui/loader/Loader";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";

interface State {
  accountValues: AccountFormValues | null;
}

const initialState: State = {
  accountValues: null
}

function RegistrationPage(): JSX.Element {

  const {accountStore, registrationStore} = useStores();
  const {loading: accountLoading} = accountStore;
  const {loading: registrationLoading} = registrationStore;
  const loading = accountLoading.login || registrationLoading.confirm;
  const [state, setState] = useState<State>(initialState);

  const onCodeChecked = ({code}: CodeFormValues) => {
    const accountValues = state.accountValues as AccountFormValues;
    registrationStore.confirm(
      {...accountValues, code},
      () => accountStore.login({ email: accountValues.email, password: accountValues.password })
    );
  }

  return (
    <main className={styles['registration-page']}>
      <Header classname="fixed-header"/>
      {state.accountValues
        ? <ConfirmFormSection
          onCodeChecked={onCodeChecked}
          email={state.accountValues.email}
        />
        : <AccountFormSection
          onCodeSend={values => setState({...state, accountValues: values})}
        />}
      {loading && <Loader/>}
      <Footer classname="fixed-footer"/>
    </main>
  );
}

export default observer(RegistrationPage);