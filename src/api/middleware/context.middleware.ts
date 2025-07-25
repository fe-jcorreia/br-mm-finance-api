import { NextFunction, Request, Response } from "express";

import { ContextProvider, ServerContext } from "@/core/context";
import { JwtService } from "@/core/security";
import { JwtPayload } from "@/model";

export function ContextMiddleware(req: Request, _res: Response, next: NextFunction) {
	const authToken = req.headers.authorization;
	let userId: string | undefined;

	if (authToken) {
		const decodedToken = JwtService.verify<JwtPayload>(authToken);
		userId = decodedToken?.data?.id;
	}

	const context: ServerContext = { uuid: crypto.randomUUID(), userId };
	ContextProvider.getInstance<ServerContext>().enterWith(context);

	next();
}
