import {makeAutoObservable} from "mobx";
import {ApiError} from "../contracts/api/error.contracts";

export class UiStore {

  private _error: ApiError | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public setError(error: ApiError | null) {
    this._error = error;
  }

  public get error() {
    return this._error;
  }

}