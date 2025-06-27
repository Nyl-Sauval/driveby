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
            $table->String('return_status_car',50);
            $table->decimal('return_mileage',15,3);
            $table->string('return_default',500)->nullable();

            $table->foreignId('user_id')->constrained('user')->onDelete('cascade');
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
