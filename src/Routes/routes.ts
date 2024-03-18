import { Router } from "express";
import { CarController } from "../controllers/CarController";
import { carCreateSchema, carUpdateSchema } from "../schemas/car.schema";
import { GlobalErrors } from "../middlewares/index.middleware";
import { CheckDuplicateCar } from "../middlewares/car.middleware";



const appRouter = Router();
const globalErrors = new GlobalErrors();
const carController = new CarController();
const checkDuplicateCar = new CheckDuplicateCar();



appRouter.post("/cars", globalErrors.validateName, globalErrors.validateBody(carCreateSchema), checkDuplicateCar.execute,carController.createCar);
appRouter.get("/cars", carController.getCars);
appRouter.get("/cars/:id", carController.getCarById);
appRouter.patch( "/cars/:id", globalErrors.validateBody(carUpdateSchema), carController.updateCar);
appRouter.delete("/cars/:id", carController.deleteCar);


export { appRouter };
