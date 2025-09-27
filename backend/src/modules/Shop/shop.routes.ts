import { NextFunction, Request, Response, Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import {
  createShopValidation,
  updateValidationSchema,
} from './shop.validation';
import { ShopController } from './shop.controller';
import { upload } from '../../utils/sendImageToCloudinary';

const router = Router();

//creat shop

router.post(
  '/create-shop',
  auth('USER'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body.data === 'string') {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(createShopValidation),
  ShopController.createShop,
);

router.patch(
  '/update-shop/:id',
  auth('BUSINESS'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body.data === 'string') {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(updateValidationSchema),
  ShopController.updateShop,
);

router.get('/all-shop', auth('ADMIN'), ShopController.getAllShop);
router.get(
  '/my-shop',
  auth('BUSINESS', 'STAF', 'ADMIN'),
  ShopController.getMyShop,
);

router.get(
  '/single-shop/:id',
  auth('BUSINESS', 'STAF', 'ADMIN'),
  ShopController.singleShop,
);

router.delete('/delete-shop/:id', auth('ADMIN'), ShopController.deleteShop);

export const ShopRoutes = router;
