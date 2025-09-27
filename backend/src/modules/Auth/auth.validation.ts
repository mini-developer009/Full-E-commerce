import { z } from 'zod';

const UserRegisterValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const UserLoginValidationSchema = z.object({
  email: z.string().email().nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
});

const changePasswordValidationSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

export const authValidation = {
  UserLoginValidationSchema,
  changePasswordValidationSchema,
  UserRegisterValidationSchema,
};
