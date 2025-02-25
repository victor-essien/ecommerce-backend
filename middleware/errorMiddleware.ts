import { Request, Response, NextFunction } from "express";

interface DefaultError {
  statusCode: number;
  success: string;
  message: string;
}

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const defaultError: DefaultError = {
    statusCode: 404,
    success: "failed",
    message: err.message || "An error occured",
  };

  if (err?.name === "ValidationError") {
    defaultError.statusCode = 400;
    defaultError.message = Object.values(err.errors)
      .map((el: any) => el.message)
      .join(",");
  }

  if (err.code && err.code === 11000) {
    defaultError.statusCode = 409;
    defaultError.message = `${Object.values(
      err.keyValue
    )} field has to be unique!`;
  }

  res.status(defaultError.statusCode).json({
    success: defaultError.success,
    message: defaultError.message,
  });
};

export default errorMiddleware;
