<?php

namespace Database\Seeders;

use App\Models\Retrait;
use Illuminate\Database\Seeder;

class RetraitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Retrait::factory()->count(2)->create();
    }
}
