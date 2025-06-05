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
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('car_brand');
            $table->string('car_registration')->unique();
            $table->string('car_model');
            $table->enum('fuel', ['ELECTRIQUE', 'ESSENCE', 'GAZOLE']);
            $table->decimal('car_mileage', 10, 3);
            $table->string('picture')->nullable();
            $table->boolean('car_default')->nullable();
            $table->decimal('car_price', 8, 2);
            $table->unsignedBigInteger('agency_id');
            $table->foreign('agency_id')->references('id')->on('agency')->onDelete('cascade');
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
