import {RootStore} from "../stores/RootStore";
import {WorkoutStore} from "../stores/WorkoutStore";
import {RegistrationStore} from "../stores/RegistrationStore";
import {AccountStore} from "../stores/AccountStore";
import {UiStore} from "../stores/UiStore";
import {PasswordRecoveryStore} from "../stores/PasswordRecoveryStore";

export interface ApplicationContextValue {
  rootStore: RootStore;
  workoutStore: WorkoutStore;
  registrationStore: RegistrationStore;
  accountStore: AccountStore;
  uiStore: UiStore;
  passwordRecoveryStore: PasswordRecoveryStore;
}