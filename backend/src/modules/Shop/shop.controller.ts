import catchAsync from '../../utils/catchAsync';
import { uploadToDigitalOceanAWS } from '../../utils/sendImageToCloudinary';
import sendResponse from '../../utils/sendResponse';
import { NotFound } from '../../utils/utility';
import { ShopServices } from './shop.service';

const createShop = catchAsync(async (req, res) => {
  const file = req.file as Express.Multer.File;
  await NotFound(file, 'File');
  const { location } = await uploadToDigitalOceanAWS(file);
  req.body.shopImg = location as string;
  req.body.userId = req.user.id;
  req.body.email = req.user.email;

  const result = await ShopServices.createShop(req.body);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 201 : 404,
    success: isOk,
    message: isOk ? 'Successfully Created Shop' : 'Failed to Create Shop',
    Data: isOk ? result : [],
  });
});

const getAllShop = catchAsync(async (req, res) => {
  const result = await ShopServices.getAllShop(req.query);
  const isOk = result.result.length > 0 ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk ? 'Successfully Retrived All  Shops' : 'Failed to Get Shops',
    Data: isOk ? result : [],
  });
});

const getMyShop = catchAsync(async (req, res) => {
  const result = await ShopServices.getMyShop(req.user.id as string);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk ? 'Successfully Retrived   Shop' : 'Failed to Get Shop',
    Data: isOk ? result : [],
  });
});

const singleShop = catchAsync(async (req, res) => {
  const result = await ShopServices.singleShop(req.params.id as string);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk ? 'Successfully Retrived   Shop' : 'Failed to Get Shop',
    Data: isOk ? result : [],
  });
});

const deleteShop = catchAsync(async (req, res) => {
  const result = await ShopServices.deleteShop(req.params.id as string);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk ? 'Successfully Deleted a   Shop' : 'Failed to Delete Shop',
    Data: isOk ? result : [],
  });
});

const updateShop = catchAsync(async (req, res) => {
  const file = req.file as Express.Multer.File;

  if (file) {
    const { location } = await uploadToDigitalOceanAWS(file);
    req.body.shopImg = location as string;
  }
  req.body.userId = req.user.id;
  req.body.email = req.user.email;

  const result = await ShopServices.updateShop(req.body);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk ? 'Successfully Created Shop' : 'Failed to Create Shop',
    Data: isOk ? result : [],
  });
});

export const ShopController = {
    createShop,
    updateShop,
    deleteShop,
    getAllShop,
    getMyShop,
    singleShop
};
