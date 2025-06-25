<?php namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AgencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $agencies = [
            [
                'agency_name' => 'Drive Lille',
                'agency_description' => 'Agence de location pratique en centre-ville, avec un large choix de véhicules.',
                'agency_address' => '12 Rue Nationale',
                'agency_postal_code' => '59800',
                'agency_city' => 'Lille',
                'agency_schedules' => 'Lun–Sam : 08h00–19h00, Dim : fermé',
                'agency_email' => 'contact@agency_citydrive-lille.fr',
                'agency_phone' => '03 20 55 66 77',
            ],
            [
                'agency_name' => 'AutoLoc Marseille Prado',
                'agency_description' => 'Location de voitures flexible, proche des plages du Prado.',
                'agency_address' => '102 Avenue du Prado',
                'agency_postal_code' => '13008',
                'agency_city' => 'Marseille',
                'agency_schedules' => 'Lun–Dim : 07h00–21h00',
                'agency_email' => 'resa@autoloc-prado.fr',
                'agency_phone' => '04 91 85 23 10',
            ],
            [
                'agency_name' => 'EasyCar Bordeaux Gare',
                'agency_description' => 'Retrait rapide à côté de la gare Bordeaux Saint-Jean',
                'agency_address' => '45 Rue Charles Domercq',
                'agency_postal_code' => '33800',
                'agency_city' => 'Bordeaux',
                'agency_schedules' => 'Lun–Ven : 07h00–20h00, Sam–Dim : 08h00–18h00',
                'agency_email' => 'support@easycar-bdx.fr',
                'agency_phone' => '05 56 88 22 33',
            ],
            [
                'agency_name' => 'NordLoc Roubaix',
                'agency_description' => 'Agence économique pour des locations de courte ou longue durée dans le Nord.',
                'agency_address' => '8 Place de la Liberté',
                'agency_postal_code' => '59100',
                'agency_city' => 'Roubaix',
                'agency_schedules' => 'Lun–Sam : 08h30–18h30, Dim : fermé',
                'agency_email' => 'contact@nordloc.fr',
                'agency_phone' => '03 62 52 45 00',
            ],
            [
                'agency_name' => 'SudAuto Nice Aéroport',
                'agency_description' => 'Location de véhicules premium ou business directement à l’aéroport de Nice.',
                'agency_address' => 'Terminal 2, Aéroport Nice Côte d’Azur',
                'agency_postal_code' => '06200',
                'agency_city' => 'Nice',
                'agency_schedules' => 'Lun–Dim : 06h00–23h00',
                'agency_email' => 'service@sudauto-nice.fr',
                'agency_phone' => '04 93 21 10 10',
            ],
        ];

        DB::table('agency')->insert($agencies);
    }
}
