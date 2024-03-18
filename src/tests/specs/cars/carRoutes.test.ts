import { request } from "../../setupFiles";
import { describe, it } from "vitest";
import { carDefaultExpects } from "../../utils/carDefaultExpects";
import {
  car,
  invalidDataCar,
  updateCar,
  invalidDataUpdateCar,
  getCarList,
  non_existent_id,
} from "../../mocks/car.mocks";

describe("Car API", () => {
  it("should create a car successfully", async () => {
    const data = await request
      .post("/cars")
      .send(car)
      .expect(201)
      .then((response) => response.body);

    carDefaultExpects(data);
  });

  it("should throw error when trying to create a car with invalid data types", async () => {
    await request
      .post("/cars")
      .send(invalidDataCar)
      .expect(400);
  });

  it("should update a car successfully", async () => {
    const createdCar = await request
      .post("/cars")
      .send(car)
      .expect(201)
      .then((response) => response.body);

    await request
      .patch(`/cars/${createdCar.id}`)
      .send(updateCar)
      .expect(200);
  });

  it("should throw error when trying to update a car with invalid data types", async () => {
    const createdCar = await request
      .post("/cars")
      .send(car)
      .expect(201)
      .then((response) => response.body);

    await request
      .patch(`/cars/${createdCar.id}`)
      .send(invalidDataUpdateCar)
      .expect(400);
  });

  it("should delete a car successfully", async () => {
    const createdCar = await request
      .post("/cars")
      .send(car)
      .expect(201)
      .then((response) => response.body);

    await request
      .delete(`/cars/${createdCar.id}`)
      .expect(204);
  });

  it("should throw error when trying to delete a non-existent car", async () => {
    await request
      .delete(`/cars/${non_existent_id}`)
      .expect(404);
  });

  it("should get a list of cars", async () => {
    await getCarList();
    await request
      .post("/cars")
      .send(car)
    await request
      .get("/cars")
      .expect(200);
  });

  it("should get a car by ID", async () => {
    const createdCar = await request
      .post("/cars")
      .send(car)
      .expect(201)
      .then((response) => response.body);

    await request
      .get(`/cars/${createdCar.id}`)
      .expect(200);
  });
});
