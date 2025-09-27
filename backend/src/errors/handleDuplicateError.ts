import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handlePrismaDuplicateError = (
  err: PrismaClientKnownRequestError
): TGenericErrorResponse => {
  const errorSources: TErrorSource = [];
  let message = 'Duplicate entry';
  const statusCode = 409;

  if (err.code === 'P2002') {
    const target = err.meta?.target;

    const field = Array.isArray(target) && target.length > 0 ? target[0] : 'unknown';

    message = `Duplicate field: ${field}`;

    errorSources.push({
      path: field,
      message: `A shop with this ${field} already exists`,
    });
  }

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handlePrismaDuplicateError;
