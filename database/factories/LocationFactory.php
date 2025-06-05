<?php


namespace Database\Factories;

use App\Models\Location;
use App\Models\Car;
use App\Models\Client;
use App\Models\Guarantee;
use Illuminate\Database\Eloquent\Factories\Factory;


class LocationFactory extends Factory
{
    protected $model = Location::class;

    public function definition(): array
    {
        return [
            'guarantee_id' => $this->faker->numberBetween(1, 3),
            'car_id' =>  $this->faker->numberBetween(1, 10),
            'client_id' => Client::factory(),
        ];
    }
}
