import {makeAutoObservable} from "mobx";
import {LoadingState} from "../contracts/common.contracts";
import {Account} from "./domain/Account";

type LoadingKeys = 'login' | 'fetchAccount'

export class AccountStore {

  private _loading: LoadingState<LoadingKeys> = {};
  private _account: Account | null = null;


  constructor() {
    makeAutoObservable(this);
  }

  public get account() {
    return this._account;
  }

}