import { prisma } from '../../prisma/client';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NotFound } from '../../utils/utility';
import { suppliersService } from './suppliers.service';

const createSupplier = catchAsync(async (req, res) => {
  const userId = req.user.id as string;
  const normaluser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const staf = await prisma.staf.findUnique({
    where: {
      id: userId,
    },
  });
  const user = normaluser ? normaluser : staf;
  await NotFound(user, 'User');

  let shop = null;
  if (user && 'shopId' in user && user.shopId !== null) {
    shop = await prisma.shop.findUnique({
      where: {
        id: user.shopId as string,
      },
    });
  }

  await NotFound(shop, 'Shop');
  const shopId = shop?.id as string;
  req.body.shopId = shopId;
  req.body.file = req.file?.filename as string;
  req.body.prevdueMoney = parseFloat(req.body.prevdueMoney);
  const result = await suppliersService.createSupplier(req.body);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 201 : 404,
    success: isOk,
    message: isOk
      ? 'Successfully Created Supplier'
      : 'Failed to Create Supplier',
    Data: isOk ? result : [],
  });
});

//update supplier
const updateSupplier = catchAsync(async (req, res) => {
  const userId = req.user.id as string;
  const normaluser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const staf = await prisma.staf.findUnique({
    where: {
      id: userId,
    },
  });
  const user = normaluser ? normaluser : staf;
  await NotFound(user, 'User');

  let shop = null;
  if (user && 'shopId' in user && user.shopId !== null) {
    shop = await prisma.shop.findUnique({
      where: {
        id: user.shopId as string,
      },
    });
  }

  await NotFound(shop, 'Shop');
  const shopId = shop?.id as string;
  req.body.shopId = shopId;
 if(req.file) {
   req.body.file = req.file.filename as string;
 }
 req.body.id= req.params.id;
  const result = await suppliersService.updateSupplier(req.body);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk
      ? 'Successfully Updated Supplier'
      : 'Failed to Update Supplier',
    Data: isOk ? result : [],
  });
});

//delete supplier
const deleteSupplier = catchAsync(async (req, res) => {
  
  const { id } = req.params;
   const userId = req.user.id as string;
  const normaluser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const staf = await prisma.staf.findUnique({
    where: {
      id: userId,
    },
  });
  const user = normaluser ? normaluser : staf;
  await NotFound(user, 'User');

  let shop = null;
  if (user && 'shopId' in user && user.shopId !== null) {
    shop = await prisma.shop.findUnique({
      where: {
        id: user.shopId as string,
      },
    });
  }

  await NotFound(shop, 'Shop');
  const shopId = shop?.id as string;


  const result = await suppliersService.deleteSupplier(id, shopId);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk
      ? 'Successfully Deleted Supplier'
      : 'Failed to Delete Supplier',
    Data: isOk ? result : [],
  });
});

//get all suppliers
const getAllSuppliers = catchAsync(async (req, res) => {
  const userId = req.user.id as string;
  const normaluser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const staf = await prisma.staf.findUnique({
    where: {
      id: userId,
    },
  });
  const user = normaluser ? normaluser : staf;
  await NotFound(user, 'User');

  let shop = null;
  if (user && 'shopId' in user && user.shopId !== null) {
    shop = await prisma.shop.findUnique({
      where: {
        id: user.shopId as string,
      },
    });
  }

  await NotFound(shop, 'Shop');
  const shopId = shop?.id as string;
  
  const query = req.query;

  const result = await suppliersService.getAllSuppliers(shopId, query);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk
      ? 'Successfully Retrieved Suppliers'
      : 'Failed to Retrieve Suppliers',
    Data: isOk ? result : [],
  });
});

//get single supplier
const getSingleSupplier = catchAsync(async (req, res) => {
   const userId = req.user.id as string;
  const normaluser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const staf = await prisma.staf.findUnique({
    where: {
      id: userId,
    },
  });
  const user = normaluser ? normaluser : staf;
  await NotFound(user, 'User');

  let shop = null;
  if (user && 'shopId' in user && user.shopId !== null) {
    shop = await prisma.shop.findUnique({
      where: {
        id: user.shopId as string,
      },
    });
  }

  await NotFound(shop, 'Shop');
  const shopId = shop?.id as string;
  const { id } = req.params;

  const result = await suppliersService.getSupplierById(id, shopId);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk
      ? 'Successfully Retrieved Supplier'
      : 'Failed to Retrieve Supplier',
    Data: isOk ? result : [],
  });
});

export const suppliersController = {
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSingleSupplier,
};
