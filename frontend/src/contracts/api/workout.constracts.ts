export interface AddWorkoutSessionResultRequest {
  speed: number;
  time: number;
  accuracy: number;
  letters: number;
  words: number;
  paragraphs: number;
}

export interface WorkoutSessionResultDTO {
  id: UniqueId;
  userId: UniqueId;
  userFullname: string;
  speed: number;
  time: string;
  date: DateString;
  letters: number;
  words: number;
  paragraphs: number;
}