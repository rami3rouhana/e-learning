<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\AssignementController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\StudentClassController;
use App\Http\Middleware\AdminAuth;
use App\Http\Middleware\InstructorAuth;
use App\Http\Middleware\StudentAuth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::controller(UserController::class)->group(function () {
    Route::post('addUser', 'addUser');
    Route::post('login', 'login');
    Route::get('refresh', 'refresh');
    Route::get('me', 'me');
    Route::get('getStudents', 'getStudents')->middleware(InstructorAuth::class);
    Route::get('getInstructors', 'getInstructors')->middleware(AdminAuth::class);
});

Route::controller(CourseController::class)->group(function () {
    Route::middleware(AdminAuth::class)->group(function () {
        Route::get('getCourses', 'getCourses')->middleware(StudentAuth::class);
        Route::post('addCourse', 'addCourse')->middleware(InstructorAuth::class);
    });
});

Route::controller(AssignementController::class)->group(function () {
    Route::post('getAssignements', 'getAssignements')->middleware(StudentAuth::class);
    Route::post('addAssignement', 'addAssignement')->middleware(InstructorAuth::class);
});

Route::controller(AnnouncementController::class)->group(function () {
    Route::post('getAnnouncements', 'getAnnouncements')->middleware(StudentAuth::class);
    Route::post('addAnnouncement', 'addAnnouncement')->middleware(InstructorAuth::class);
});

Route::controller(StudentClassController::class)->group(function () {
    Route::middleware(AdminAuth::class)->group(function () {
        Route::post('getStudentsClass', 'getStudentsClass');
        Route::post('addStudentsClass', 'addStudentsClass');
        Route::post('getStudentsAssignements', 'getStudentsAssignements');
    });
});
