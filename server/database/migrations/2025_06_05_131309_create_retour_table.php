<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('retour', function (Blueprint $table) {
            $table->id('return_id');
            $table->date('return_date');
            $table->decimal('return_mileage',15,3)->nullable();
            $table->string('return_default',500)->nullable();
            $table->unsignedTinyInteger('return_fuel_level')->default(0)->comment('Range: 0-100')->nullable();
            $table->string('return_interior_status_car')->default(collect(['Très bon', 'Bon', 'Moyen', 'Mauvais'])->random())->nullable();
            $table->string('return_exterior_status_car')->default(collect(['Très bon', 'Bon', 'Moyen', 'Mauvais'])->random())->nullable();
            $table->foreignId('user_id')->nullable()->constrained('user')->onDelete('cascade');
            $table->boolean('return_done')->default(false);
            $table->foreignId('location_id')->constrained('location')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('garanties');

    }
};
