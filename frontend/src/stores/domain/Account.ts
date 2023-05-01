import {makeAutoObservable, runInAction} from "mobx";
import {LoadingState} from "../../contracts/common.contracts";
import {AccountDTO, UpdateAccountRequest, UserRole} from "../../contracts/api/account.contracts";
import api from "../../api";
import {noOp} from "../../utils/object.utils";
import {isSuccessResponse} from "../../utils/axios.utils";

type LoadingKeys = 'updateAvatar' | 'update';

export class Account {

  public id: UniqueId = 0;
  public email: Email = '';
  public firstname: string = '';
  public lastname: string = '';
  public registrationDate: DateString = '';
  public role: UserRole = UserRole.User;

  private _loading: LoadingState<LoadingKeys> = {};

  constructor(response: AccountDTO) {
    makeAutoObservable(this);

    this.id = response.id;
    this.email = response.email;
    this.firstname = response.firstname;
    this.lastname = response.lastname;
    this.registrationDate = response.registrationDate;
    this.role = response.role;
  }

  public updateAvatar(avatar: File) {
    this._loading.updateAvatar = true;
    api.account.updateAvatar(avatar)
      .then(noOp)
      .finally(() => {
        runInAction(() => this._loading.updateAvatar = false)
      });
  }

  public update(request: UpdateAccountRequest) {
    this._loading.update = true;
    api.account.update(request)
      .then(response => {
        if (isSuccessResponse(response)) {
          runInAction(() => {
            this.firstname = response.data.firstname;
            this.lastname = response.data.lastname;
          });
        }
      })
      .finally(() => {
        runInAction(() => this._loading.update = false);
      });
  }

  public get loading() {
    return this._loading;
  }
}