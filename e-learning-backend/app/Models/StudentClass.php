<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class StudentClass extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'classes';


    public function studentAssignement()
    {
        return $this->belongsTo('App\Model\Assignement', 'id', 'assignement_id');
    }

    public function studentsClass() {
        return $this->belongsTo('App\Model\Course','id','course_id');
    }
}
