import { Router } from "express";
import auth from "../../middlewares/auth";
import { CustomerGroupController } from "./cg.controller";

const router=Router();


//create cg
router.post('/create-cg',auth('BUSINESS','STAF'),CustomerGroupController.createCg);
router.patch('/update-cg/:id',auth('BUSINESS','STAF'),CustomerGroupController.updateCg);
router.get('/getall-cg',auth('BUSINESS','STAF'),CustomerGroupController.getAllMyCGroups);
router.get('/single-cg/:id',auth('BUSINESS','STAF'),CustomerGroupController.singleCGroup);
router.delete('/delete-cg/:id',auth('BUSINESS','STAF'),CustomerGroupController.deleteCGroup);
export const CgRoutes=router;
