import {RootStore} from "../stores/RootStore";
import {SimulatorStore} from "../stores/SimulatorStore";
import {RegistrationStore} from "../stores/RegistrationStore";
import {AccountStore} from "../stores/AccountStore";

export interface ApplicationContextValue {
  rootStore: RootStore;
  simulationStore: SimulatorStore;
  registrationStore: RegistrationStore;
  accountStore: AccountStore;
}