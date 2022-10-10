<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\User;

class CourseController extends Controller
{
    public function getCourses()
    {
        $result = Course::get();

        if (Count($result)) {
            return response()->json(["courses" => $result, "jwt" => $this->refresh(), "success" => true], 200);
        } else {
            return response()->json(["Error" => "Something went wrong."], 400);
        }
    }
    
    public function addCourse(Request $request)
    {
        $courseExist = Course::where('course', $request->course)->first();

        if ($courseExist) {
            return response()->json(["course" => "Already Taken"], 400);
        }
        $instructorExist = User::where([['_id', $request->id], ['role', '2']])
            ->get();

        if (!count($instructorExist)) {
            return response()->json(["instructor" => 'Not found'], 400);
        }

        $course = new Course;

        $course->course = $request->course;
        $course->instructor_id = $request->id;

        $course->save();

        return response()->json(["id" => $course->id, "jwt" => $this->refresh(), "success" => true], 200);
    }
}
