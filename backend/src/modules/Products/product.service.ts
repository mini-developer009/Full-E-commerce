import { Product } from '@prisma/client';
import { prisma } from '../../prisma/client';
import {
  isExistUserById,
  isShopExist,
  isShopExistByShopId,
  NotFound,
} from '../../utils/utility';
import {
  deleteFromDigitalOceanAWS,
} from '../../utils/sendImageToCloudinary';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
const createProduct = async (payload: Product) => {
  const {
    title,
    img,
    price,
    description,
    shopId,
    status,
    categoryId,
    variantId,
  } = payload;

  //check shop exist or not
  const isExistShop = await isShopExistByShopId(shopId);
  await NotFound(isExistShop, 'Shop');

  //check the product already exist or not
  const isExistProduct = await prisma.product.findFirst({
    where: {
      shopId,
    },
  });

  if (isExistProduct) {
    throw new AppError(409, 'Already Exist Prodouct');
  }

 

  const result = await prisma.product.create({
    data: {
      title,
      categoryId,
      variantId,
      status,
      price,
      description,
      img,
      shopId,
      
    },
  });

  return result;
};

//all product
const allProducts = async (query: any, shopId: string) => {
  const shop = await isShopExistByShopId(shopId);
  await NotFound(shop, 'Shop');
  const builder = new QueryBuilder(query, prisma.product);
  const result = await builder
    .rawFilter({
      shopId: shop?.id as string,
    })
    .paginate()
    .execute();
  const meta = await builder.countTotal();

  return {
    meta,
    result,
  };
};

//single product
const singleProduct = async (shopId: string, id: string) => {
  const shop = await isShopExistByShopId(shopId);
  await NotFound(shop, 'Shop');
  return await prisma.product.findUnique({
    where: {
      id,
      shopId: shop?.id as string,
    },
  });
};

//delete a product
const deleteProduct = async (shopId: string, id: string) => {
  const shop = await isShopExistByShopId(shopId);
  await NotFound(shop, 'Shop');
  const product = await prisma.product.findUnique({
    where: {
      id,
      shopId: shop?.id as string,
    },
  });

  await deleteFromDigitalOceanAWS(product?.img as string);

  return await prisma.product.delete({
    where: {
      id,
    },
  });
};

//update product
const updateProduct = async (
  id: string,
  payload: Partial<Product>,
) => {
  const shop = await isShopExistByShopId(payload.shopId as string);
  await NotFound(shop, 'Shop');
  const isExistProduct = await prisma.product.findUnique({
    where: {
      id,
      shopId:shop?.id as string
    },
  });
  await NotFound(isExistProduct, 'Product');
  return await prisma.product.update({
    where: {
      id: isExistProduct?.id as string,
      shopId:shop?.id as string
    },
    data: {
      ...payload,
    },
  });
};

export const productService = {
  createProduct,
  allProducts,
  singleProduct,
  deleteProduct,
  updateProduct,
};
