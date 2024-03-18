import { Request, Response } from "express";
import { CarService } from "../services/CarServices";

export class CarController {
  private carService: CarService;

  constructor() {
    this.carService = new CarService();
  }

  public getCars = async (req: Request, res: Response): Promise<Response> => {
    return this.carService.getCars(req, res);
  };

  public getCarById = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    return this.carService.getCarById(req, res);
  };

  public createCar = async ( req: Request, res: Response): Promise<Response> => {
    return this.carService.createCar(req, res);
  };

  public updateCar = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    return this.carService.updateCar(req, res);
  };

  public deleteCar = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    return this.carService.deleteCar(req, res);
  };
}
