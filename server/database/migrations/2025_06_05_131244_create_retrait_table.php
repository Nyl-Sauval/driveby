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
        Schema::create('retrait', function (Blueprint $table) {
            $table->id('withdrawal_id');
            $table->date('withdrawal_date');
            $table->decimal('withdrawal_mileage', 15, 3);
            $table->string('withdrawal_default', 500)->nullable();
            $table->unsignedTinyInteger('withdrawal_fuel_level')->default(0)->comment('Range: 0-100')->nullable();
            $table->string('withdrawal_interior_status_car')->default(collect(['Très bon', 'Bon', 'Moyen', 'Mauvais'])->random())->nullable();
            $table->string('withdrawal_exterior_status_car')->default(collect(['Très bon', 'Bon', 'Moyen', 'Mauvais'])->random())->nullable();
            $table->boolean('withdrawal_done')->default(false);
            $table->foreignId('user_id')->constrained('user')->onDelete('cascade')->nullable();
            $table->foreignId('location_id')->constrained('location')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('retrait');
    }
};
