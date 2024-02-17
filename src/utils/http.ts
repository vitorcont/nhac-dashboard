import { HttpStatusCode } from "axios";

export class HttpError extends Error {
  constructor(
    public status: HttpStatusCode,
    public error: string
  ) {
    super(error);
  }
}
