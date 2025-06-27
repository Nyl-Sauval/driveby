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
            $table->string('withdrawal_status_car', 50);
            $table->decimal('withdrawal_mileage', 15, 3);
            $table->string('withdrawal_default', 500)->nullable();

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
        Schema::dropIfExists('retrait');
    }
};
