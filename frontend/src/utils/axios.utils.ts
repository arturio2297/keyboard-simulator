import {AxiosResponse} from "axios";

export const isSuccessResponse = (response: AxiosResponse<any>): boolean => {
  return response && response.status === 200;
}