import textApiService from "./services/text";
import registrationApiService from "./services/registration";
import authApiService from "./services/auth";
import accountApiService from "./services/account";

const api = {
  text: textApiService,
  registration: registrationApiService,
  auth: authApiService,
  account: accountApiService
}

export default api;