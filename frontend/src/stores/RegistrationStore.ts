import {makeAutoObservable, runInAction} from "mobx";
import {Action, LoadingState} from "../contracts/common.contracts";
import {ConfirmRegistrationRequest, SendRegistrationCodeRequest} from "../contracts/api/registration.contracts";
import api from "../api";
import {isSuccessResponse} from "../utils/axios.utils";

type LoadingKeys = 'sendCode' | 'checkCode' | 'confirm';

export class RegistrationStore {

  private _loading: LoadingState<LoadingKeys> = {};

  constructor() {
    makeAutoObservable(this);
  }

  public sendCode(request: SendRegistrationCodeRequest, onSuccess: Action) {
    this._loading.sendCode = true;
    api.registration.sendCode(request)
      .then(response => {
        isSuccessResponse(response) && onSuccess();
      })
      .finally(() => {
        runInAction(() => this._loading.sendCode = false);
      });
  }

  public checkCode(codeValue: Code, email: Email, onSuccess: Action, onFail: Action) {
    this._loading.checkCode = true;
    api.registration.checkCode(codeValue, email)
      .then(response => {
        response.data ? onSuccess() : onFail();
      })
      .finally(() => {
        runInAction(() => this._loading.checkCode = false);
      });
  }

  public confirm(request: ConfirmRegistrationRequest, onSuccess: Action) {
    this._loading.confirm = true;
    api.registration.confirm(request)
      .then(() => {
        onSuccess();
      })
      .finally(() => {
        runInAction(() => this._loading.confirm = false)
      });
  }

  public get loading() {
    return this._loading;
  }

}