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

        // Créer un utilisateur spécifique
        User::factory()->create([
            'email' => 'test@example.com',
            'role' => 'admin',
            'password' => bcrypt('password'),
            'client_id' => 5,
        ]);

        // Créer un utilisateur agent
        User::factory()->create([
            'email' => 'agent@example.com',
            'role' => 'agent',
            'password' => bcrypt('password')
        ]);
    }
}
