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
            'return_status_car' => 'damaged',
            'return_mileage' => '155060.417',
            'return_default' => 'Nesciunt quia dolores sunt est dignissimos porro accusamus officiis.',
            'user_id' => 13,
            'location_id' => 12
        ]);
    }
}
