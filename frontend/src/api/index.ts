import textApiService from "./services/text";
import registrationApiService from "./services/registration";
import authApiService from "./services/auth";
import accountApiService from "./services/account";
import passwordRecoveryApiService from "./services/recovery";
import workoutApiService from "./services/workout";

const api = {
  text: textApiService,
  registration: registrationApiService,
  auth: authApiService,
  account: accountApiService,
  recovery: passwordRecoveryApiService,
  workout: workoutApiService
}

export default api;