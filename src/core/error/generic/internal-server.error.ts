import { BaseError, ErrorFields } from "./base.error";
import { GlobalErrors } from "./global.error";

export class InternalServerError<T> extends BaseError<T> {
  constructor(fields: ErrorFields = GlobalErrors.Generic) {
    super({ ...fields, status: 500 });
  }
}
