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


Route::group(["prefix" => "v0.1"], function () {

    Route::controller(UserController::class)->group(function () {
        Route::post('user', 'addUser')->middleware(AdminAuth::class);
        Route::post('login', 'login');
        Route::get('refresh', 'refresh');
        Route::get('students', 'getStudents')->middleware(InstructorAuth::class);
        Route::get('instructors', 'getInstructors')->middleware(AdminAuth::class);
    });

    Route::controller(CourseController::class)->group(function () {
        Route::get('courses', 'getCourses')->middleware(StudentAuth::class);
        Route::post('course', 'addCourse')->middleware(InstructorAuth::class);
    });

    Route::controller(AssignementController::class)->group(function () {
        Route::middleware(StudentAuth::class)->group(function () {
            Route::get('assignement', 'getAssignements');
            Route::post('assignement', 'addAssignement');
        });
    });

    Route::controller(AnnouncementController::class)->group(function () {
        Route::get('announcement', 'getAnnouncements')->middleware(StudentAuth::class);
        Route::post('announcement', 'addAnnouncement')->middleware(InstructorAuth::class);
    });

    Route::controller(StudentClassController::class)->group(function () {
        Route::get('studentsclass/{id?}', 'getStudentsClass')->middleware(StudentAuth::class);
        Route::post('studentsclass', 'addStudentsClass')->middleware(InstructorAuth::class);;
    });
});
