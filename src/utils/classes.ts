export class CustomError extends Error {
  errorCode: number;

  constructor(errorCode: number, message: string) {
    super(message);
    this.errorCode = errorCode;
    this.name = "CustomError";
  }
}
