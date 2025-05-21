import { BaseError, ErrorFields } from "./base.error";


export class UnauthorizedError<T = unknown> extends BaseError<T> {
  constructor(fields: ErrorFields = { code: 'GLB_02', message: 'global.error.unauthorized' }) {
    super({ ...fields, status: 401 });
  }
}
