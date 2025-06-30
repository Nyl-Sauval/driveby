<?php

namespace Database\Factories;

use App\Models\Retrait;
use App\Models\User;
use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

class RetraitFactory extends Factory
{
    protected $model = Retrait::class;

    public function definition(): array
    {
        return [
            'withdrawal_date' => $this->faker->date(),
            'withdrawal_interior_status_car' => $this->faker->randomElement(['Très bon', 'Bon', 'Moyen', 'Mauvais']),
            'withdrawal_exterior_status_car' => $this->faker->randomElement(['Très bon', 'Bon', 'Moyen', 'Mauvais']),
            'withdrawal_mileage' => $this->faker->randomFloat(3, 0, 300000),
            'withdrawal_default' => $this->faker->optional()->sentence(),
            'withdrawal_fuel_level' => $this->faker->numberBetween(0, 100),
            'withdrawal_done' => false,
            'user_id' => User::factory(),
            'location_id' => Location::factory(),
        ];
    }
}
