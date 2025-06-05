<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client_name' => $this->faker->word(),
            'client_firstname' => $this->faker->word(),
            'client_email' => $this->faker->email(),
            'client_phone' => $this->faker->word(),
            'dateSortie' => $this->faker->dateTimeBetween('-10 years', 'now'),
        ];

    }
}
