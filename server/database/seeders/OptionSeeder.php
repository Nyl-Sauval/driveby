<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $options = [
            [
                'option_name' => 'GPS intégré',
                'option_price' => 4.90,
                'option_description' => 'Système de navigation embarqué pour faciliter vos trajets.',
            ],
            [
                'option_name' => 'Siège bébé',
                'option_price' => 6.00,
                'option_description' => 'Siège homologué pour enfants de 9 à 18 kg.',
            ],
            [
                'option_name' => 'Conducteur additionnel',
                'option_price' => 7.50,
                'option_description' => 'Permet à une autre personne de conduire le véhicule en toute légalité.',
            ],
            [
                'option_name' => 'Pneu neige / chaînes',
                'option_price' => 5.00,
                'option_description' => 'Équipement hivernal pour rouler en toute sécurité sur routes enneigées.',
            ],
            [
                'option_name' => 'Connexion Wi-Fi embarquée',
                'option_price' => 3.50,
                'option_description' => 'Accès internet sans fil pour tous les passagers pendant le trajet.',
            ],
        ];
        DB::table('options')->insert($options);
    }
}
