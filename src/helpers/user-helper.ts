import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

export class UserHelper {
  static verifyToken(request: Request, response: Response, next: NextFunction) {
    try {
      UserHelper.getUser(request);
      next();
    } catch (error) {
      response.status(401).send("Unauthorized user");
    }
  }

  static getUser(request: Request): string {
    const authorizationHeader = request.headers.authorization || "";

    const token = authorizationHeader.split(" ")[1];

    const jwtRes = Jwt.verify(token, process.env.TOKEN_SECRET || "");

    return jwtRes instanceof String ? jwtRes : (<Jwt.JwtPayload>jwtRes).user;
  }
}
