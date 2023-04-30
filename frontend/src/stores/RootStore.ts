import {makeAutoObservable} from "mobx";
import {SimulatorStore} from "./SimulatorStore";
import {RegistrationStore} from "./RegistrationStore";
import {AccountStore} from "./AccountStore";

export class RootStore {

  simulatorStore = new SimulatorStore();
  registrationStore = new RegistrationStore();
  accountStore = new AccountStore();

  constructor() {
    makeAutoObservable(this);
  }
}