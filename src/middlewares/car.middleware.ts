import { prisma } from "../database/database";
import { Service } from "./global.middleware";
import { AppError } from "../errors/AppError";
import { Request, Response, NextFunction } from "express";

export class CheckDuplicateCar extends Service {
  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response<any, Record<string, any>>> => {
    const carName = req.body.name;
    const carYear = req.body.year;
    const carKm = req.body.km;

    if (typeof carName !== "string") {
      return res.status(400).json({ error: "Title must be a string" });
    }

    try {
      const existingCar = await prisma.car.findFirst({
        where: {
          name: carName,
          year: carYear,
          km: carKm,
        },
      });

      if (existingCar) {
        throw new AppError(409, "Car already registered.");
      }

      return next();
    } catch (error) {
      next(error);
    }
  };

  static getInstance(): CheckDuplicateCar {
    return new CheckDuplicateCar();
  }
}
