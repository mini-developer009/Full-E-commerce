import { z } from "zod";

export const createShopValidation=z.object({
    name :z.string({
        message:"name is required"
    }),
})


export const updateValidationSchema=createShopValidation.partial();