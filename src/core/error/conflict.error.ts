import { BaseError, ErrorFields } from "./base.error";


export class ConflictError<T = unknown> extends BaseError<T> {
  constructor(fields: ErrorFields = { code: 'GLB_01', message: 'global.error.generic' }) {
    super({ ...fields, status: 409 });
  }
}
