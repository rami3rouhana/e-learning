<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Assignement extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'assignements';

    public function classAssignement() {
        return $this->belongsTo('App\Model\Course','id','course_id');
    }
}
