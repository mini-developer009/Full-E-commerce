import { Pvariant } from '@prisma/client';
import { prisma } from '../../prisma/client';
import QueryBuilder from '../../builder/QueryBuilder';
import { isShopExistByShopId, NotFound } from '../../utils/utility';

const createVariant = async (payload: Pvariant) => {
  const { type, shopId, description } = payload;
  const isExistShop = await isShopExistByShopId(shopId);
  await NotFound(isExistShop, 'Shop');
  return await prisma.pvariant.create({
    data: {
      type,
      shopId: isExistShop?.id as string,
      description,
    },
  });
};
const updateVariant = async (id: string, payload: Partial<Pvariant>) => {
  const isExistShop = await isShopExistByShopId(payload?.shopId as string);
  await NotFound(isExistShop, 'Shop');
  return await prisma.pvariant.update({
    where: {
      id,
      shopId: isExistShop?.id as string,
    },
    data: {
      ...payload,
    },
  });
};
const deleteVariant = async (id: string, shopId: string) => {
  const isExistShop = await isShopExistByShopId(shopId as string);
  await NotFound(isExistShop, 'Shop');
  return await prisma.pvariant.delete({
    where: {
      id,
      shopId: isExistShop?.id as string,
    },
  });
};
const singleVariant = async (id: string, shopId: string) => {
  const isExistShop = await isShopExistByShopId(shopId as string);
  await NotFound(isExistShop, 'Shop');
  return await prisma.pvariant.findUnique({
    where: {
      id,
      shopId: isExistShop?.id as string,
    },
  });
};

const allVariant = async (query: any, shopId: string) => {
  const isExistShop = await isShopExistByShopId(shopId as string);
  await NotFound(isExistShop, 'Shop');
  const builder = new QueryBuilder(query, prisma.pvariant);
  const result = await builder
  .rawFilter({ shopId: isExistShop?.id as string })
  .paginate().execute();

  const meta = await builder.countTotal();

  return {
    meta,
    result,
  };
};

export const VariantService = {
  createVariant,
  updateVariant,
  deleteVariant,
  allVariant,
  singleVariant,
};
