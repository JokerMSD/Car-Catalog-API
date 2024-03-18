import { CarService } from "../services/CarServices";
import { prisma } from "../database/database";

jest.mock("../database/database", () => ({
  prisma: {
    car: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("CarService", () => {
  let carService: CarService;

  beforeEach(() => {
    carService = new CarService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createCar", () => {
    it("should create a new car", async () => {
      const req = {
        body: {
          name: "Test Car",
          description: "Test Description",
          brand: "Test Brand",
          year: 2022,
          km: 1000,
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      (prisma.car.create as jest.Mock).mockResolvedValueOnce({
        id: 1,
        ...req.body,
      });

      await carService.createCar(req as any, res as any);

      expect(prisma.car.create).toHaveBeenCalledWith({ data: req.body });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
    });

    it("should handle errors during car creation", async () => {
      const req = {
        body: {
          name: "Test Car",
          description: "Test Description",
          brand: "Test Brand",
          year: 2022,
          km: 1000,
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const errorMessage = "Failed to create car";

      (prisma.car.create as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await carService.createCar(req as any, res as any);

      expect(prisma.car.create).toHaveBeenCalledWith({ data: req.body });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "An error occurred while creating the car",
      });
    });
  });

  describe("getCars", () => {
    it("should retrieve all cars", async () => {
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const carsData = [
        {
          id: 1,
          name: "Car 1",
          description: "Description 1",
          brand: "Brand 1",
          year: 2020,
          km: 10000,
        },
      ];

      (prisma.car.findMany as jest.Mock).mockResolvedValueOnce(carsData);

      await carService.getCars({ query: {} } as any, res as any);

      expect(prisma.car.findMany).toHaveBeenCalledWith({ where: {} });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(carsData);
    });

    it("should handle no cars found", async () => {
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      (prisma.car.findMany as jest.Mock).mockResolvedValueOnce([]);

      await carService.getCars({ query: {} } as any, res as any);

      expect(prisma.car.findMany).toHaveBeenCalledWith({ where: {} });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "No cars found" });
    });

    it("should handle errors during car retrieval", async () => {
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const errorMessage = "Failed to retrieve cars";

      (prisma.car.findMany as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await carService.getCars({ query: {} } as any, res as any);

      expect(prisma.car.findMany).toHaveBeenCalledWith({ where: {} });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("getCarById", () => {
    it("should retrieve a car by its ID", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const carData = {
        id: 1,
        name: "Car 1",
        description: "Description 1",
        brand: "Brand 1",
        year: 2020,
        km: 10000,
      };

      (prisma.car.findUnique as jest.Mock).mockResolvedValueOnce(carData);

      await carService.getCarById(req as any, res as any);

      expect(prisma.car.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(carData);
    });

    it("should handle car not found", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      (prisma.car.findUnique as jest.Mock).mockResolvedValueOnce(null);

      await carService.getCarById(req as any, res as any);

      expect(prisma.car.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Car not found" });
    });

    it("should handle errors during car retrieval by ID", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const errorMessage = "Failed to retrieve car by ID";

      (prisma.car.findUnique as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await carService.getCarById(req as any, res as any);

      expect(prisma.car.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("updateCar", () => {
    it("should update an existing car", async () => {
      const req = {
        params: { id: "1" },
        body: { name: "Updated Car", description: "Updated Description" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const updatedCarData = {
        id: 1,
        name: "Updated Car",
        description: "Updated Description",
        brand: "Brand 1",
        year: 2020,
        km: 10000,
      };

      (prisma.car.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 1,
        name: "Car 1",
        description: "Description 1",
        brand: "Brand 1",
        year: 2020,
        km: 10000,
      });
      (prisma.car.update as jest.Mock).mockResolvedValueOnce(updatedCarData);

      await carService.updateCar(req as any, res as any);

      expect(prisma.car.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(prisma.car.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: req.body,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedCarData);
    });

    it("should handle car not found during update", async () => {
      const req = {
        params: { id: "1" },
        body: { name: "Updated Car", description: "Updated Description" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      (prisma.car.findUnique as jest.Mock).mockResolvedValueOnce(null);

      await carService.updateCar(req as any, res as any);

      expect(prisma.car.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Car not found" });
    });

    it("should handle errors during car update", async () => {
      const req = {
        params: { id: "1" },
        body: { name: "Updated Car", description: "Updated Description" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const errorMessage = "Failed to update car";

      (prisma.car.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 1,
        name: "Car 1",
        description: "Description 1",
        brand: "Brand 1",
        year: 2020,
        km: 10000,
      });
      (prisma.car.update as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await carService.updateCar(req as any, res as any);

      expect(prisma.car.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(prisma.car.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: req.body,
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("deleteCar", () => {
    it("should delete an existing car", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      (prisma.car.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 1,
        name: "Car 1",
        description: "Description 1",
        brand: "Brand 1",
        year: 2020,
        km: 10000,
      });

      await carService.deleteCar(req as any, res as any);

      expect(prisma.car.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(prisma.car.delete).toHaveBeenCalledWith({ where: { id: "1" } });
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it("should handle car not found during deletion", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      (prisma.car.findUnique as jest.Mock).mockResolvedValueOnce(null);

      await carService.deleteCar(req as any, res as any);

      expect(prisma.car.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Car not found" });
    });

    it("should handle errors during car deletion", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const errorMessage = "Failed to delete car";

      (prisma.car.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 1,
        name: "Car 1",
        description: "Description 1",
        brand: "Brand 1",
        year: 2020,
        km: 10000,
      });
      (prisma.car.delete as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await carService.deleteCar(req as any, res as any);

      expect(prisma.car.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(prisma.car.delete).toHaveBeenCalledWith({ where: { id: "1" } });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});
