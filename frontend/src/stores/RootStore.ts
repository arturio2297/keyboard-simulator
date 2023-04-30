import {makeAutoObservable} from "mobx";
import {SimulatorStore} from "./SimulatorStore";
import {RegistrationStore} from "./RegistrationStore";

export class RootStore {

  simulatorStore = new SimulatorStore();
  registrationStore = new RegistrationStore();

  constructor() {
    makeAutoObservable(this);
  }
}