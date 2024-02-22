import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from '../errors/main';

export const handleJWTError = () => {
    throw new CustomAPIError('Invalid Token, Please Login Again', StatusCodes.UNAUTHORIZED);
  };
  
export const handleTokenExpiredError = () => {
    throw new CustomAPIError('Your Token has expired, Please Login Again', StatusCodes.UNAUTHORIZED);
  };

export const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  let customError: { statusCode: number; msg: string } = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  };

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(',');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  };

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${
      Object.keys(err.keyValue)[0]
    } field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  };

  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  };

  if (err.name === 'JsonWebTokenError') {
    try {
      handleJWTError();
    } catch (jwtErr:any) {
      customError.statusCode = jwtErr.statusCode;
      customError.msg = jwtErr.message;
    }
  };

  if (err.name === 'TokenExpiredError') {
    try {
      handleTokenExpiredError();
    } catch (tokenExpiredErr:any) {
      customError.statusCode = tokenExpiredErr.statusCode;
      customError.msg = tokenExpiredErr.message;
    }
  };

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

//export default errorHandlerMiddleware;
