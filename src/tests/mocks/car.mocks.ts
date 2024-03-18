export const car = {
  name: "Toyota Corolla",
  description: "A reliable car for daily use",
  brand: "Toyota",
  year: 2020,
  km: 50000,
};

export const invalidDataCar = {
  name: 123,
  description: 123,
  brand: 123,
  year: "2020",
  km: "50000",
};

export const updateCar = {
  name: "Updated Toyota Corolla",
  description: "An updated description",
  brand: "Toyota",
  year: 2021,
  km: 60000,
};

export const invalidDataUpdateCar = {
  name: 123,
  description: 123,
  brand: 123,
  year: "2021",
  km: "60000",
};

export const non_existent_id = 'da12c908-468e-4f84-931e-0fff92660429';

export const getCarList = async () => {
  return [
    {
      name: "Toyota Corolla",
      description: "A reliable car for daily use",
      brand: "Toyota",
      year: 2020,
      km: 50000,
    },
    {
      name: "Honda Civic",
      description: "Another reliable car",
      brand: "Honda",
      year: 2019,
      km: 40000,
    },
  ];
};
