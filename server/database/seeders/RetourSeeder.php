<?php

namespace Database\Seeders;

use App\Models\Retour;
use Illuminate\Database\Seeder;

class RetourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $retours = [
            [
                'return_date' => '2025-07-03',
                'return_interior_status_car' => 'Bon',
                'return_exterior_status_car' => 'Bon',
                'return_fuel_level' => 80,
                'return_mileage' => 167000,
                'return_default' => 'Aucune anomalie',
                'return_done' => 1,
                'user_id' => 11,
                'location_id' => 16,
            ],
            [
                'return_date' => '2025-07-05',
                'return_interior_status_car' => 'Bon',
                'return_exterior_status_car' => 'Bon',
                'return_fuel_level' => 80,
                'return_mileage' => 167000,
                'return_default' => 'Aucune anomalie',
                'return_done' => 0,
                'user_id' => 11,
                'location_id' => 17,
            ],
            [
                'return_date' => '2025-11-05',
                'return_interior_status_car' => 'Bon',
                'return_exterior_status_car' => 'Bon',
                'return_fuel_level' => 50,
                'return_mileage' => 190000,
                'return_default' => 'Aucune anomalie',
                'return_done' => 0,
                'user_id' => 11,
                'location_id' => 18,
            ],
            [
                'return_date' => '2025-10-17',
                'return_interior_status_car' => 'Bon',
                'return_exterior_status_car' => 'Bon',
                'return_fuel_level' => 60,
                'return_mileage' => 18080,
                'return_default' => 'Aucune anomalie',
                'return_done' => 0,
                'user_id' => 11,
                'location_id' => 19,
            ],
            [
                'return_date' => '2025-06-25',
                'return_interior_status_car' => 'Mauvais',
                'return_exterior_status_car' => 'Bon',
                'return_fuel_level' => 60,
                'return_mileage' => 150000,
                'return_default' => 'Petite rayure latérale',
                'return_done' => 1,
                'user_id' => 7,
                'location_id' => 5,
            ],
            [
                'return_date' => '2025-06-26',
                'return_interior_status_car' => 'Bon',
                'return_exterior_status_car' => 'Mauvais',
                'return_fuel_level' => 70,
                'return_mileage' => 155000,
                'return_default' => 'Pare-chocs avant endommagé',
                'return_done' => 1,
                'user_id' => 8,
                'location_id' => 6,
            ],
            [
                'return_date' => '2025-08-24',
                'return_mileage' => 185000,
                'return_fuel_level' => 20,
                'return_interior_status_car' => 'Bon',
                'return_exterior_status_car' => 'Bon',
                'return_done' => 0,
                'user_id' => 9,
                'location_id' => 4,
            ],
            [
                'return_date' => '2025-07-10',
                'return_mileage' => 166990,
                'return_fuel_level' => 75,
                'return_interior_status_car' => 'Bon',
                'return_exterior_status_car' => 'Bon',
                'return_done' => 0,
                'user_id' => 10,
                'location_id' => 7,
            ],
        ];

        foreach ($retours as $retour) {
            Retour::create($retour);
        }
    }
}
