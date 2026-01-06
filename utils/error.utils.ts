export class HttpError extends Error {
  statusCode: number;
  customCode: number;
  message: string;

  constructor(statusCode: number, customCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.customCode = customCode;
    this.message = message;
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(404, 1, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(401, 1, message);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(400, 1, message);
  }
}
