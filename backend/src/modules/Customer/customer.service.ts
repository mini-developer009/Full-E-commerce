import { Customer } from '@prisma/client';
import { prisma } from '../../prisma/client';
import {
  isExistUserById,
  isShopExist,
  isShopExistByShopId,
  NotFound,
} from '../../utils/utility';
import QueryBuilder from '../../builder/QueryBuilder';
const createCustomer = async (payload: Customer & { userId: string }) => {
  const {
    name,
    email,
    phone,
    fatherName,
    motherName,
    address,
    upazilla,
    status,
    road,
    zipCode,
    shopId,
    DueLimit,
  } = payload;

  //check shop exist or not

  const isExistShop = await isShopExistByShopId(shopId);
  await NotFound(isExistShop, 'Shop');

  const result = await prisma.customer.create({
    data: {
      name,
      email,
      phone,
      fatherName,
      motherName,
      address,
      DueLimit,
      shopId,
      shopName:isExistShop?.name as string,
      zipCode,
      upazilla,
      status,
      road,
    },
  });

  return result;
};

//all customer
const allCustomers = async (query: any, shopId: string) => {
  const shop = await isShopExistByShopId(shopId);
  await NotFound(shop, 'Shop');
  const builder = new QueryBuilder(query, prisma.customer);
  const result = await builder
    .rawFilter({
      shopId: shop?.id as string,
    })
    .include({
      orders:true,
      group:true,
      payment:true
    })
    .paginate()
    .execute();
  const meta = await builder.countTotal();

  return {
    meta,
    result,
  };
};

//single customer
const singlecustomer = async (shopId: string, id: string) => {
  const isExistShop = await isShopExistByShopId(shopId);
  await NotFound(isExistShop, 'Shop');
  return await prisma.customer.findUnique({
    where: {
      id,
      shopId: isExistShop?.id as string,
    },
  });
};

//delete a customer
const deletecustomer = async (shopId: string, id: string) => {
  const isExistShop = await isShopExistByShopId(shopId);
  await NotFound(isExistShop, 'Shop');
  const customer = await prisma.customer.findUnique({
    where: {
      id,
      shopId: isExistShop?.id as string,
    },
  });
  await NotFound(customer, 'Customer');
  return await prisma.customer.delete({
    where: {
      id,
    },
  });
};

//update customer
const updatecustomer = async (
  shopId: string,
  id: string,
  payload: Partial<Customer>,
) => {
  const isExistShop = await isShopExistByShopId(shopId);
  await NotFound(isExistShop, 'Shop');
  const isExistcustomer = await prisma.customer.findUnique({
    where: {
      id,
      shopId:isExistShop?.id as string
    },
  });
  await NotFound(isExistcustomer, 'customer');
  return await prisma.customer.update({
    where: {
      id: isExistcustomer?.id as string,
      shopId:isExistShop?.id as string
    },
    data: {
      ...payload,
    },
  });
};

export const customerService = {
  createCustomer,
  allCustomers,
  singlecustomer,
  deletecustomer,
  updatecustomer,
};
