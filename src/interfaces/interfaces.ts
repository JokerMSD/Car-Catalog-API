import { AnyZodObject, z } from "zod";
import { Request, Response, NextFunction } from "express";
import { carCreateSchema, carUpdateSchema } from "../schemas/car.schema";


type CreateCar = z.infer<typeof carCreateSchema>;

type UpdateCar = z.infer<typeof carUpdateSchema>;

interface RequestSchema {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
}

export interface ServiceInterface {
  execute(
    req: Request | undefined,
    res: Response | undefined,
    next: NextFunction | undefined,
  ): Promise<void | Response<any, Record<string, any>>>;
}

export { CreateCar, UpdateCar, RequestSchema };
