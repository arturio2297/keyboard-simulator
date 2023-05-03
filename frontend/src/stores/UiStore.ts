import {makeAutoObservable} from "mobx";
import {ServerError} from "../contracts/api/error.contracts";

export class UiStore {

  private _error: ServerError | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public setError(error: ServerError | null) {
    this._error = error;
  }

  public get error() {
    return this._error;
  }

}