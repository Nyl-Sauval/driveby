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
        Schema::create('car', function (Blueprint $table) {
            $table->id();
            $table->string('car_brand');
            $table->string('car_registration')->unique();
            $table->string('car_model');
            $table->enum('fuel', ['ELECTRIQUE', 'ESSENCE', 'GAZOLE']);
            $table->decimal('car_mileage', 5, 2);
            $table->string('picture')->nullable();
            $table->string('car_default')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car');
    }
};
