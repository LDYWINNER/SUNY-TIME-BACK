import { Request, Response, NextFunction } from "express";

const errorHandlerMiddleware = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  res.status(500).json({ msg: err });
};

export default errorHandlerMiddleware;
