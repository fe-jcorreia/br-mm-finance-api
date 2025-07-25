import { BaseError, ErrorFields } from "./base.error";
import { GlobalErrors } from "./global.error";

export class UnauthorizedError<T = unknown> extends BaseError<T> {
	constructor(fields: ErrorFields = GlobalErrors.Unauthorized) {
		super({ ...fields, status: 401 });
	}
}
