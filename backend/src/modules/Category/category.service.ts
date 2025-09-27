

import { prisma } from "../../prisma/client";
import QueryBuilder from "../../builder/QueryBuilder";
import { PCateory } from "@prisma/client";
import { isShopExistByShopId, NotFound } from "../../utils/utility";

const createCategory=async(payload:PCateory)=>{
    const {name,shopId,description}=payload;
    const isExistShop=await isShopExistByShopId(shopId);
    await NotFound(isExistShop, 'Shop');

    return await prisma.pCateory.create({
        data:{
            name,
            shopId:isExistShop?.id as string,
            description
        }
    })

}
const updateCategory=async(id:string,payload:Partial<PCateory>)=>{

      const isExistShop=await isShopExistByShopId(payload.shopId as string);
    await NotFound(isExistShop, 'Shop');

    return await prisma.pCateory.update({
        where:{
            id,
            shopId:isExistShop?.id as string
        },
        data:{
           ...payload
        }
    })

}
const deleteCategory=async(id:string,shopId:string)=>{
  const isExistShop=await isShopExistByShopId(shopId);
    await NotFound(isExistShop, 'Shop');

    return await prisma.pCateory.delete({
        where:{
            id,
            shopId:isExistShop?.id as string
        }
    })

}
const singleCategory=async(id:string,shopId:string)=>{
  const isExistShop=await isShopExistByShopId(shopId);
    await NotFound(isExistShop, 'Shop');

    return await prisma.pCateory.findUnique({
        where:{
            id,
            shopId:isExistShop?.id as string
        }
    })

}


const allCategory=async(query:any,shopId:string)=>{
      const isExistShop=await isShopExistByShopId(shopId);
    await NotFound(isExistShop, 'Shop');

    const builder=new QueryBuilder(query,prisma.pCateory);
    const result=await builder
    .rawFilter({
        shopId:isExistShop?.id as string
    })
    .paginate()
    .execute();

    const meta=await builder.countTotal();

    return {
        meta,
        result
    }
}


export const CategoryService={
    createCategory,
    updateCategory,
    deleteCategory,
    allCategory,
    singleCategory
}