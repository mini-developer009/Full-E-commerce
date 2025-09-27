import jwt, { JwtPayload } from 'jsonwebtoken';
import { TRole } from '../User/user.interface';

export const createToken = (
    jwtPayload: { email: string,role:TRole,userId:string},
    secret: string,
    expiresIn: any,
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn,
    });
};

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
};