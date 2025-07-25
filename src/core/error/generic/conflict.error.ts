import { BaseError, ErrorFields } from "./base.error";
import { GlobalErrors } from "./global.error";

export class ConflictError<T = unknown> extends BaseError<T> {
	constructor(fields: ErrorFields = GlobalErrors.Generic) {
		super({ ...fields, status: 409 });
	}
}
