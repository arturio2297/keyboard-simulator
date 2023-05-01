import {makeAutoObservable, runInAction} from "mobx";
import {Action, LoadingState} from "../../contracts/common.contracts";
import {
  AccountDTO, UpdatePasswordRequest,
  SendChangeEmailCodeRequest,
  UpdateAccountRequest,
  UserRole, ConfirmChangeEmailCodeRequest
} from "../../contracts/api/account.contracts";
import api from "../../api";
import {noOp} from "../../utils/object.utils";
import {isSuccessResponse} from "../../utils/axios.utils";

type LoadingKeys = 'updateAvatar' | 'update' | 'checkPassword' | 'updatePassword' | 'sendChangeEmailCode'
  | 'confirmChangeEmail';

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

  public checkPassword(password: Password, onSuccess: Action, onFail: Action) {
    this._loading.checkPassword = true;
    api.account.checkPassword(password)
      .then(response => {
        response.data ? onSuccess() : onFail();
      })
      .finally(() => {
        runInAction(() => this._loading.checkPassword = false);
      });
  }

  public updatePassword(request: UpdatePasswordRequest, onSuccess: Action) {
    this._loading.updatePassword = true;
    api.account.updatePassword(request)
      .then(response => {
        if (isSuccessResponse(response)) {
          onSuccess();
        }
      })
      .finally(() => {
        runInAction(() => this._loading.updatePassword = false)
      });
  }

  public sendChangeEmailCode(request: SendChangeEmailCodeRequest, onSuccess: Action) {
    this._loading.sendChangeEmailCode = true;
    api.account.sendChangeEmailCode(request)
      .then(response => {
        if (isSuccessResponse(response)) {
          onSuccess();
        }
      })
      .finally(() => {
        runInAction(() => this._loading.sendChangeEmailCode = false);
      });
  }

  public confirmChangeEmail(request: ConfirmChangeEmailCodeRequest, onSuccess: Action) {
    this._loading.confirmChangeEmail = true;
    api.account.confirmChangeEmail(request)
      .then(response => {
        if (isSuccessResponse(response)) {
          onSuccess();
        }
      })
      .finally(() => {
        runInAction(() => this._loading.confirmChangeEmail = false)
      });
  }

  public get loading() {
    return this._loading;
  }

}