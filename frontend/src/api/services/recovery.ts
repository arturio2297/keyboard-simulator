import {ConfirmRecoveryPasswordRequest, SendRecoveryPasswordCodeRequest} from "../../contracts/api/recovery.contracts";
import {AxiosResponse} from "axios";
import apiClient from "../client";

export class PasswordRecoveryApiService {

  public async sendCode(request: SendRecoveryPasswordCodeRequest): Promise<AxiosResponse<void>> {
    return await apiClient.post('/api/v1/password-recovery/send-code', request);
  }

  public async checkCode(codeValue: Code, email: Email): Promise<AxiosResponse<boolean>> {
    return await apiClient.get('/api/v1/password-recovery/check-code', {
      params: {codeValue, email}
    });
  }

  public async confirm(request: ConfirmRecoveryPasswordRequest): Promise<AxiosResponse<void>> {
    return await apiClient.post('/api/v1/password-recovery', request);
  }

}

const passwordRecoveryApiService = new PasswordRecoveryApiService();

export default passwordRecoveryApiService;