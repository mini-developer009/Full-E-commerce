import { z } from "zod";

export const stafValidationSchema=z.object({
    name:z.string({
        message:"name is required"
    }),
    email:z.string({
        message:"email is required"
    }),
    password:z.string({
        message:"password is required"
    }),
    address:z.string({
        message:"address required"
    }),
    position:z.string({
        message:"position required"
    }),
    phone:z.string({
  required_error: "Phone number is required",
}).min(11, { message: "Phone number must be at least 11 digits" })
  .max(14, { message: "Phone number must not exceed 14 digits" })
  .regex(/^\d+$/, { message: "Phone number must contain only digits" })
})