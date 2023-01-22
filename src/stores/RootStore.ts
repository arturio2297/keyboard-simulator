import {makeAutoObservable} from "mobx";
import {SimulatorStore} from "./SimulatorStore";

export class RootStore {

  simulatorStore = new SimulatorStore();

  constructor() {
    makeAutoObservable(this);
  }
}