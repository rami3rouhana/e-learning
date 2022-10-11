<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentClass;
use App\Models\User;
use App\Models\Course;

class StudentClassController extends Controller
{
    public function getStudentsClass($id=null)
    {
        $studentsClass = StudentClass::where('course_id', $id)->get();

        $students = [];

        foreach($studentsClass as $student){
            $students = User::where('_id', $student->student_id)->first();
        }
        if ($students) {
            return response()->json(["students" => $students, "jwt" => $this->refresh(), "success" => true], 200);
        } else {
            return response()->json(["Error" => "Something went wrong."], 400);
        }
    }

    public function addStudentsClass(Request $request)
    {
        $student_id = User::where([['_id', $request->student_id], ['role', '3']])->first();
        if (!$student_id) {
            return response()->json(["student" => "Doesn't not exist."], 400);
        }
        $course_id = Course::where('_id', $request->course_id)->first();
        if (!$course_id) {
            return response()->json(["course" => "Doesn't not exist."], 400);
        }
        $studentExist = StudentClass::where([['student_id', $request->student_id],['course_id', $request->course_id],['assignement_id']])->first();
        if ($studentExist) {
            return response()->json(["student" => "Already in class."], 400);
        }
        $studentClass = new StudentClass;
        $studentClass->student_id = $request->student_id;
        $studentClass->course_id = $request->course_id;
        $studentClass->save();

        return response()->json(["id" => $studentClass->id,"jwt"=> $this->refresh(),"success" => true], 200);
    }

}
