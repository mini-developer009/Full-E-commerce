import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import config from '../config';
import { prisma } from '../prisma/client';

import httpStatus from 'http-status';
import { TuserRole } from '../modules/User/user.interface';


const auth = (...requiredRoles: TuserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // console.log(token,"checking ------>");

    //check if token sent from the client
    if (!token) {
      throw new AppError(
        500,
        'forbidden',
        'You are not authorized to access this route',
      );
    }


    // Verify the token asynchronously
    const decoded =jwt.verify(
      token,
      config.access_token_secret as string,
    ) as JwtPayload;

    // console.log(decoded,"checking decode =======>");



    //check if the user has the required role to access the route

    const { role, email } = decoded;
    // checking if the user is exist
    const normaluser= await prisma.user.findUnique({
      where: { email },
    });
    const staf=await prisma.staf.findFirst
    ({
      where:{
        email
      }
    }) ;
    let user = normaluser ?  normaluser :  staf;

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized  hi!',
      );
    }

    (req.user as any) = user;
    next();
  });
};

export default auth;