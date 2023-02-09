import { Request, Response, NextFunction } from "express";

const errorHandlerMiddleware = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  res.status(500).json({ msg: "There was an error" });
};

export default errorHandlerMiddleware;
