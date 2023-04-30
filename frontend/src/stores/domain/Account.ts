import {makeAutoObservable} from "mobx";
import {LoadingState} from "../../contracts/common.contracts";
import {AccountDTO, UserRole} from "../../contracts/api/account.contracts";

type LoadingKeys = '';

export class Account {

  public email: Email = '';
  public firstname: string = '';
  public lastname: string = '';
  public registrationDate: DateString = '';
  public role: UserRole = UserRole.User;

  private _loading: LoadingState<LoadingKeys> = {};

  constructor(response: AccountDTO) {
    makeAutoObservable(this);

    this.email = response.email;
    this.firstname = response.firstname;
    this.lastname = response.lastname;
    this.registrationDate = response.registrationDate;
    this.role = response.role;
  }

  public get loading() {
    return this._loading;
  }
}