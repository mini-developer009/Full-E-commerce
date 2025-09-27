import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { paymentServices } from './payment.service';

const createPayment = catchAsync(async (req, res) => {
  const result = await paymentServices.createPayment(
    req.user.id as string,
    req.body,
  );
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 201 : 404,
    success: isOk,
    message: isOk ? 'Successfully Created Payment' : 'Failed to Create Payment',
    Data: isOk ? result : [],
  });
});
const allpayment = catchAsync(async (req, res) => {
  const result = await paymentServices.allpayment(
    req.user.id as string,
    req.query
  );
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk ? 'Successfully Retrieved Payments' : 'Failed to Retrieve Payments',
    Data: isOk ? result : [],
  });
});
const singlePaymentById = catchAsync(async (req, res) => {
  const result = await paymentServices.singlePaymentById(
    req.user.id as string,
    req.params.id as string,
  );
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk ? 'Successfully Retrieved Payment' : 'Failed to Retrieve a Payment',
    Data: isOk ? result : [],
  });
});
const customerPayment = catchAsync(async (req, res) => {
  const result = await paymentServices.customerPayment(
    req.user.id as string,
    req.params.customerId as string,
  );
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk ? 'Successfully Retreived a Payment' : 'Failed to Retrieve a Payment',
    Data: isOk ? result : [],
  });
});


export const PaymentController={
    createPayment,
    allpayment,
    singlePaymentById,
    customerPayment
}