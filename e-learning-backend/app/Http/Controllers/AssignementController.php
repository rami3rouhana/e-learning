<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\StudentClass;
use App\Models\Assignement;

class AssignementController extends Controller
{
    public function getAssignements()
    {
        if ($this->me()['role'] === '2') {
            $courses = Course::where('instructor_id', $this->me()['id'])->get();
            $result = [];
            foreach ($courses as $course) {
                $result = Assignement::where('course_id', $course->id)->get();
            }
            if (Count($result)) {
                return response()->json(["assignements" => $result, "jwt" => $this->refresh(), "success" => true], 200);
            } else {
                return response()->json(["Error" => "Something went wrong."], 400);
            }
        } else {
            $students = StudentClass::where('student_id', $this->me()['id'])->groupby('course_id')->get();
            $result = [];
            foreach ($students as $student) {
                $result[] = Assignement::where('course_id', $student->course_id)->get();
            }
            if (Count($result)) {
                return response()->json(["assignements" => $result, "jwt" => $this->refresh(), "success" => true], 200);
            } else {
                return response()->json(["Error" => "Something went wrong."], 400);
            }
        }
    }

    public function addAssignement(Request $request)
    {
        $assignementExist = Assignement::where('assignement', $request->assignement)->first();

        
        if ($this->me()['role'] === '3') {
            if (!$assignementExist){
                return response()->json(["assignement" => "Doesn't Exist."], 400);
            }
            $assignement = StudentClass::where([['student_id', $this->me()['id']],['course_id',$assignementExist->course_id]])->first();
            
            if($assignement){
                $assignement->assignement = $request->file;
                $assignement->save();
            } else {
                $assignement = new StudentClass;
                $assignement->assignement_id = $assignementExist->id;
                $assignement->course_id = $assignementExist->course_id;
                $assignement->student_id = $this->me()['id'];
                $assignement->assignement = $request->file;
                $assignement->save();
            }
            
            return response()->json(["id" => $assignement->_id], 200);
        }

        
        if ($assignementExist) {
            return response()->json(["assignement" => "Already Taken"], 400);
        }

        $courseExist = Course::where('_id', $request->id)->get();

        if (!count($courseExist)) {
            return response()->json(["course" => 'Does not Exist.'], 400);
        }

        $course = new Assignement;

        $course->assignement = $request->assignement;
        $course->course_id = $request->id;
        $course->assignement_id = $request->assignement_id;

        $course->save();

        return response()->json(["id" => $course->id, "jwt" => $this->refresh(), "success" => true], 200);
    }
}
