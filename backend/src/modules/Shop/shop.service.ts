import { Shop } from '@prisma/client';
import { prisma } from '../../prisma/client';
import {
  alreadyExist,
  isExistUserById,
  isShopExist,
  isShopExistByShopId,
  NotFound,
} from '../../utils/utility';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { deleteFromDigitalOceanAWS } from '../../utils/sendImageToCloudinary';

const createShop = async (payload: Shop) => {
  const { name, email, shopImg, userId, address } = payload;

  await isExistUserById(userId);

  const isExistShop = await isShopExist(userId);

  await alreadyExist(isExistShop, 'Shop Already Exist');

  const [shop, shopKeeper] = await prisma.$transaction([
    prisma.shop.create({
      data: {
        userId,
        address,
        name,
        email,
        shopImg,
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: {
        role: 'BUSINESS',
      },
    }),
  ]);

  if (!shop || !shopKeeper) {
    throw new AppError(400, 'Failed to create shop or update user role');
  }

  return shop;
};

const getAllShop = async (query: any) => {
  const builder = new QueryBuilder(query, prisma.shop);
  const result = await builder
    .paginate()
    .include({
      customers: true,
      suppliers: true,
      products: true,
      staf: true,
      orders: true,
      CustomerGroups: true,
    })
    .execute();

  const meta = await builder.countTotal();

  return {
    meta,
    result,
  };
};

const getMyShop = async (userId: string) => {
  return await prisma.shop.findUnique({
    where: {
      userId,
    },
    include: {
      customers: true,
      suppliers: true,
      products: true,
      staf: true,
      orders: true,
      CustomerGroups: true,
    },
  });
};

const updateShop = async (payload: Partial<Shop>) => {
  const userId = payload.userId as string;
  await isExistUserById(userId);
  const isExistShop = await isShopExist(userId);
  await NotFound(isExistShop, 'Shop');
  return await prisma.shop.update({
    where: {
      userId,
    },
    data: {
      ...payload,
    },
  });
};

const deleteShop = async (id: string) => {
  const isExistShop = await isShopExistByShopId(id);
  await NotFound(isExistShop, 'Shop');
  if (isExistShop?.shopImg) {
    await deleteFromDigitalOceanAWS(isExistShop.shopImg as string);
  }


  //staf
  const isExistStaf = await prisma.staf.deleteMany({
    where: {
      shopId: isExistShop?.id as string,
    },
  });
  if (isExistStaf) {
    await prisma.staf.deleteMany({
      where: {
        shopId: isExistShop?.id as string,
      },
    });
  }


  //customer
  const isExistCustomers = await prisma.customer.findMany({
    where: {
      shopId: isExistShop?.id as string,
    },
  });

  if (isExistCustomers) {
    await prisma.customer.deleteMany({
      where: {
        shopId: isExistShop?.id as string,
      },
    });
  }

  //products
  const isExistProducts = await prisma.product.findMany({
    where: {
      shopId: isExistShop?.id as string,
    },
  });

  if (isExistProducts) {
    await prisma.product.deleteMany({
      where: {
        shopId: isExistShop?.id as string,
      },
    });
  }

  //customer group
  const isExistCg = await prisma.customerGroup.findMany({
    where: {
      shopId: isExistShop?.id as string,
    },
  });

  if (isExistCg) {
    await prisma.customerGroup.deleteMany({
      where: {
        shopId: isExistShop?.id as string,
      },
    });
  }

  //suppliers
  const isExistSuppliers = await prisma.suppliers.findMany({
    where: {
      shopId: isExistShop?.id as string,
    },
  });

  if (isExistSuppliers) {
    await prisma.suppliers.deleteMany({
      where: {
        shopId: isExistShop?.id as string,
      },
    });
  }
  //orders
  const isExistOrders = await prisma.order.findMany({
    where: {
      shopId: isExistShop?.id as string,
    },
  });

  if (isExistOrders) {
    await prisma.order.deleteMany({
      where: {
        shopId: isExistShop?.id as string,
      },
    });
  }

  //safely delete

  return await prisma.shop.delete({
    where: {
      id,
    },
  });
};

const singleShop = async (id: string) => {
  return await prisma.shop.findUnique({
    where: {
      id,
    },
    include: {
      customers: true,
      suppliers: true,
      products: true,
      staf: true,
      orders: true,
      CustomerGroups: true,
    },
  });
};

export const ShopServices = {
  createShop,
  updateShop,
  deleteShop,
  singleShop,
  getAllShop,
  getMyShop,
};
