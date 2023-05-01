import {LoginRequest, RefreshTokenRequest, TokenResponse} from "../../contracts/api/auth.constracts";
import apiClient from "../client";
import axios, {AxiosResponse} from "axios";

export class AuthApiService {

  public async login(request: LoginRequest): Promise<AxiosResponse<TokenResponse>> {
    return await apiClient.post('/api/v1/auth/login-user', request);
  }

  public async refresh(request: RefreshTokenRequest): Promise<AxiosResponse<TokenResponse>> {
    return await axios.post('/api/v1/auth/refresh', request);
  }

}

const authApiService = new AuthApiService();

export default authApiService;