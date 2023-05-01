import {makeAutoObservable, runInAction} from "mobx";
import {LoadingState} from "../contracts/common.contracts";
import {Account} from "./domain/Account";
import {LoginRequest} from "../contracts/api/auth.constracts";
import api from "../api";
import {isSuccessResponse} from "../utils/axios.utils";
import authStorage from "../storage/AuthStorage";

type LoadingKeys = 'login' | 'fetchAccount'

export class AccountStore {

  private _loading: LoadingState<LoadingKeys> = {};
  private _account: Account | null = null;


  constructor() {
    makeAutoObservable(this);
  }

  public login(request: LoginRequest) {
    this._loading.login = true;
    api.auth.login(request)
      .then(response => {
        if (isSuccessResponse(response)) {
          authStorage.set(response.data);
          this.fetchAccount();
        }
      })
      .finally(() => {
        runInAction(() => this._loading.login = false);
      });
  }

  public fetchAccount() {
    this._loading.fetchAccount = true;
    api.account.get()
      .then(response => {
        if (isSuccessResponse(response)) {
          runInAction(() => {
            this._account = new Account(response.data);
          });
        }
      })
      .finally(() => {
        runInAction(() => this._loading.fetchAccount = false);
      });
  }

  public logout() {
    authStorage.clear();
    this._account = null;
  }

  public get account() {
    return this._account;
  }

  public get loading() {
    return this._loading;
  }

}