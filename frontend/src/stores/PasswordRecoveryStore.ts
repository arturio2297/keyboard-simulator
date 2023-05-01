import {makeAutoObservable, runInAction} from "mobx";
import {Action, LoadingState} from "../contracts/common.contracts";
import {ConfirmRecoveryPasswordRequest, SendRecoveryPasswordCodeRequest} from "../contracts/api/recovery.contracts";
import api from "../api";
import {isSuccessResponse} from "../utils/axios.utils";

type LoadingKeys = 'sendCode' | 'checkCode' | 'confirm';

export class PasswordRecoveryStore {

  private _loading: LoadingState<LoadingKeys> = {};

  constructor() {
    makeAutoObservable(this);
  }

  public sendCode(request: SendRecoveryPasswordCodeRequest, onSuccess: Action) {
    this._loading.sendCode = true;
    api.recovery.sendCode(request)
      .then(response => {
        if (isSuccessResponse(response)) {
          onSuccess();
        }
      })
      .finally(() => {
        runInAction(() => this._loading.sendCode = false);
      });
  }

  public checkCode(codeValue: Code, email: Email, onSuccess: Action, onFail: Action) {
    this._loading.checkCode = true;
    api.recovery.checkCode(codeValue, email)
      .then(response => {
        response.data ? onSuccess() : onFail();
      })
      .finally(() => {
        runInAction(() => this._loading.checkCode = false);
      });
  }

  public confirm(request: ConfirmRecoveryPasswordRequest, onSuccess: Action) {
    this._loading.confirm = true;
    api.recovery.confirm(request)
      .then(response => {
        if (isSuccessResponse(response)) {
          onSuccess();
        }
      })
      .finally(() => {
        runInAction(() => this._loading.confirm = false);
      });
  }

  public get loading() {
    return this._loading;
  }

}