<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GuaranteeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $guarantees = [
            [
                'guarantee_name' => 'Protection Standard',
                'guarantee_description' => 'Couvre les dommages mineurs et le vol partiel avec une franchise réduite.',
                'guarantee_price' => 9.90,
            ],
            [
                'guarantee_name' => 'Protection Totale',
                'guarantee_description' => 'Suppression totale de franchise en cas de vol ou accident, assistance étendue incluse.',
                'guarantee_price' => 19.90,
            ],
            [
                'guarantee_name' => 'Assurance Jeune Conducteur',
                'guarantee_description' => 'Couverture complémentaire obligatoire pour les conducteurs de moins de 25 ans.',
                'guarantee_price' => 14.50,
            ],
        ];
        DB::table('garanties')->insert($guarantees);
    }
}
