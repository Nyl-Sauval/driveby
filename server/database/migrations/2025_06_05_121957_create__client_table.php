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
        Schema::create('client', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->string('client_firstname');
            $table->string('client_email');
            $table->string('client_phone');
            $table->dateTime('client_birth');
            $table->string('client_address')->nullable();
            $table->string('client_postal_code')->nullable();
            $table->string('client_country')->nullable();
            $table->string('client_city')->nullable();
            $table->string('client_license_number')->nullable();
            $table->dateTime('client_license_issue_date')->nullable();
            $table->dateTime('client_license_expiry_date')->nullable();
            $table->string('client_license_country')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client');
    }
};
