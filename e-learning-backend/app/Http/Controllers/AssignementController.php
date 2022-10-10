<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Assignement;

class AssignementController extends Controller
{
    public function getAssignements(Request $request)
    {
        $result = Assignement::where('course_id', $request->id)->get();
        if (Count($result)) {
            return response()->json(["assignements" => $result, "jwt" => $this->refresh(), "success" => true], 200);
        } else {
            return response()->json(["Error" => "Something went wrong."], 400);
        }
    }

    public function addAssignement(Request $request)
    {
        $assignementExist = Assignement::where('assignement', $request->assignement)->first();

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

        $course->save();

        return response()->json(["id" => $course->id, "jwt" => $this->refresh(), "success" => true], 200);
    }
}
