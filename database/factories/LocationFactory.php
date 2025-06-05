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
            'guarantee_id' => Guarantee::factory(),
            'car_id' => Car::factory(),
            'client_id' => Client::factory(),
        ];
    }
}
