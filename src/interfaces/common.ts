import { GenericErrorMessage } from './error';

export type GenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: GenericErrorMessage[];
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
