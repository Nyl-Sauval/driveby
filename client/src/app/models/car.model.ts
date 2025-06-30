export interface Car {
  id: number;
  car_brand: string;
  car_registration: string;
  car_model: string;
  car_fuel: string;
  car_mileage: number;
  car_picture: string;
  car_default: string;
  price: number;
  agency_id: number;
}

export interface CarResponse {
  data: Car[];
}
