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
        Schema::create('avenant', function (Blueprint $table) {
            $table->id();
            $table->Date('avenant_date');
            $table->text('avenant_details');
            $table->decimal('avenant_price', 10, 2);
            $table->unsignedBigInteger('location_id');
            $table->foreign('location_id')->references('id')->on('location')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avenant');
    }
};
