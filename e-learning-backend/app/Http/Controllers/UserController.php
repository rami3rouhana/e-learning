<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\KEY;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $result = User::where([
            ['email', $request->email],
            ['password', $request->password]
        ])->first();

        if ($result) {

            $array = [
                'id' => $result->_id,
                'role' => $result->role,
                'exp' => time() + 1800
            ];

            $key = env('JWT_SECRET');

            $token = JWT::encode($array, $key, 'HS256');

            return response()->json(["success" => true, "jwt" => $token], 200);
        } else {
            return response()->json(["Error" => "Something went wrong."], 400);
        }
    }
    public function addUser(Request $request)
    {
        $result = User::where('email', $request->email)->first();
        if ($result) {
            return response()->json(["email" => "Already Taken"], 400);
        }
        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        if (isset($request->role))
            $user->role = 2;
        else {
            $user->role = 3;
        }
        $user->save();

        $array = [
            'id' => $user->_id,
            'role' => $result->role,
            'exp' => time() + 1800
        ];

        $key = env('JWT_SECRET');

        $token = JWT::encode($array, $key, 'HS256');

        return response()->json(["success" => true, "jwt" => $token], 200);
    }

    public function getStudents()
    {
        $result = User::where('role', '3')->get();

        if ($result) {
            return response()->json(["students" => $result, "jwt" => $this->refresh(), "success" => true], 400);
        } else {
            return response()->json(["success" => true], 200);
        }
    }

    public function getInstructors()
    {
        $result = User::where('role', '2')->get();
        if ($result) {
            return response()->json(["instructors" => $result, "jwt" => $this->refresh(), "success" => true], 400);
        } else {
            return response()->json(["success" => true], 200);
        }
    }
}
