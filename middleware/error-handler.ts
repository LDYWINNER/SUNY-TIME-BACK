import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

interface IMessage {
  msg: {
    errors: IError;
  };
  _message: string;
  name: string;
  message: string;
}

interface IError {
  [key: string]: {
    name: string;
    message: string;
    properties: {
      message: string;
      type: string;
      path: string;
    };
    kind: string;
    path: string;
  };
}

type IItem = [{ [key: string]: string }];

const errorHandlerMiddleware = (
  err: {
    statusCode: any;
    message: any;
    name: string;
    errors: IError;
    code: number;
    keyValue: {};
  },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };
  //missing field error
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    // defaultError.msg = err.message;
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }
  //unique field error
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(
      err.keyValue
    )} field has to be unique, your ${Object.keys(
      err.keyValue
    )} already exists`;
  }
  // res.status(defaultError.statusCode).json({ msg: err });
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
