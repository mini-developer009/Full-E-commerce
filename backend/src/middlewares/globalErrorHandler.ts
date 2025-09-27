import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import config from '../config';

import AppError from '../errors/AppError';
import { TErrorSource } from '../interface/error';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = 500;
  let message = 'Something went wrong';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something Went Wrong',
    },
  ];

  // Handle Zod Errors
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;

    // Handle Mongoose Validation Errors
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;

    // Handle Mongoose Cast Errors
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;

    // Handle MongoDB Duplicate Errors (11000)
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;

    // Handle Prisma Duplicate Errors (P2002)
  } else if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;

    // Handle Prisma Validation or other errors
  } else if (err instanceof PrismaClientKnownRequestError) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];

    // Handle Custom AppErrors
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];

    // Handle Generic JavaScript Errors
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  // Respond with error details
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
