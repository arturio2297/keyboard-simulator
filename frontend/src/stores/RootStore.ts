import {makeAutoObservable} from "mobx";
import {SimulatorStore} from "./SimulatorStore";
import {RegistrationStore} from "./RegistrationStore";
import {AccountStore} from "./AccountStore";
import {UiStore} from "./UiStore";
import {configure as configureApiClient} from "../api/client";
import authStorage from "../storage/AuthStorage";
import {PasswordRecoveryStore} from "./PasswordRecoveryStore";

export class RootStore {

  simulatorStore = new SimulatorStore();
  registrationStore = new RegistrationStore();
  accountStore = new AccountStore();
  uiStore = new UiStore();
  passwordRecoveryStore = new PasswordRecoveryStore();

  constructor() {
    makeAutoObservable(this);

    configureApiClient({
      onError: (error) => this.uiStore.setError(error),
      onLogout: () => this.accountStore.logout()
    });

    if (authStorage.get()) {
      this.accountStore.fetchAccount();
    }
  }
}