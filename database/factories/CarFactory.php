<?php

namespace Database\Factories;

use App\Enums\Carburant;
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
            'fuel' => fake()->randomElement([Carburant::ELECTRIQUE->value, Carburant::ESSENCE->value, Carburant::GAZOLE]),
            'car_mileage' => fake()->numberBetween(0, 200000),
            'picture' => fake()->imageUrl(640, 480, 'transport'),
            'car_default' => fake()->boolean(),
            'car_price' => fake()->randomFloat(2, 5000, 50000),
            'agency_id' => fake()->numberBetween(1, 10)
        ];
    }
}
