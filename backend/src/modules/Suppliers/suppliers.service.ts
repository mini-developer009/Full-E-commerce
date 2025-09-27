import { Suppliers } from "@prisma/client";
import { isShopExist, isShopExistByShopId, NotFound } from "../../utils/utility";
import { prisma } from "../../prisma/client";
import QueryBuilder from "../../builder/QueryBuilder";
import e from "express";

const createSupplier = async (payload:Suppliers) => {
    const {shopId,CompanyName,city,country,address,prevdueMoney,zipCode,email,bankAccount,domain,file,name,phone}=payload;

    const isExistShop=await isShopExistByShopId(shopId);
    await NotFound(isExistShop, "Shop");

    const result=await prisma.suppliers.create({
        data: { 
            shopId: isExistShop?.id as string,
            phone,
            prevdueMoney,
            zipCode,
            CompanyName,
            city,
            country,
            address,
            email,
            bankAccount,
            domain,
            file,
            name
        }
    });
    return result;
}


//update supplier
const updateSupplier = async (payload:Partial<Suppliers> ) => {
    const {id,shopId,CompanyName,city,country,address,prevdueMoney,zipCode,email,bankAccount,domain,file,name,phone}=payload;
    if (!id) throw new Error("Supplier ID is required for update");
    const isExistShop=await isShopExistByShopId(shopId as string);
    await NotFound(isExistShop, "Shop");

    const result=await prisma.suppliers.update({
        where: { id,shopId: isExistShop?.id },
        data: { 
            shopId:isExistShop?.id as string,
            phone,
            prevdueMoney,
            zipCode,
            CompanyName,
            city,
            country,
            address,
            email,
            bankAccount,
            domain,
            file,
            name
        }
    });
    return result;
}

//delete supplier
const deleteSupplier = async (id: string, shopId: string) => {
    if (!id) throw new Error("Supplier ID is required for deletion");
    const isExistShop = await isShopExistByShopId(shopId);
    await NotFound(isExistShop, "Shop");

    const result = await prisma.suppliers.delete({
        where: { id ,shopId: isExistShop?.id }
    });
    return result;
}

//get all suppliers
const getAllSuppliers = async (shopId: string,query:any) => {
    const isExistShop = await isShopExistByShopId(shopId);
    await NotFound(isExistShop, "Shop");
    const builder=new QueryBuilder(query,prisma.suppliers);
    const result=await builder
        .include({
            shop: true,
        })
        .rawFilter({
            shopId: isExistShop?.id
        })
        //  .search(["CompanyName","city","country","address","email","bankAccount","domain","name","phone"])
        // .filter(["CompanyName","city","country","address","email","bankAccount","domain","name","phone"])
        .sort(["-createdAt"])
        .paginate()
        .execute();


        const meta=await builder.countTotal();
        return {
            meta: {
                total: meta,
                page: query.page || 1,
                limit: query.limit || 10
            },
             data: result
        }

   
}

//get supplier by id
const getSupplierById = async (id: string, shopId: string) => {
    if (!id) throw new Error("Supplier ID is required for retrieval");
    const isExistShop = await isShopExistByShopId(shopId);
    await NotFound(isExistShop, "Shop");

    const result = await prisma.suppliers.findFirst({
        where: { id, shopId: isExistShop?.id }
    });
    await NotFound(result, "Supplier");
    return result;
}

export const suppliersService = {
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getAllSuppliers,
    getSupplierById
};