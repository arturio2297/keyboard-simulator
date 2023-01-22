import {TextRequestParams} from "../contracts/api.contracts";
import {getParams} from "../utils/http.utils";

export class TextApi {

  private readonly _url = 'https://baconipsum.com/api/';
  private readonly _defaultHeaders = {};

  public async get(params: TextRequestParams): Promise<string[]> {
    const url = this._url + getParams(params);
    return new Promise(( async (resolve, reject) => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: this._defaultHeaders
        });
        const data = await response.json();
        resolve(data);
      } catch (err) {
        console.error('Fetch text error', err);
        reject(null);
      }
    }));
  }

}

const textApi = new TextApi();

export default textApi;