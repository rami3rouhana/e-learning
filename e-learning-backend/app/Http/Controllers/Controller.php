<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Firebase\JWT\JWT;
use Firebase\JWT\KEY;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function me()
    {
        $key = env('JWT_SECRET');

        $headers = getallheaders();

        $jwtToken =  explode(" ", $headers["Authorization"])[1];

        $decoded = JWT::decode($jwtToken, new Key($key, 'HS256'));

        if (($decoded->exp) > time()) {
            return  $decoded->id;
        } else {
            return json_encode([
                "success" => false,
                "error" => "Expired Token"
            ]);
        }
    }

    public function refresh()
    {
        $key = env('JWT_SECRET');

        $headers = getallheaders();

        $jwtToken =  explode(" ", $headers["Authorization"])[1];

        $decoded = JWT::decode($jwtToken, new Key($key, 'HS256'));

        if (($decoded->exp) > time()) {
            $decoded->exp = time() + 1800;

            return  JWT::encode((array) $decoded, $key, 'HS256');
        } else {
            return json_encode([
                "success" => false,
                "error" => "Expired Token"
            ]);
        }
    }
}
