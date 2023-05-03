export interface ApiError {
  code: number;
  message: ErrorMessage;
}

export interface UnhandledServerError {
  error: ErrorMessage;
  path: string;
  status: number;
  timestamp: DateString;
}

export type ServerError = ApiError | UnhandledServerError;