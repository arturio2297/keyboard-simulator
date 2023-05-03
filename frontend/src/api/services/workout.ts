import {AddWorkoutSessionResultRequest, WorkoutSessionResultDTO} from "../../contracts/api/workout.constracts";
import {AxiosResponse} from "axios";
import apiClient from "../client";

export class WorkoutApiService {

  public async add(request: AddWorkoutSessionResultRequest): Promise<AxiosResponse<WorkoutSessionResultDTO>> {
    return await apiClient.post('/api/v1/workout', request);
  }

}

const workoutApiService = new WorkoutApiService();

export default workoutApiService;