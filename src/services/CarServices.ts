import { prisma } from "../database/database";
import { CreateCar } from "../interfaces/interfaces";
import { Request, Response } from "express";

export class CarService {
  public async createCar(req: Request, res: Response): Promise<Response> {
    try {
      const newCar: CreateCar = req.body;

      const carData: any = {
        name: newCar.name,
        description: newCar.description,
        brand: newCar.brand,
        year: newCar.year,
        km: newCar.km,
      };

      const createdCar = await prisma.car.create({
        data: carData,
      });

      return res.status(201).json(createdCar);
    } catch (error) {
      console.error("Error creating car:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while creating the car" });
    }
  }

  public async getCars(req: Request, res: Response): Promise<Response> {
    try {
      const categoryNameFilter = req.query.category
        ? String(req.query.category).toLowerCase()
        : undefined;

      let whereClause = {};

      const matchingCars = await prisma.car.findMany({
        where: whereClause,
      });

      if (matchingCars.length === 0) {
        return res.status(404).json({ message: "No cars found" });
      }

      const response = matchingCars.map((car) => {
        return {
          id: car.id,
          name: car.name,
          description: car.description,
          brand: car.brand,
          year: car.year,
          km: car.km,
        };
      });

      return res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching cars:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  public async getCarById(req: Request, res: Response): Promise<Response> {
    try {
      const carId = req.params.id;
      const matchingCar = await prisma.car.findUnique({
        where: { id: carId },
      });

      if (!matchingCar) {
        return res.status(404).json({ message: "Car not found" });
      }

      const response = {
        id: matchingCar.id,
        name: matchingCar.name,
        description: matchingCar.description,
        brand: matchingCar.brand,
        year: matchingCar.year,
        km: matchingCar.km,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching car:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  public async updateCar(req: Request, res: Response): Promise<Response> {
    try {
      const carId = String(req.params.id);
      const updatedCarData = req.body;

      const existingCar = await prisma.car.findUnique({
        where: { id: carId },
      });
      if (!existingCar) {
        return res.status(404).json({ message: "Car not found" });
      }

      const updated = await prisma.car.update({
        where: { id: carId },
        data: updatedCarData,
      });

      return res.status(200).json(updated);
    } catch (error) {
      console.error("Error updating car:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  public async deleteCar(req: Request, res: Response): Promise<Response> {
    try {
      const carId = String(req.params.id);

      const existingCar = await prisma.car.findUnique({
        where: { id: carId },
      });

      if (!existingCar) {
        return res.status(404).json({ message: "Car not found" });
      }

      await prisma.car.delete({ where: { id: carId } });

      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting car:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
