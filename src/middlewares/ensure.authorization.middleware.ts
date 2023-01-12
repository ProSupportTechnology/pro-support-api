import { Request, Response, NextFunction } from "express";
import { iJWTDecoded } from "../interfaces/jwt.interfaces";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors";

const ensureAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: iJWTDecoded) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    req.user = {
      id: decoded.sub,
      isAdm: decoded.isAdm,
    };

    return next();
  });
};

export default ensureAuthMiddleware;
