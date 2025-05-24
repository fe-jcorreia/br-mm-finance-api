import { BaseError, ErrorFields } from "./base.error";
import { GlobalErrors } from "./global.error";

export class ForbiddenError<T = unknown> extends BaseError<T> {
  constructor(fields: ErrorFields = GlobalErrors.Forbidden) {
    super({ ...fields, status: 403 });
  }
}
