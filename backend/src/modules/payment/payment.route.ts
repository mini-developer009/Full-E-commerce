import { Router } from "express";
import auth from "../../middlewares/auth";
import { PaymentController } from "./payment.controller";

const router=Router();
//create payment
router.post('/create-payment',auth('BUSINESS'),PaymentController.createPayment);

//all payments
router.get('/all-payment',auth('BUSINESS','STAF'),PaymentController.allpayment);

//single payment by paymentId
router.get('/singlpayment/:id',auth('BUSINESS','STAF'),PaymentController.singlePaymentById);

//customer Id
router.get('/singlepayment/:customerId',auth('BUSINESS','STAF'),PaymentController.customerPayment);
export const PaymentRoutes=router;
