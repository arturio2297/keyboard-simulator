import {ConfirmRegistrationRequest, SendRegistrationCodeRequest} from "../../contracts/api/registration.contracts";
import {AxiosResponse} from "axios";
import apiClient from "../client";

class RegistrationApiService {

  public async sendCode(request: SendRegistrationCodeRequest): Promise<AxiosResponse<void>> {
    return apiClient.post('/api/v1/register/send-code', request);
  }

  public async checkCode(codeValue: Code, email: Email): Promise<AxiosResponse<boolean>> {
    return apiClient.get('/api/v1/register/check-code', {
      params: {codeValue, email}
    });
  }

  public async confirm(request: ConfirmRegistrationRequest): Promise<AxiosResponse<void>> {
    return apiClient.post('/api/v1/register', request);
  }

}

const registrationApiService = new RegistrationApiService();

export default registrationApiService;