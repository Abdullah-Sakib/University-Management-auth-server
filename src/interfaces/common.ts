export type GenericErrorResponse = {
  statusCode: number
  message: string
  errorMessage: {
    path: string | number
    message: string
  }[]
}
