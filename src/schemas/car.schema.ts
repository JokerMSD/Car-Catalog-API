import { z } from "zod";
const carSchema = z.object({
  id: z.string().transform((id) => id.toLocaleString()),
  name: z.string().min(2),
  description: z.string().optional(),
  brand: z.string().min(2),
  year: z.number().min(4),
  km: z.number().max(999999),
});

const carCreateSchema = carSchema.omit({ id: true })

const carUpdateSchema = carCreateSchema.partial();

const carArraySchema = carSchema.array();

export { carSchema, carCreateSchema, carUpdateSchema, carArraySchema };
