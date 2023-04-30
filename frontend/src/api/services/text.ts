import {AxiosResponse} from "axios";
import apiClient from "../client";

class TextApiService {

  public async get(paragraphs: number): Promise<AxiosResponse<{ content: string[] }>> {
    return apiClient.get('/api/v1/text', {
      params: {paragraphs}
    });
  }

}

const textApiService = new TextApiService();

export default textApiService;
