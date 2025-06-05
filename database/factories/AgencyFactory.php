<?php

namespace Database\Factories;

use App\Models\Agency;
use Illuminate\Database\Eloquent\Factories\Factory;


class AgencyFactory extends Factory
{
    protected $model = Agency::class;

    public function definition(): array
    {
        return [
            'agency_name' => fake()->company(),
            'agency_description' => fake()->sentence(),
            'agency_address' => fake()->streetAddress(),
            'agency_postal_code' => fake()->postcode(),
            'agency_city' => fake()->city(),
            'agency_schedules' => fake()->optional()->sentence(),
            'agency_email' => fake()->unique()->companyEmail(),
            'agency_phone' => fake()->phoneNumber(),
            'agency_website' => fake()->optional()->url(),
        ];
    }
}
