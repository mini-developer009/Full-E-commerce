import { Router } from "express";
import auth from "../../middlewares/auth";
import { VariantController } from "./variant.controller";

const router=Router();

//create
router.post('/create',auth('STAF','ADMIN'),VariantController.createVariant);

//update
router.patch('/update/:id',auth('STAF','ADMIN'),VariantController.updatevariant);

//delete
router.delete('/delete/:id',auth('STAF','ADMIN'),VariantController.deleteVariant);

//all variant
router.get('/all-variant',auth('STAF','ADMIN'),VariantController.allVariant);

//single variant
router.get('/single-variant/:id',auth('STAF','ADMIN'),VariantController.singleVariant);


export const VariantRoutes=router;