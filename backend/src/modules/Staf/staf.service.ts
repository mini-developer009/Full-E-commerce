import { Staf } from '@prisma/client';
import { prisma } from '../../prisma/client';
import bcrypt from 'bcrypt';
import {
  alreadyExist,
  isExistStafByEmail,
  NotFound,
} from '../../utils/utility';
import { uploadToDigitalOceanAWS } from '../../utils/sendImageToCloudinary';
import QueryBuilder from '../../builder/QueryBuilder';
import { createToken, verifyToken } from '../Auth/auth.utils';
import config from '../../config';
import AppError from '../../errors/AppError';
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from '../../helpers/emailSender/emails';
import { TRole } from '../User/user.interface';
import { ILoginUser } from '../Auth/auth.interface';
const createStaf = async (file: any, payload: Staf) => {
  const { name, email, password, address, phone, position, shopId } = payload;

  //check staf is already exist or not
  const existingstaf = await isExistStafByEmail(payload.email);
  await alreadyExist(existingstaf, 'Already Exist This Email');

  let imageUrls: string = '';
  if (file) {
    //  imageUrls = `${process.env.BACKEND_LIVE_URL}/uploads/${file.filename}`;
    const { location } = await uploadToDigitalOceanAWS(file);
    imageUrls = location as string;
  }
  // Hash the password
  const hashedpassword = await bcrypt.hash(password, 10);

  // Explicitly set the role to a valid value (e.g., "STAF")
  const result = await prisma.staf.create({
    data: {
      name,
      email,
      phone,
      position,
      address,
      password: hashedpassword,
      role: 'STAF',
      shopId,
      profileImage: imageUrls ? imageUrls : 'https://ibb.co/q36v3f9w',
    },
  });

  return result;
};

//all staf
const allStaf = async (query: any, userId: string) => {
  const shop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });

  await NotFound(shop);
  const builder = new QueryBuilder(query, prisma.staf);
  const result = await builder
    .rawFilter({
      shopId: shop?.id as string,
    })
    .paginate()
    .execute();
  const meta = await builder.countTotal();

  return {
    meta,
    result,
  };
};

//single staf
const singleStaf = async (id: string,userId:string) => {
   const shop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });

  await NotFound(shop);
  return await prisma.staf.findUnique({
    where: {
      id,
      shopId: shop?.id as string,
    },
  });
};

//delete a staf
const deleteStaf = async (id: string,userId:string) => {
   const shop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });

  await NotFound(shop);
  return await prisma.staf.delete({
    where: {
      id,
      shopId: shop?.id as string,
    },
  });
};

const verifyEmail = async (email: string, token: string) => {
  const staf = await isExistStafByEmail(email);
  await NotFound(staf);

  if (staf?.verificationToken !== token || !staf.verificationTokenExpiry) {
    throw new Error('Invalid verification token');
  }

  if (staf?.verificationTokenExpiry < new Date()) {
    throw new Error('Verification token has expired');
  }

  const updatedStaf = await prisma.staf.update({
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
    email: staf.email,
    userId: staf?.id,
    role: staf.role as TRole, // Cast to 'any' or replace with the actual TRole type if available
  };

  //create toke and send to the client
  const accessToken = createToken(
    JwtPayload,
    config?.access_token_secret as string,
    config?.access_token_expires as string,
  );

  const refreshToken = createToken(
    JwtPayload,
    config.refress_token_secret as string,
    config.refresh_token_expires as string,
  );

  return {
    message: 'Staf verified successfully',
    updatedStaf,
    accessToken,
    refreshToken,
  };
};

const login = async (payload: ILoginUser) => {
  const staf = await prisma.staf.findUnique({
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

  if (!staf?.isVerified) {
    throw new AppError(403, 'Please Verify Your Email');
  }

  if (!staf?.password) {
    throw new Error('Invalid credentials');
  }

  const isPasswordMatched: boolean = await bcrypt.compare(
    payload.password,
    staf.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Invalid credentials');
  }
  const JwtPayload = {
    userId: staf?.id,
    email: staf.email,
    role: staf.role as TRole,
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

  const stafData = {
    id: staf.id,
    name: staf.name,
    email: staf.email,
    role: staf.role,
    imgUrl: staf?.profileImage ? staf?.profileImage : null,
  };
  return {
    staf: stafData,
    accessToken,
    refreshToken,
  };
};

const forgotPassword = async (email: string) => {
  await NotFound(email, 'Email is required');
  const staf = await isExistStafByEmail(email);
  await NotFound(staf, 'staf');

  if (!staf?.id || !staf?.email || !staf?.role) {
    throw new Error('staf data is incomplete for token generation');
  }
  const JwtPayload = {
    userId: staf?.id as string,
    email: staf?.email as string,
    role: staf?.role as any,
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
  const staf = await isExistStafByEmail(email);
  await NotFound(staf);

  const verification = verifyToken(token, config.access_token_secret as string);
  await NotFound(verification);

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.staf.update({
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
  const staf = await isExistStafByEmail(email);
  await NotFound(staf, 'staf not found with this email');
  if (!staf?.password) {
    throw new Error('staf password is missing');
  }
  const isPasswordMatched: boolean = await bcrypt.compare(
    oldPassword,
    staf.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Invalid credentials password not matched!');
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.salt_round),
  );

  await prisma.staf.update({
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
  const staf = await prisma.staf.findUnique({
    where: {
      id: decoded?.stafId,
    },
  });

  if (!staf) {
    throw new Error('staf not found with this refresh token');
  }

  const JwtPayload = {
    userId: staf?.id,
    email: staf?.email,
    role: staf?.role as any,
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
  const staf = await prisma.staf.findUnique({
    where: {
      email,
    },
  });
  if (!staf) {
    throw new AppError(400, 'staf not found with this email');
  }

  if (staf.isVerified) {
    throw new AppError(400, 'staf is already verified');
  }

  const verificationToken = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();
  const verificationTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

  await prisma.staf.update({
    where: { email },
    data: {
      verificationToken,
      verificationTokenExpiry,
    },
  });

  sendVerificationEmail(staf.email, verificationToken);

  return true;
};


export const StafService = {
  createStaf,
  allStaf,
  singleStaf,
  deleteStaf,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  refreshToken,
  verifyEmail,
  resendVerifyEmail,
};
