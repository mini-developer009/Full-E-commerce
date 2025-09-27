import { Request, Router,Response,NextFunction } from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { upload } from '../../utils/sendImageToCloudinary';



const router = Router();

router.post(
  '/register',
   upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body.data === 'string') {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(authValidation.UserRegisterValidationSchema),
  AuthController.register,
);

router.post(
  '/login',
  validateRequest(authValidation.UserLoginValidationSchema),
  AuthController.login,
);

router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password',auth('STAF','BUSINESS','ADMIN','USER'), AuthController.resetPassword);

router.post(
  '/change-password',
  auth('ADMIN','BUSINESS','USER','STAF'),
  AuthController.changePassword,
);

router.post('/verify-email', AuthController.verifyEmail);
router.post('/resend-verify-email-token', AuthController.resendVerifyEmail);
router.post('/refresh-token', AuthController.refreshToken);
router.patch('/make-admin',auth('SUPERADMIN'), AuthController.makeAdmin);

export const AuthRoutes = router;
