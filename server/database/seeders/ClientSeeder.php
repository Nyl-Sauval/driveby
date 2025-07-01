<?php

namespace Database\Seeders;

use App\Models\Client;
use Database\Factories\ClientFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Client::factory()->count(10)->create();

        Client::factory()->create([
            'client_name' => 'Dupont',
            'client_firstname' => 'Jean',
            'client_email' => 'client@example.com',
            'client_phone' => '0123456789',
            'client_birth' => '1980-05-15',
            'client_address' => '10 rue de la Paix',
            'client_postal_code' => '75000',
            'client_country' => 'France',
            'client_city' => 'Paris',
            'client_license_number' => 'AB1234567',
            'client_license_issue_date' => '2015-06-01',
            'client_license_expiry_date' => '2025-06-01',
            'client_license_country' => 'France',
        ]);
    }
}
