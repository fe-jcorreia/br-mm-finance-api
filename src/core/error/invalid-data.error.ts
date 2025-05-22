import { BaseError, ErrorFields } from "./base.error";

export class InvalidDataError<T = unknown> extends BaseError<T> {
  constructor(
    fields: ErrorFields = {
      code: "GLB_04",
      message: "global.error.invalid-data",
    }
  ) {
    super({ ...fields, status: 400 });
  }
}
