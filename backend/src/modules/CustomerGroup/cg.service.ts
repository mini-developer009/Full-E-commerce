import { customerGroup } from '@prisma/client';
import {
  alreadyExist,
  isShopExist,
  isShopExistByShopId,
  NotFound,
} from '../../utils/utility';
import { prisma } from '../../prisma/client';

//creat group
const createCg = async (
  shopId: string,
  payload: { name: string; date: Date },
) => {
  const isExistShop = await isShopExistByShopId(shopId);
  await NotFound(isExistShop, 'Shop');

  const isAlreadyExist = await prisma.customerGroup.findFirst({
    where: {
      name: payload.name,
      shopId: isExistShop?.id,
    },
  });

  await alreadyExist(isAlreadyExist, 'This group already Exist');

  return await prisma.customerGroup.create({
    data: {
      name: payload.name,
      date: payload.date,
      shopId: isExistShop?.id as string,
    },
  });
};

//update group
const updateCg = async (
  shopId: string,
  id: string,
  payload: Partial<customerGroup>,
) => {
  const { name, date } = payload;
  const isExistShop = await isShopExistByShopId(shopId);
  await NotFound(isExistShop, 'Shop');

  const isExist = await prisma.customerGroup.findUnique({
    where: {
      id,
      shopId: isExistShop?.id as string,
    },
  });

  await NotFound(isExist, 'Customer group');

  return await prisma.customerGroup.update({
    where: { id },
    data: { ...payload },
  });
};

//get all gruops
const getAllMyCGroups = async (shopId: string) => {
  const isExistShop = await isShopExistByShopId(shopId);
  await NotFound(isExistShop, 'Shop');
  return await prisma.customerGroup.findMany({
    where: { shopId: isExistShop?.id as string },
  });
};

//single group
const singleCGroup = async (shopId: string, id: string) => {
  const isExistShop = await isShopExistByShopId(shopId);
  await NotFound(isExistShop, 'Shop');
  return await prisma.customerGroup.findUnique({
    where: {
      id,
      shopId: isExistShop?.id as string,
    },
  });
};

//delete group

const deleteCGroup = async (shopId: string, id: string) => {
  const isExistShop = await isShopExistByShopId(shopId);
  await NotFound(isExistShop, 'Shop');
  return await prisma.customerGroup.delete({
    where: {
      id,
      shopId: isExistShop?.id as string,
    },
  });
};

export const customerGroupServices = {
  createCg,
  updateCg,
  deleteCGroup,
  getAllMyCGroups,
  singleCGroup,
};
