import { Request, Response, NextFunction } from "express";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  console.log("authenticate user");
  next();
};

export default auth;
