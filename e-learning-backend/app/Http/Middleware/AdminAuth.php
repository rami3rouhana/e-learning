<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AdminAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $key = env('JWT_SECRET');

        $headers = getallheaders();

        $jwtToken =  explode(" ", $headers["Authorization"])[1];

        $decoded = JWT::decode($jwtToken, new Key($key, 'HS256'));

        if ($decoded->role == '1' || $decoded->role == '2' || $decoded->role == '3') {
            return $next($request);
        } else {
            return response()->json([
                'token' => 'invalid',
            ]);
        }
    }
}
