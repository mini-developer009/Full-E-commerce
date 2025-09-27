import AppError from '../../errors/AppError';
import { prisma } from '../../prisma/client';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StafService } from './staf.service';

const createStaf = catchAsync(async (req, res) => {
  const userId = req.user.id as string;
  const shop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });
  req.body.shopId = shop?.id as string;
  req.body.userId = userId;
  req.body.file = req.file?.filename as string;
  const result = await StafService.createStaf(
    req.file as Express.Multer.File,
    req.body,
  );
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 201 : 404,
    success: isOk,
    message: isOk ? 'Successfully Created Staf' : 'Failed to Create Staf',
    Data: isOk ? result : [],
  });
});

const allStaf = catchAsync(async (req, res) => {
  const result = await StafService.allStaf(req.query, req.user.id as string);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk
      ? 'Successfully Retriaved all Staf'
      : 'Failed to Retrived all Staf',
    Data: isOk ? result : [],
  });
});
const singleStaf = catchAsync(async (req, res) => {
  const result = await StafService.singleStaf(req.params.id as string,req.user.id as string);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk
      ? 'Successfully Retriaved  Staf'
      : 'Failed to Retrived a Staf',
    Data: isOk ? result : [],
  });
});
const deleteStaf = catchAsync(async (req, res) => {
  const result = await StafService.deleteStaf(req.params.id as string,req?.user?.id as string);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk ? 'Successfully Deleted  Staf' : 'Failed to Deltete a Staf',
    Data: isOk ? result : [],
  });
});



const verifyEmail = catchAsync(async (req, res) => {
  const { token, email } = req.body;

  const result = await StafService.verifyEmail(email, token);

  const isok = result ? true : false;

  sendResponse(res, {
    statusCode: isok ? 200 : 400,
    success: isok,
    message: isok
      ? 'Email Verification Successfull'
      : 'Email Verification Failed',
    Data: isok ? result : [],
  });
});

const resendVerifyEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new AppError(400, 'Email is required');
  }
  const result = await StafService.resendVerifyEmail(email);
  const isok = result ? true : false;
  sendResponse(res, {
    statusCode: isok ? 200 : 400,
    success: isok,
    message: isok
      ? 'Verification Email Sent Successfully!'
      : 'Verification Email Sending Failed',
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  const result = await StafService.login({ email, password });
  const isok = result ? true : false;

  sendResponse(res, {
    statusCode: isok ? 200 : 400,
    success: isok,
    message: isok ? 'Login Successfull' : 'Login Failed',
    Data: isok ? result : [],
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  await StafService.forgotPassword(email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Check Your email',
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const email = req.user.email;
  const { newPassword } = req.body;

  const result = await StafService.resetPassword(
    email,
    token as string,
    newPassword,
  );
  const isok = result ? true : false;

  sendResponse(res, {
    statusCode: isok ? 200 : 400,
    success: isok,
    message: isok ? 'Password Reset Successfull' : 'Password Reset Failed',
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { email } = (req as any).user;
  const { newPassword, oldPassword } = req.body;
  const result = await StafService.changePassword(
    email,
    oldPassword,
    newPassword,
  );
  const isok = result ? true : false;
  sendResponse(res, {
    statusCode: isok ? 200 : 400,
    success: isok,
    message: isok ? 'Password Changed Successfull' : 'Password Change Failed',
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  const result = await StafService.refreshToken(refreshToken);
  const isok = result ? true : false;
  sendResponse(res, {
    statusCode: isok ? 200 : 400,
    success: isok,
    message: isok ? 'Refresh Token Successfull' : 'Refresh Token Failed',
    Data: isok ? result : [],
  });
});


export const StafController = {
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
