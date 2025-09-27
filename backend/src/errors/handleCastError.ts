// src/errors/handlePrismaError.ts
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: PrismaClientKnownRequestError,
): TGenericErrorResponse => {
  let errorSources: TErrorSource = [];
  let message = 'Database error';
  const statusCode = 400;

  // Handle invalid ObjectID (like Mongoose CastError)
  if (err.code === 'P2023') {
    // Prisma error code for malformed ID
    message = 'Invalid ID format';
    errorSources = [
      {
        path: '', // Prisma doesn't provide path directly, adjust if needed
        message: 'The provided ID is not valid',
      },
    ];
  }

  // Handle other known Prisma errors (optional)
  else if (err.code === 'P2025') {
    // Record not found
    message = 'Record not found';
    errorSources = [
      {
        path: '',
        message:
          typeof err.meta?.cause === 'string'
            ? err.meta.cause
            : 'No record found for the given ID',
      },
    ];
  }

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleCastError;
