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
            ]
        ];

        foreach ($retours as $retour) {
            Retour::create($retour);
        }
    }
}
