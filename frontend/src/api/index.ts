import textApiService from "./services/text";
import registrationApiService from "./services/registration";
import authApiService from "./services/auth";
import accountApiService from "./services/account";
import passwordRecoveryApiService from "./services/recovery";

const api = {
  text: textApiService,
  registration: registrationApiService,
  auth: authApiService,
  account: accountApiService,
  recovery: passwordRecoveryApiService
}

export default api;