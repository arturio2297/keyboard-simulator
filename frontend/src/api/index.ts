import textApiService from "./services/text";
import registrationApiService from "./services/registration";

const api = {
  text: textApiService,
  registration: registrationApiService
}

export default api;