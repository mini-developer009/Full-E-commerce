import { NextFunction, Request, Response, Router } from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/sendImageToCloudinary";
import validateRequest from "../../middlewares/validateRequest";
import { create } from "domain";
import { createSchemaValidation, updateSupplierValidation } from "./suppliers.validation";
import { suppliersController } from "./suppliers.controller";

const router=Router();
//create supplier
router.post('/create-supplier',auth('BUSINESS','STAF'),
upload.single('file'),
(req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body.data === 'string') {
      req.body = JSON.parse(req.body.data);
    }
    if(req.body.prevdueMoney){
      req.body.prevdueMoney = parseFloat(req.body.prevdueMoney);
    }
    next();
  },
validateRequest(createSchemaValidation),
suppliersController.createSupplier
)

//update supplier
router.patch('/update-supplier/:id',auth('BUSINESS','STAF'),
upload.single('file'),
(req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body.data === 'string') {
      req.body = JSON.parse(req.body.data);
    }
     if(req.body.prevdueMoney){
      req.body.prevdueMoney = parseFloat(req.body.prevdueMoney);
    }
    next();
  }
, validateRequest(updateSupplierValidation),
suppliersController.updateSupplier
);

//get all suppliers
router.get('/all-suppliers', auth('BUSINESS','STAF'), suppliersController.getAllSuppliers);

//get single supplier
router.get('/single-supplier/:id', auth('BUSINESS','STAF'), suppliersController.getSingleSupplier);

//delete supplier
router.delete('/delete-supplier/:id', auth('BUSINESS','STAF'), suppliersController.deleteSupplier);
export const suppliersRouter = router;