import config from '../../config';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';
import AppError from '../../errors/AppError';
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from '../../helpers/emailSender/emails';
import { alreadyExist, isExistByEmail, NotFound } from '../../utils/utility';
import { uploadToDigitalOceanAWS } from '../../utils/sendImageToCloudinary';
import { prisma } from '../../prisma/client';
import { User } from '@prisma/client';

const register = async (file: any, payload: User) => {
  const { name, email, password, address, phone } = payload;

  //check user is already exist or not
  const existingUser = await isExistByEmail(payload.email);
  await alreadyExist(existingUser, 'Already Exist This Email');

  let imageUrls: string = '';
  if (file) {
    //  imageUrls = `${process.env.BACKEND_LIVE_URL}/uploads/${file.filename}`;
    const { location } = await uploadToDigitalOceanAWS(file);
    imageUrls = location as string;
  }
  // Hash the password
  const hashedpassword = await bcrypt.hash(password, 10);

  //verification token
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();
  const verificationTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

  sendVerificationEmail(payload.email, verificationToken);
  // Explicitly set the role to a valid value (e.g., "USER")
  const result = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      address,
      password: hashedpassword,
      role: 'USER',
      verificationToken,
      verificationTokenExpiry,
      profileImage: imageUrls ? imageUrls : 'https://ibb.co/q36v3f9w',
    },
  });

  return result;
};

const verifyEmail = async (email: string, token: string) => {
  const user = await isExistByEmail(email);
  await NotFound(user);

  if (user?.verificationToken !== token || !user.verificationTokenExpiry) {
    throw new Error('Invalid verification token');
  }

  if (user?.verificationTokenExpiry < new Date()) {
    throw new Error('Verification token has expired');
  }

  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      isVerified: true,
      verificationToken: null,
      verificationTokenExpiry: null,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      profileImage: true,
    },
  });

  const JwtPayload = {
    email: user.email,
    userId: user?.id,
    role: user.role,
  };

  //create toke and send to the client
  const accessToken = createToken(
    JwtPayload,
    config.access_token_secret as string,
    config.access_token_expires as string,
  );

  const refreshToken = createToken(
    JwtPayload,
    config.refress_token_secret as string,
    config.refresh_token_expires as string,
  );

  return {
    message: 'User verified successfully',
    updatedUser,
    accessToken,
    refreshToken,
  };
};

const login = async (payload: ILoginUser) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      email: true,
      id: true,
      name: true,
      password: true,
      role: true,
      profileImage: true,
      isVerified: true,
    },
  });

  if (!user?.isVerified) {
    throw new AppError(403, 'Please Verify Your Email');
  }
  const updatedUserLastLogin = await prisma.user.update({
    where: {
      email: payload.email,
    },
    data: {
      lastLogin: new Date(),
    },
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordMatched: boolean = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Invalid credentials');
  }
  const JwtPayload = {
    userId: user?.id,
    email: user.email,
    role: user.role,
  };

  //create toke and send to the client
  const accessToken = createToken(
    JwtPayload,
    config.access_token_secret as string,
    config.access_token_expires as string,
  );

  //refresh token
  const refreshToken = createToken(
    JwtPayload,
    config.refress_token_secret as string,
    config.refresh_token_expires as string,
  );

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    imgUrl: user?.profileImage ? user?.profileImage : null,
  };
  return {
    user: userData,
    accessToken,
    refreshToken,
  };
};

const forgotPassword = async (email: string) => {
  await NotFound(email, 'Email is required');
  const user = await isExistByEmail(email);
  await NotFound(user, 'User');

  if (!user?.id || !user?.email || !user?.role) {
    throw new Error('User data is incomplete for token generation');
  }
  const JwtPayload = {
    userId: user?.id,
    email: user?.email,
    role: user?.role,
  };
  const token = createToken(
    JwtPayload,
    config.access_token_secret as string,
    config.access_token_expires as string,
  );
  const link = `${config.live_url}/reset-password?email=${email}&token=${token}`;
  // console.log('token : ', token);

  const res = await sendPasswordResetEmail(email, link);
  return true;
};

export const resetPassword = async (
  email: string,
  token: string,
  password: string,
) => {
  const user = await isExistByEmail(email);
  await NotFound(user);

  const verification = verifyToken(token, config.access_token_secret as string);
  await NotFound(verification);

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return true;
};

const changePassword = async (
  email: string,
  oldPassword: string,
  newPassword: string,
) => {
  const user = await isExistByEmail(email);
  await NotFound(user, 'User not found with this email');
  if (!user?.password) {
    throw new Error('User password is missing');
  }
  const isPasswordMatched: boolean = await bcrypt.compare(
    oldPassword,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Invalid credentials password not matched!');
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.salt_round),
  );

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return true;
};

const refreshToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error('Refresh token is required');
  }
  const decoded = verifyToken(
    refreshToken,
    config.refress_token_secret as string,
  );

  if (!decoded) {
    throw new Error('Invalid or expired refresh token!');
  }
  // console.log('decoded id',decoded)
  const user = await prisma.user.findUnique({
    where: {
      id: decoded?.userId,
    },
  });

  if (!user) {
    throw new Error('User not found with this refresh token');
  }

  const JwtPayload = {
    userId: user?.id,
    email: user?.email,
    role: user?.role,
  };
  const accessToken = createToken(
    JwtPayload,
    config.access_token_secret as string,
    config.access_token_expires,
  );

  return { accessToken };
};

//resend verification Email
const resendVerifyEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new AppError(400, 'User not found with this email');
  }

  if (user.isVerified) {
    throw new AppError(400, 'User is already verified');
  }

  const verificationToken = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();
  const verificationTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

  await prisma.user.update({
    where: { email },
    data: {
      verificationToken,
      verificationTokenExpiry,
    },
  });

  sendVerificationEmail(user.email, verificationToken);

  return true;
};

interface IMakeAdmin {
  name: string;
  password: string;
  email: string;
  phone: string;
}

const makeAdmin = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  await NotFound(user, 'User');

  const result = await prisma.user.update({
    where: {
      email,
    },
    data: {
      role: 'ADMIN',
    },
  });

  return result;
};

export const AuthServices = {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  refreshToken,
  makeAdmin,
  verifyEmail,
  resendVerifyEmail,
};
