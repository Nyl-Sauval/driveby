<?php

namespace Database\Seeders;

use App\Models\Avenant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AvenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Avenant::create([
            'avenant_date' => '2025-07-01',
            'avenant_details' => 'Extension de la durée de location',
            'avenant_price' => 100.00,
            'location_id' => 5,
        ]);

        Avenant::create([
            'avenant_date' => '2025-07-02',
            'avenant_details' => 'Ajout d\'une assurance supplémentaire',
            'avenant_price' => 150.00,
            'location_id' => 6,
        ]);
    }
}
