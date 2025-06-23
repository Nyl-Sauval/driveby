<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Avenant>
 */
class AvenantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'avenant_details' => $this->faker->sentence(),
            'avenant_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'avenant_price' => $this->faker->randomFloat(2, 100, 1000),
            'location_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
