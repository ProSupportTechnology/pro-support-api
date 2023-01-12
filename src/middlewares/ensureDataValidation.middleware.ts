import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

const ensureDataValidationMiddleware =
  (schema: AnySchema) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const validated = await schema.validate(request.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      request.body = validated;
      return next();
    } catch (error) {
      return response.status(400).json({ error: error.errors });
    }
  };

export default ensureDataValidationMiddleware;
