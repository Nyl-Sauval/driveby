<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Location;

class RetourFactory extends Factory
{
    protected $model = \App\Models\Retour::class;

    public function definition()
    {
        return [
            'return_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'return_interior_status_car' => $this->faker->randomElement(['Très bon', 'Bon', 'Moyen', 'Mauvais']),
            'return_exterior_status_car' => $this->faker->randomElement(['Très bon', 'Bon', 'Moyen', 'Mauvais']),
            'return_mileage' => $this->faker->randomFloat(3, 0, 200000), // entre 0 et 200000 km avec 3 décimales
            'return_default' => $this->faker->optional()->sentence(),
            'return_fuel_level' => $this->faker->numberBetween(0, 100),
            'return_done' => false,
            'user_id' => User::factory(),
            'location_id' => Location::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
