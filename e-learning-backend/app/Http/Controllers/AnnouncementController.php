<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Announcement;

class AnnouncementController extends Controller
{
    public function getAnnouncements(Request $request)
    {
        $result = Announcement::where('course_id', $request->id)->get();
        if (Count($result)) {
            return response()->json(["announcements" => $result, "jwt" => $this->refresh(), "success" => true], 200);
        } else {
            return response()->json(["Error" => "Something went wrong."], 400);
        }
    }

    public function addAnnouncement(Request $request)
    {
        $announcementExist = Announcement::where('Announcement', $request->Announcement)->first();

        if ($announcementExist) {
            return response()->json(["announcement" => "Already Taken"], 400);
        }
        $courseExist = Course::where('_id', $request->id)->get();

        if (!count($courseExist)) {
            return response()->json(["course" => 'Does not Exist.'], 400);
        }

        $course = new Announcement;

        $course->announcement = $request->announcement;
        $course->course_id = $request->id;

        $course->save();

        return response()->json(["id" => $course->id, "jwt" => $this->refresh(), "success" => true], 200);
    }
}
