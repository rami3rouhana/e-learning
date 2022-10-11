<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Announcement;
use App\Models\StudentClass;

class AnnouncementController extends Controller
{
    public function getAnnouncements()
    {
        if ($this->me()['role'] === '2') {

            $courses = Course::where('instructor_id', $this->me()['id'])->get();
            $result = [];
            foreach ($courses as $course) {
                $result = Announcement::where('course_id', $course->id)->get();
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
                $result[] = Announcement::where('course_id', $student->course_id)->get();
            }
            if (Count($result)) {
                return response()->json(["announcements" => $result, "jwt" => $this->refresh(), "success" => true], 200);
            } else {
                return response()->json(["Error" => "Something went wrong."], 400);
            }
        }
    }

    public function addAnnouncement(Request $request)
    {
        $announcementExist = Announcement::where('announcement', $request->announcement)->first();
        print_r($announcementExist);
        if ($announcementExist) {
            return response()->json(["announcement" => "Already Taken"], 400);
        }

        $courseExist = Course::where('_id', $request->id)->first();

        if (!$courseExist) {
            return response()->json(["course" => 'Does not Exist.'], 400);
        }

        $course = new Announcement;

        $course->announcement = $request->announcement;
        $course->course_id = $request->id;

        $course->save();

        return response()->json(["id" => $course->id, "jwt" => $this->refresh(), "success" => true], 200);
    }
}
