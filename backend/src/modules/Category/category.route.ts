import { Router } from "express";
import auth from "../../middlewares/auth";
import { CategoryController } from "./category.controller";


const router=Router();

//create
router.post('/create',auth('STAF','BUSINESS'),CategoryController.createCategory);

//update
router.patch('/update/:id',auth('STAF','BUSINESS'),CategoryController.updateCategory);

//delete
router.delete('/delete/:id',auth('STAF','BUSINESS'),CategoryController.deleteCategory);

//all Category
router.get('/all-Category',auth('STAF','ADMIN','BUSINESS'),CategoryController.allCategory);

//single Category
router.get('/single-Category/:id',auth('STAF','ADMIN','BUSINESS'),CategoryController.singleCategory);


export const CategoryRoutes=router;