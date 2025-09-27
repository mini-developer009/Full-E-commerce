import { Prisma } from '@prisma/client';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

// Handle Prisma validation errors (e.g., unique constraint violations, invalid data)
const handleValidationError = (
  err:
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientValidationError,
): TGenericErrorResponse => {
  let errorSources: TErrorSource = [];

  // Handle PrismaClientKnownRequestError (e.g., unique constraint violations)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      // P2002 is the Prisma error code for unique constraint violations
      const target = (err.meta?.target as string[]) || [];
      errorSources = target.map((field) => ({
        path: field,
        message: `Duplicate value for ${field}`,
      }));
    } else {
      // Handle other known request errors
      errorSources = [
        {
          path: '',
          message: err.message || 'Invalid database operation',
        },
      ];
    }
  }

  // Handle PrismaClientValidationError (e.g., invalid data types or missing fields)
  if (err instanceof Prisma.PrismaClientValidationError) {
    errorSources = [
      {
        path: '',
        message: err.message.split('\n').pop() || 'Validation error in query', // Extract the last line for clarity
      },
    ];
  }

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
