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
        Avenant::factory()->count(10)->create();
    }
}
