<?php

namespace Database\Seeders;

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
        $this->call(ClientSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(OptionSeeder::class);
        $this->call(GuaranteeSeeder::class);
        $this->call(DocumentSeeder::class);
        $this->call(LocationSeeder::class);
        $this->call(AvenantSeeder::class);
        $this->call(RetraitSeeder::class);
        $this->call(RetourSeeder::class);
    }
}
