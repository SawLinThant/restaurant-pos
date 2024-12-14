export interface BaseResponseSchema<T> {
  data: T;
  message: string;
  status: string;
}
