import { Router } from "express";
import auth from "../../middlewares/auth";
import { OrderController } from "./order.controller";

const router=Router();


router.post('/create-order',auth('BUSINESS','STAF'),OrderController.createOrder);
router.patch('/update-order/:id',auth('BUSINESS','STAF'),OrderController.updateOrder);
router.get('/all-order',auth('BUSINESS','STAF'),OrderController.allOrder);
router.get('/single-order/:id',auth('BUSINESS','STAF'),OrderController.singleOrder);
router.delete('/single-order/:id',auth('BUSINESS','STAF'),OrderController.deleteOrder);

export const OrderRoutes=router;