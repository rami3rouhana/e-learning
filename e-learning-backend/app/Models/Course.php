<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Course extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'courses';

    public function courseInstructor() {
        return $this->belongsTo('App\Model\User','id','user_id')->where('role',2);
    }

}
