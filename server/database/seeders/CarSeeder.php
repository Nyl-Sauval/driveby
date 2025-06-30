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
                'car_picture' => 'https://mondaycar.com/wp-content/uploads/2022/12/renault-clio-v-1.webp',
                'car_model' => 'Clio V',
                'car_fuel' => 'ESSENCE',
                'car_mileage' => 25300.000,
                'car_brand' => 'Renault',
                'car_default' => 'Rayure sur l’aile arrière gauche.',
                'car_price' => 32.90,
                'car_disponibility' => 'Disponible',
                'agency_id' => 1, // CityDrive Lille
            ],
            [
                'car_registration' => 'EF-456-GH',
                'car_picture' => 'https://mfautosud.fr/images/1710449261_R__13_-removebg-preview.png',
                'car_model' => '208',
                'car_fuel' => 'ESSENCE',
                'car_mileage' => 19450.000,
                'car_brand' => 'Peugeot',
                'car_default' => '',
                'car_price' => 34.50,
                'car_disponibility' => 'Disponible',
                'agency_id' => 2, // AutoLoc Marseille Prado
            ],
            [
                'car_registration' => 'IJ-789-KL',
                'car_picture' => 'https://s3.caroom.fr/cache/miniatures_600x350/modeles/volkswagen-golf-7-1677494608.png',
                'car_model' => 'Golf 7',
                'car_fuel' => 'GAZOLE',
                'car_mileage' => 67400.000,
                'car_brand' => 'Volkswagen',
                'car_default' => '',
                'car_price' => 41.00,
                'car_disponibility' => 'Disponible',
                'agency_id' => 3, // EasyCar Bordeaux Gare
            ],
            [
                'car_registration' => 'MN-321-OP',
                'car_picture' => 'https://adhgfzvyfq.cloudimg.io/v7/https://id-cs.com/media/car_images/car_901/Model_3_Pearl_White_Multi-Coat.png?force_format=webp',
                'car_model' => 'Model 3',
                'car_fuel' => 'ELECTRIQUE',
                'car_mileage' => 12100.000,
                'car_brand' => 'Tesla',
                'car_default' => 'Éraflure pare-choc avant.',
                'car_price' => 65.00,
                'car_disponibility' => 'Disponible',
                'agency_id' => 4, // NordLoc Roubaix
            ],
            [
                'car_registration' => 'QR-654-ST',
                'car_picture' => 'https://www.kitutilitaire.com/assets_client/global/vehicule/Renault-600x400-/KANGOO%20III%20-%202021.png',
                'car_model' => 'Kangoo',
                'car_fuel' => 'GAZOLE',
                'car_mileage' => 81000.000,
                'car_brand' => 'Renault',
                'car_default' => '',
                'car_price' => 37.80,
                'car_disponibility' => 'Disponible',
                'agency_id' => 5, // SudAuto Nice Aéroport
            ],
            [
                'car_registration' => 'UV-987-WX',
                'car_picture' => 'https://www.fiat.fr/content/dam/fiat2023/cross/models/new-500/la-prima/la-prima/my25/mobile.png',
                'car_model' => '500e',
                'car_fuel' => 'ELECTRIQUE',
                'car_mileage' => 6700.000,
                'car_brand' => 'Fiat',
                'car_default' => '',
                'car_price' => 39.90,
                'car_disponibility' => 'Disponible',
                'agency_id' => 1,
            ],
            [
                'car_registration' => 'YZ-159-AB',
                'car_picture' => 'https://www.webuzzauto.fr/wp-content/uploads/2017/10/0mm00npy_003.227399.png',
                'car_model' => 'C4 Picasso',
                'car_fuel' => 'GAZOLE',
                'car_mileage' => 93400.000,
                'car_brand' => 'Citroën',
                'car_default' => 'Siège conducteur légèrement taché.',
                'car_price' => 44.90,
                'car_disponibility' => 'Disponible',
                'agency_id' => 2,
            ],
            [
                'car_registration' => 'CD-753-EF',
                'car_picture' => 'https://www-europe.nissan-cdn.net/content/dam/Nissan/nissan_europe/Configurator/Qashqai-my24/configurator-webp/QQMC-ICE-N-Connecta.png.webp',
                'car_model' => 'Qashqai',
                'car_fuel' => 'ESSENCE',
                'car_mileage' => 36500.000,
                'car_brand' => 'Nissan',
                'car_default' => '',
                'car_price' => 48.00,
                'car_disponibility' => 'Disponible',
                'agency_id' => 3,
            ],
            [
                'car_registration' => 'GH-852-IJ',
                'car_picture' => 'https://purepng.com/public/uploads/large/purepng.com-audi-a4-caraudicars-961524670575xcrug.png',
                'car_model' => 'A4',
                'car_fuel' => 'ESSENCE',
                'car_mileage' => 52300.000,
                'car_brand' => 'Audi',
                'car_default' => '',
                'car_price' => 59.00,
                'car_disponibility' => 'Disponible',
                'agency_id' => 4,
            ],
            [
                'car_registration' => 'KL-147-MN',
                'car_picture' => 'https://bokacarrental.com/wp-content/uploads/2023/08/Renault-Grand-Scenic.png',
                'car_model' => 'Scénic',
                'car_fuel' => 'GAZOLE',
                'car_mileage' => 78400.000,
                'car_brand' => 'Renault',
                'car_default' => 'Accroc sur le pare-choc arrière.',
                'car_price' => 42.50,
                'car_disponibility' => 'Disponible',
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
