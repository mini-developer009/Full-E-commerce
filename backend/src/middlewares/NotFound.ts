import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
const NotFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API NOT FOUND',
    error: '',
  });
};
export default NotFound;
