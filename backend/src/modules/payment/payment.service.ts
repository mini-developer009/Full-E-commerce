import { PaymentInfo } from "@prisma/client";
import { isShopExist, NotFound } from "../../utils/utility";
import { prisma } from "../../prisma/client";
import QueryBuilder from "../../builder/QueryBuilder";

const createPayment=async(userId:string,payload:PaymentInfo)=>{
    const {productId,customerId,shopId}=payload;
    const isExistShop=await isShopExist(userId);
    await NotFound(isExistShop);

    return  await prisma.paymentInfo.create({
        data:{
            productId,
            customerId,
            shopId
        }
    })
}
const allpayment=async(userId:string,query:any)=>{
  
    const isExistShop=await isShopExist(userId);
    await NotFound(isExistShop);
    const builder=new QueryBuilder(query,prisma.paymentInfo);
    const result=await builder
    .rawFilter({
        shopId:isExistShop?.id as string
    })
    .include({
        customer:true,
        shop:true
    })
    .sort(['-createdAt'])
    .paginate()
    .execute()

    const meta=await builder.countTotal();

    return {
        meta,
        result
    }
}


const singlePaymentById=async(userId:string,id:string)=>{
    const isExistShop=await isShopExist(userId);
    await NotFound(isExistShop);

    return await prisma.paymentInfo.findUnique({
        where:{
            id,
            shopId:isExistShop?.id as string
        }
    })
}
const customerPayment=async(userId:string,customerId:string)=>{
    const isExistShop=await isShopExist(userId);
    await NotFound(isExistShop);

    return await prisma.paymentInfo.findFirst({
        where:{
            customerId,
            shopId:isExistShop?.id as string
        }
    })
}


export const paymentServices={
    createPayment,
    allpayment,
    singlePaymentById,
    customerPayment
}