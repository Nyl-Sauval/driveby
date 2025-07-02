<?php

namespace Database\Seeders;

use App\Models\Retrait;
use Illuminate\Database\Seeder;

class RetraitSeeder extends Seeder
{
    public function run(): void
    {

        // 2 retraits "au pif" avec withdrawal_done = 1
        Retrait::create([
            'withdrawal_date' => '2025-07-01',
            'withdrawal_mileage' => 165000,
            'withdrawal_fuel_level' => 80,
            'withdrawal_interior_status_car' => 'Bon',
            'withdrawal_exterior_status_car' => 'Bon',
            'withdrawal_done' => 1,
            'user_id' => 7,
            'location_id' => 5,
        ]);

        Retrait::create([
            'withdrawal_date' => '2025-07-02',
            'withdrawal_mileage' => 166000,
            'withdrawal_fuel_level' => 75,
            'withdrawal_interior_status_car' => 'Bon',
            'withdrawal_exterior_status_car' => 'Bon',
            'withdrawal_done' => 1,
            'user_id' => 8,
            'location_id' => 6,
        ]);

        // retraits spécifiques pour le client test (user_id = 11)
        Retrait::create([
            'withdrawal_date' => '2025-07-01',
            'withdrawal_mileage' => 165000,
            'withdrawal_fuel_level' => 80,
            'withdrawal_interior_status_car' => 'Bon',
            'withdrawal_exterior_status_car' => 'Bon',
            'withdrawal_done' => 1,
            'user_id' => 11,
            'location_id' => 16,
        ]);

        Retrait::create([
            'withdrawal_date' => '2025-07-02',
            'withdrawal_mileage' => 166000,
            'withdrawal_fuel_level' => 75,
            'withdrawal_interior_status_car' => 'Bon',
            'withdrawal_exterior_status_car' => 'Bon',
            'withdrawal_done' => 1,
            'user_id' => 11,
            'location_id' => 17,
        ]);

        Retrait::create([
            'withdrawal_date' => '2025-11-02',
            'withdrawal_mileage' => 166000,
            'withdrawal_fuel_level' => 0,
            'withdrawal_interior_status_car' => 'Bon',
            'withdrawal_exterior_status_car' => 'Bon',
            'withdrawal_done' => 0,
            'user_id' => 11,
            'location_id' => 18,
        ]);

        Retrait::create([
            'withdrawal_date' => '2025-10-11',
            'withdrawal_mileage' => 10020,
            'withdrawal_fuel_level' => 0,
            'withdrawal_interior_status_car' => 'Bon',
            'withdrawal_exterior_status_car' => 'Bon',
            'withdrawal_done' => 0,
            'user_id' => 11,
            'location_id' => 19,
        ]);

        // 2 retraits "au pif" avec withdrawal_done = 0
        Retrait::create([
            'withdrawal_date' => '2025-08-16',
            'withdrawal_mileage' => 165000,
            'withdrawal_fuel_level' => 80,
            'withdrawal_interior_status_car' => 'Bon',
            'withdrawal_exterior_status_car' => 'Bon',
            'withdrawal_done' => 0,
            'user_id' => 9,
            'location_id' => 4,
        ]);

        Retrait::create([
            'withdrawal_date' => '2025-07-02',
            'withdrawal_mileage' => 166000,
            'withdrawal_fuel_level' => 75,
            'withdrawal_interior_status_car' => 'Bon',
            'withdrawal_exterior_status_car' => 'Bon',
            'withdrawal_done' => 0,
            'user_id' => 10,
            'location_id' => 7,
        ]);
    }
}
