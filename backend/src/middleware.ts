import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";

interface authReq extends Request {
  userId?: string;
}

export const auth = async (req: authReq, res: Response, next: NextFunction) => {
  const token = req.headers["token"] as string;

  const decode = jwt.verify(token, JWT_SECRET) as JwtPayload;
  if (decode) {
    req.userId = decode.userId;
    next();
  } else {
    res.json({
      msg: "you are not authorized",
    });
  }
};
