import {RootStore} from "../stores/RootStore";
import {SimulatorStore} from "../stores/SimulatorStore";

export interface ApplicationContextValue {
  rootStore: RootStore;
  simulationStore: SimulatorStore;
}