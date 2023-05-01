import {AxiosResponse} from "axios";
import {AccountDTO} from "../../contracts/api/account.contracts";
import apiClient from "../client";

export class AccountApiService {

  public async get(): Promise<AxiosResponse<AccountDTO>> {
    return await apiClient.get('/api/v1/account');
  }

}

const accountApiService = new AccountApiService();

export default accountApiService;