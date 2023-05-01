import {RootStore} from "../stores/RootStore";
import {SimulatorStore} from "../stores/SimulatorStore";
import {RegistrationStore} from "../stores/RegistrationStore";
import {AccountStore} from "../stores/AccountStore";
import {UiStore} from "../stores/UiStore";
import {PasswordRecoveryStore} from "../stores/PasswordRecoveryStore";

export interface ApplicationContextValue {
  rootStore: RootStore;
  simulationStore: SimulatorStore;
  registrationStore: RegistrationStore;
  accountStore: AccountStore;
  uiStore: UiStore;
  passwordRecoveryStore: PasswordRecoveryStore;
}