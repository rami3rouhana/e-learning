<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Jenssegers\Mongodb\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Firebase\JWT\JWT;
use Firebase\JWT\KEY;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, HasFactory, HasApiTokens;

    protected $connection = 'mongodb';
    protected $collection = 'users';

    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    protected $hidden = [
        'password',
        'role'
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
