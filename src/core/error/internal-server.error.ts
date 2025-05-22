import { BaseError, ErrorFields } from "./base.error";

export class InternalServerError<T> extends BaseError<T> {
  constructor(
    fields: ErrorFields = { code: "GLB_03", message: "global.error.generic" }
  ) {
    super({ ...fields, status: 500 });
  }
}
