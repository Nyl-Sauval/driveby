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
        Retour::factory()->create([
            'return_date' => '2025-06-21',
            'return_interior_status_car' => 'Mauvais',
            'return_exterior_status_car' => 'Bon',
            'return_fuel_level' => 50,
            'return_mileage' => '155060.417',
            'return_default' => 'Nesciunt quia dolores sunt est dignissimos porro accusamus officiis.',
            'return_done' => false,
            'user_id' => 13,
            'location_id' => 12
        ]);
    }
}
