import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["auth"];
  let jwtPayLoad: any;
  try {
    jwtPayLoad = <any>jwt.verify(token, config.jwtSecret);
    // res.locals.jwtPayLoad = jwtPayLoad;
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const { userId } = jwtPayLoad;

  req.body.userId = userId;
  next();
};
