<?php

namespace Database\Factories;

use App\Enums\Carburant;
use App\Enums\Disponibility;
use App\Models\Car;
use App\Models\Agency;
use Illuminate\Database\Eloquent\Factories\Factory;

class CarFactory extends Factory
{
    protected $model = Car::class;

    public function definition(): array
    {
        return [
            'car_brand' => fake()->company(),
            'car_registration' => strtoupper(fake()->bothify('??-####-??')),
            'car_model' => fake()->word(),
            'car_fuel' => fake()->randomElement([Carburant::ELECTRIQUE->value, Carburant::ESSENCE->value, Carburant::GAZOLE]),
            'car_mileage' => fake()->numberBetween(0, 200000),
            'car_picture' => fake()->imageUrl(640, 480, 'transport'),
            'car_default' => fake()->boolean(),
            'car_price' => fake()->randomFloat(2, 5000, 50000),
            'car_disponibility' => fake()->randomElement([Disponibility::DISPONIBLE->value, Disponibility::INDISPONIBLE->value, Disponibility::EN_MAINTENANCE->value, Disponibility::EN_REPARATION->value]),
            'agency_id' => fake()->numberBetween(1, 10)
        ];
    }
}
