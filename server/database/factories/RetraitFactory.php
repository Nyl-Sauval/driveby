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
            'withdrawal_status_car' => $this->faker->randomElement(['available', 'unavailable', 'maintenance']),
            'withdrawal_mileage' => $this->faker->randomFloat(3, 0, 300000),
            'withdrawal_default' => $this->faker->optional()->sentence(),
            'user_id' => User::factory(),
            'location_id' => Location::factory(),
        ];
    }
}
