import { z } from 'zod';

export const productValidationSchema = z.object({
  title: z.string({
    message: 'title is required',
  }),
  price: z.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    z.number({ message: 'price is required' }),
  ),
    categoryId: z.string({
        message: 'categoryId is required',
    }),
    variantId: z.string({
        message: 'variantId is required',
    }),
  description: z.string({
    message: 'description is required',
  }),
});

export const updateproductValidationSchema = productValidationSchema.partial();
