<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\User;
use App\Models\StudentClass;

class CourseController extends Controller
{
    public function getCourses()
    {
        if ($this->me()['role'] === '2') {

            $courses = Course::where('instructor_id', $this->me()['id'])->get();

            if (Count($courses)) {
                return response()->json(["assignements" => $courses, "jwt" => $this->refresh(), "success" => true], 200);
            } else {
                return response()->json(["Error" => "Something went wrong."], 400);
            }
        } else {
            $students = StudentClass::where('student_id', $this->me()['id'])->groupby('course_id')->get();
            $result = [];
            foreach ($students as $student) {
                $result[] = Course::where('_id', $student->course_id)->get();
            }
            if (Count($result)) {
                return response()->json(["assignements" => $result, "jwt" => $this->refresh(), "success" => true], 200);
            } else {
                return response()->json(["Error" => "Something went wrong."], 400);
            }
        }
    }

    public function addCourse(Request $request)
    {
        $courseExist = Course::where('course', $request->course)->first();

        if ($courseExist) {
            return response()->json(["course" => "Already Taken"], 400);
        }
        $instructorExist = User::where([['_id', $request->id], ['role', '2']])->first();

        if ($instructorExist) {
            return response()->json(["instructor" => 'Not found'], 400);
        }

        $course = new Course;

        $course->course = $request->course;
        $course->instructor_id = $request->id || $this->me()['id'];

        $course->save();

        return response()->json(["id" => $course->id, "jwt" => $this->refresh(), "success" => true], 200);
    }
}
