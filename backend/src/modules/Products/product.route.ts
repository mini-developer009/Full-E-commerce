import { NextFunction, Request, Response, Router } from 'express';
import auth from '../../middlewares/auth';

import { upload } from '../../utils/sendImageToCloudinary';
import validateRequest from '../../middlewares/validateRequest';
import { ProductController } from './product.controller';
import { productValidationSchema, updateproductValidationSchema } from './product.validation';


const router = Router();

//create  product and send password to him
router.post(
  '/create-product',
  auth('BUSINESS','STAF'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body.data === 'string') {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(productValidationSchema),
  ProductController.createProduct,
);

//all  product
router.get('/all-product',auth('BUSINESS','STAF'),ProductController.allProducts);
router.get('/single-product/:id',auth('BUSINESS','STAF'),ProductController.singleProduct);
router.delete('/delete-product/:id',auth('BUSINESS','STAF'),ProductController.deleteProduct);

//update product
router.patch('/update-product/:id',auth('BUSINESS','STAF'),
upload.single('file'),
(req:Request,res:Response,next:NextFunction)=>{
  if(typeof req.body.data==='string'){
    req.body=JSON.parse(req.body.data)
  }
  next();
},
validateRequest(updateproductValidationSchema),
ProductController.updateProduct);
export const  productRoutes = router;
