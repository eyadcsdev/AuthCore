<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->string('status')->default('active')->after('remember_token');
            $table->string('requested_role')->nullable()->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['status', 'requested_role']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['student', 'teacher', 'department_head', 'admin'])->default('student');
        });
    }
};
