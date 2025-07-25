import { BaseError, ErrorFields } from "./base.error";
import { GlobalErrors } from "./global.error";

export class InvalidDataError<T = unknown> extends BaseError<T> {
	constructor(fields: ErrorFields = GlobalErrors.InvalidData) {
		super({ ...fields, status: 400 });
	}
}
