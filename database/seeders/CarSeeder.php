<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cars = [
            [
                'car_registration' => 'AB-123-CD',
                'car_picture' => 'cars/clio_v.jpg',
                'car_model' => 'Clio V',
                'car_fuel' => 'ESSENCE',
                'car_mileage' => 25300.000,
                'car_brand' => 'Renault',
                'car_default' => 'Rayure sur l’aile arrière gauche.',
                'car_price' => 32.90,
                'agency_id' => 1, // CityDrive Lille
            ],
            [
                'car_registration' => 'EF-456-GH',
                'car_picture' => 'cars/208_peugeot.jpg',
                'car_model' => '208',
                'car_fuel' => 'ESSENCE',
                'car_mileage' => 19450.000,
                'car_brand' => 'Peugeot',
                'car_default' => '',
                'car_price' => 34.50,
                'agency_id' => 2, // AutoLoc Marseille Prado
            ],
            [
                'car_registration' => 'IJ-789-KL',
                'car_picture' => 'cars/golf7.jpg',
                'car_model' => 'Golf 7',
                'car_fuel' => 'GAZOLE',
                'car_mileage' => 67400.000,
                'car_brand' => 'Volkswagen',
                'car_default' => '',
                'car_price' => 41.00,
                'agency_id' => 3, // EasyCar Bordeaux Gare
            ],
            [
                'car_registration' => 'MN-321-OP',
                'car_picture' => 'cars/model3.jpg',
                'car_model' => 'Model 3',
                'car_fuel' => 'ELECTRIQUE',
                'car_mileage' => 12100.000,
                'car_brand' => 'Tesla',
                'car_default' => 'Éraflure pare-choc avant.',
                'car_price' => 65.00,
                'agency_id' => 4, // NordLoc Roubaix
            ],
            [
                'car_registration' => 'QR-654-ST',
                'car_picture' => 'cars/kangoo.jpg',
                'car_model' => 'Kangoo',
                'car_fuel' => 'GAZOLE',
                'car_mileage' => 81000.000,
                'car_brand' => 'Renault',
                'car_default' => '',
                'car_price' => 37.80,
                'agency_id' => 5, // SudAuto Nice Aéroport
            ],
            [
                'car_registration' => 'UV-987-WX',
                'car_picture' => 'cars/500e.jpg',
                'car_model' => '500e',
                'car_fuel' => 'ELECTRIQUE',
                'car_mileage' => 6700.000,
                'car_brand' => 'Fiat',
                'car_default' => '',
                'car_price' => 39.90,
                'agency_id' => 1,
            ],
            [
                'car_registration' => 'YZ-159-AB',
                'car_picture' => 'cars/c4_picasso.jpg',
                'car_model' => 'C4 Picasso',
                'car_fuel' => 'GAZOLE',
                'car_mileage' => 93400.000,
                'car_brand' => 'Citroën',
                'car_default' => 'Siège conducteur légèrement taché.',
                'car_price' => 44.90,
                'agency_id' => 2,
            ],
            [
                'car_registration' => 'CD-753-EF',
                'car_picture' => 'cars/qashqai.jpg',
                'car_model' => 'Qashqai',
                'car_fuel' => 'ESSENCE',
                'car_mileage' => 36500.000,
                'car_brand' => 'Nissan',
                'car_default' => '',
                'car_price' => 48.00,
                'agency_id' => 3,
            ],
            [
                'car_registration' => 'GH-852-IJ',
                'car_picture' => 'cars/audi_a4.jpg',
                'car_model' => 'A4',
                'car_fuel' => 'ESSENCE',
                'car_mileage' => 52300.000,
                'car_brand' => 'Audi',
                'car_default' => '',
                'car_price' => 59.00,
                'agency_id' => 4,
            ],
            [
                'car_registration' => 'KL-147-MN',
                'car_picture' => 'cars/scenic.jpg',
                'car_model' => 'Scénic',
                'car_fuel' => 'GAZOLE',
                'car_mileage' => 78400.000,
                'car_brand' => 'Renault',
                'car_default' => 'Accroc sur le pare-choc arrière.',
                'car_price' => 42.50,
                'agency_id' => 5,
            ],
        ];

        DB::table('car')->insert($cars);

        $carCategories = [
            ['car_id' => 1, 'category_id' => 1],
            ['car_id' => 1, 'category_id' => 2],
            ['car_id' => 2, 'category_id' => 1],
            ['car_id' => 2, 'category_id' => 2],
            ['car_id' => 3, 'category_id' => 1],
            ['car_id' => 4, 'category_id' => 7],
            ['car_id' => 4, 'category_id' => 5],
            ['car_id' => 4, 'category_id' => 8],
            ['car_id' => 4, 'category_id' => 3],
            ['car_id' => 5, 'category_id' => 10],
            ['car_id' => 6, 'category_id' => 1],
            ['car_id' => 6, 'category_id' => 2],
            ['car_id' => 6, 'category_id' => 7],
            ['car_id' => 7, 'category_id' => 6],
            ['car_id' => 8, 'category_id' => 9],
            ['car_id' => 8, 'category_id' => 4],
            ['car_id' => 9, 'category_id' => 4],
            ['car_id' => 9, 'category_id' => 3],
            ['car_id' => 10, 'category_id' => 6],
        ];

        DB::table('car_category')->insert($carCategories);
    }
}
