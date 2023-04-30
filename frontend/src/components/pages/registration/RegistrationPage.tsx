import useStores from "../../../hooks/useStores";
import {observer} from "mobx-react-lite";
import SendCodeSection from "./send-code/SendCodeSection";

function RegistrationPage(): JSX.Element {

  const {registrationStore} = useStores();
  const {loading} = registrationStore;

  return (
    <main>
      <SendCodeSection/>
    </main>
  );
}

export default observer(RegistrationPage);