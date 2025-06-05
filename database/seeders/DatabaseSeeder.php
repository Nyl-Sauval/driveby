<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(CategorySeeder::class);
        $this->call(AgencySeeder::class);
        $this->call(CarSeeder::class);
        $this->call(OptionSeeder::class);
        $this->call(GuaranteeSeeder::class);
    }
}
