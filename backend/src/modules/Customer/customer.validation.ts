import { z } from "zod";

export const customerValidationSchema=z.object({
    name:z.string({
        message:"name is required"
    }),
    fatherName:z.string().optional(),
    motherName:z.string().optional(),
    dateofBirth:z.string().optional(),
    Ref:z.string().optional(),
    email:z.string().optional(),
    phone:z.string({
        message:"phone number is required"
    }).optional(),
    addresss:z.string().optional(),
    upazilla:z.string().optional(),
    zipcode:z.string().optional(),
    road:z.string().optional(),
    DueLimit:z.string().optional(),
})

export const updatecustomerValidationSchema=customerValidationSchema.partial();