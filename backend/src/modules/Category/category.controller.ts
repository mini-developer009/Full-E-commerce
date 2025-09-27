import { prisma } from '../../prisma/client';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NotFound } from '../../utils/utility';
import { CategoryService } from './category.service';


const createCategory = catchAsync(async (req, res) => {
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
  const result = await CategoryService.createCategory(req.body);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 201 : 404,
    success: isOk,
    message: isOk ? 'Successfully Created Category' : 'Failed to Create Category',
    Data: isOk ? result : [],
  });
});
const updateCategory = catchAsync(async (req, res) => {
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
  const result = await CategoryService.updateCategory(req.params.id as string,req.body);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk ? 'Successfully Updated Category' : 'Failed to Update Category',
    Data: isOk ? result : [],
  });
});

const deleteCategory = catchAsync(async (req, res) => {
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

  const result = await CategoryService.deleteCategory(req.params.id as string,shopId as string);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk ? 'Successfully Deleted Category' : 'Failed to Deleted Category',
    Data: isOk ? result : [],
  });
});
const singleCategory = catchAsync(async (req, res) => {
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
  const result = await CategoryService.singleCategory(req.params.id as string,shopId);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk ? 'Successfully Retrieved a  Category' : 'Failed to Retrieve a  Category',
    Data: isOk ? result : [],
  });
});
const allCategory = catchAsync(async (req, res) => {
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

  const result = await CategoryService.allCategory(req.query,shopId);
  const isOk = result ? true : false;
  sendResponse(res, {
    statusCode: isOk ? 200 : 404,
    success: isOk,
    message: isOk ? 'Successfully Retrieved Category' : 'Failed to Retrieved Category',
    Data: isOk ? result : [],
  });
});



export const CategoryController={
    createCategory,
    updateCategory,
    deleteCategory,
    allCategory,
    singleCategory
}
