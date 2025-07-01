<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer 10 utilisateurs aléatoires
        User::factory()->count(10)->create();

        // Créer un utilisateur client
        User::factory()->create([
            'email' => 'client@example.com',
            'role' => 'user',
            'password' => bcrypt('password'),
            'client_id' => 11,
        ]);

        // Créer un utilisateur spécifique
        User::factory()->create([
            'email' => 'test@example.com',
            'role' => 'admin',
            'password' => bcrypt('password'),
        ]);

        // Créer un utilisateur agent
        User::factory()->create([
            'email' => 'agent@example.com',
            'role' => 'agent',
            'password' => bcrypt('password')
        ]);
    }
}
