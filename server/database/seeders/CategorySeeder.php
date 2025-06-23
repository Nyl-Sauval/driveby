<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'category_name' => 'Économique',
                'category_description' => 'Voiture pratique et peu coûteuse, idéale pour les petits budgets.',
            ],
            [
                'category_name' => 'Citadine',
                'category_description' => 'Compacte et agile, parfaite pour circuler et se garer en ville.',
            ],
            [
                'category_name' => 'Affaire',
                'category_description' => 'Véhicule fiable et fonctionnel, adapté aux déplacements professionnels.',
            ],
            [
                'category_name' => 'Confort',
                'category_description' => 'Modèle spacieux avec équipements améliorant l’agrément de conduite.',
            ],
            [
                'category_name' => 'Berline',
                'category_description' => 'Voiture élégante et stable, idéale pour les trajets longue distance.',
            ],
            [
                'category_name' => 'Multispace',
                'category_description' => 'Véhicule modulable offrant un grand espace pour passagers et bagages.',
            ],
            [
                'category_name' => 'Électrique',
                'category_description' => 'Voiture propre et silencieuse, fonctionnant sans carburant fossile.',
            ],
            [
                'category_name' => 'Luxe',
                'category_description' => 'Modèle haut de gamme avec finitions premium et technologies avancées.',
            ],
            [
                'category_name' => 'SUV',
                'category_description' => 'Véhicule polyvalent à haute garde au sol, adapté à tous types de routes.',
            ],
            [
                'category_name' => 'Utilitaire',
                'category_description' => 'Véhicule robuste conçu pour le transport de marchandises ou d’équipements.',
            ]
        ];

        DB::table('category')->insert($categories);
    }
}
