import { expect } from "vitest";

export interface ICar {
  id?: number;
  name: string;
  description: string;
  brand: string;
  year: number;
  km: number;
}

export const carDefaultExpects = (car: ICar) => {
  expect(car).toBeDefined();
  expect(car).toBeTypeOf("object");

  expect(car.name).toBeDefined();
  expect(car.name).toBeTypeOf("string");

  expect(car.description).toBeDefined();
  expect(car.description).toBeTypeOf("string");

  expect(car.brand).toBeDefined();
  expect(car.brand).toBeTypeOf("string");

  expect(car.year).toBeDefined();
  expect(car.year).toBeTypeOf("number");

  expect(car.km).toBeDefined();
  expect(car.km).toBeTypeOf("number");
};
