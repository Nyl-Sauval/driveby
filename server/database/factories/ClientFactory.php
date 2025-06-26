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
            'client_birth' => $this->faker->dateTimeBetween('-70 years', '-18 years'),
            'client_address' => $this->faker->word(),
            'client_postal_code' => $this->faker->postcode(),
            'client_country' => $this->faker->country(),
            'client_city' => $this->faker->city(),
            'client_license_number' => $this->faker->word(),
            'client_license_issue_date' => $this->faker->dateTimeBetween('-70 years', '-18 years'),
            'client_license_expiry_date' => $this->faker->dateTimeBetween('now', '+10 years'),
            'client_license_country' => $this->faker->country(),
        ];

    }
}
