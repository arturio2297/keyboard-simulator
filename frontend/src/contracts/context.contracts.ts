import {RootStore} from "../stores/RootStore";
import {SimulatorStore} from "../stores/SimulatorStore";
import {RegistrationStore} from "../stores/RegistrationStore";

export interface ApplicationContextValue {
  rootStore: RootStore;
  simulationStore: SimulatorStore;
  registrationStore: RegistrationStore
}