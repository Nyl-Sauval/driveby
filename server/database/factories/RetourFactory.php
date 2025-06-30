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
            'return_date' => $this->faker->date(),
            'return_status_car' => $this->faker->randomElement(['available', 'maintenance', 'damaged']),
            'return_mileage' => $this->faker->randomFloat(3, 0, 200000), // entre 0 et 200000 km avec 3 décimales
            'return_default' => $this->faker->optional()->sentence(),
            'user_id' => User::factory(),
            'location_id' => Location::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
