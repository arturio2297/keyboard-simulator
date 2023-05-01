import {AxiosResponse} from "axios";
import {AccountDTO, UpdateAccountRequest} from "../../contracts/api/account.contracts";
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

}

const accountApiService = new AccountApiService();

export default accountApiService;