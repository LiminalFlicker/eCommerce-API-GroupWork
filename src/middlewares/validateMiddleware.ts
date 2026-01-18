// import { userInputSchema, postInputSchema } from '#schemas';
import type { Request, Response, NextFunction } from 'express';
import { z, ZodObject } from 'zod/v4';

export function validateBodyZod(zodSchema: ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { data, error, success } = zodSchema.safeParse(req.body);
    // ({
    //   body: req.body,
    //   params: req.params,
    //   query: req.query,
    // });

    if (!success) {
      next(new Error(z.prettifyError(error), { cause: 400 }));
    } else {
      req.body = data;
      //   if (data.body) req.body = data.body;
      // if (data.params) req.params = data.params as any;
      // if (data.query) req.query = data.query as any;
      next();
    }
  };
}

// souher, nur für URL Parameter
export function validateParamsZod(zodSchema: ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { data, error, success } = zodSchema.safeParse(req.params);
    if (!success) {
      next(new Error(z.prettifyError(error), { cause: 400 }));
    } else {
      req.params = data as any;
      next();
    }
  };
}
