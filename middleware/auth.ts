import { Request, Response, NextFunction } from "express";
import { UnAuthenticatedError } from "../errors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

interface CustomRequest extends Request {
  userId: string | JwtPayload;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as JwtPayload;
    //attach the user request object
    (req as CustomRequest).user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default auth;
