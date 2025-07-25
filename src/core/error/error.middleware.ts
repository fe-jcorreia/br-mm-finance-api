import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { isBaseError } from "./generic/base.error";
import { GlobalErrors } from "./generic/global.error";

export interface ErrorBody {
	code: string;
	message: string;
	details?: any;
}

export function parseGlobalError(err: any, _req: Request, res: Response, _next: NextFunction) {
	const errors: ErrorBody[] = [];
	let status = 500;

	if (isBaseError(err)) {
		status = err.status;
		errors.push({
			code: err.code,
			message: err.message,
			details: err.details,
		});
	} else if (err instanceof ZodError) {
		status = 400;

		errors.push(
			...err.errors.map(validation => ({
				code: "VAL_01",
				message: validation.message,
				details: `Field ${validation.path?.[0]} - ${validation.message}`,
			})),
		);
	} else {
		errors.push({
			code: GlobalErrors.Generic.code,
			message: GlobalErrors.Generic.message,
			details: err.message,
		});
	}

	res.status(status).send({ errors });
}
