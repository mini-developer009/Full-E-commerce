import { create } from "domain";
import { z } from "zod";

export const createSchemaValidation=z.object({
  name: z.string().min(1, "Name is required"),
    CompanyName: z.string().min(1, "Company Name is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    address: z.string().min(1, "Address is required"),
    prevdueMoney: z.number().min(0, "Previous Due Money must be a non-negative number"),
    zipCode: z.string().min(1, "Zip Code is required"),
    email: z.string().email("Invalid email format"),
    bankAccount: z.string().min(1, "Bank Account is required"),
    domain: z.string({message: "Domain is required"}).optional(),
    file: z.string().optional(),
    phone: z.string().min(1, "Phone number is required"),
});


export const updateSupplierValidation = createSchemaValidation.partial();