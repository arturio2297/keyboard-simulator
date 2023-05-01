import {AxiosResponse} from "axios";
import {
  AccountDTO,
  UpdatePasswordRequest, ConfirmChangeEmailCodeRequest,
  SendChangeEmailCodeRequest,
  UpdateAccountRequest
} from "../../contracts/api/account.contracts";
import apiClient from "../client";

export class AccountApiService {

  public async get(): Promise<AxiosResponse<AccountDTO>> {
    return await apiClient.get('/api/v1/account');
  }

  public async update(request: UpdateAccountRequest): Promise<AxiosResponse<AccountDTO>> {
    return await apiClient.post('/api/v1/account', request);
  }

  public async updateAvatar(avatar: File): Promise<AxiosResponse<void>> {
    const formData = new FormData();
    formData.set('avatar', avatar);
    return await apiClient.post('/api/v1/account/avatar', formData);
  }

  public async checkPassword(password: Password): Promise<AxiosResponse<boolean>> {
    return await apiClient.get('/api/v1/account/password', {
      params: {password}
    });
  }

  public async updatePassword(request: UpdatePasswordRequest): Promise<AxiosResponse<void>> {
    return await apiClient.post('/api/v1/account/password', request);
  }

  public async sendChangeEmailCode(request: SendChangeEmailCodeRequest): Promise<AxiosResponse<void>> {
    return await apiClient.post('/api/v1/account/email/send-code', request);
  }

  public async confirmChangeEmail(request: ConfirmChangeEmailCodeRequest): Promise<AxiosResponse<void>> {
    return await apiClient.post('/api/v1/account/email', request);
  }

}

const accountApiService = new AccountApiService();

export default accountApiService;