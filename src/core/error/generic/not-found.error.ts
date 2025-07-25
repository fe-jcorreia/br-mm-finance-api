import { BaseError, ErrorFields } from "./base.error";
import { GlobalErrors } from "./global.error";

export class NotFoundError<T = unknown> extends BaseError<T> {
	constructor(fields: ErrorFields = GlobalErrors.NotFound) {
		super({ ...fields, status: 404 });
	}
}
