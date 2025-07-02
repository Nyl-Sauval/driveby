<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 15; $i++) {
            Location::create([
                'guarantee_id' => rand(1, 3),
                'car_id' => rand(1, 10),
                'client_id' => rand(1, 10),
            ]);
        }

        // 4 locations avec client_id fixe à 11 pour le client test
        for ($i = 1; $i <= 4; $i++) {
            Location::create([
                'guarantee_id' => rand(1, 3),
                'car_id' => rand(1, 10),
                'client_id' => 11,
            ]);
        }
    }
}
