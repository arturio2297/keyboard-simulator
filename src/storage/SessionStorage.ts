import {SessionResult} from "../contracts/simulation.contracts";

export class SessionStorage {

  private readonly _key = 'sessionResults';

  public saveResult(result: SessionResult) {
    const results = this.getResults();
    results.push(result);
    localStorage.setItem(this._key, JSON.stringify(results));
  }

  public getResults(): SessionResult[] {
    const value = localStorage.getItem(this._key) || '[]';
    return JSON.parse(value);
  }

  public remove() {
    localStorage.setItem(this._key, '');
  }

}