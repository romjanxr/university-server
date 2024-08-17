import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = err instanceof Error ? err.message : 'Something went wrong';
  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
  next();
};

export default globalErrorHandler;
