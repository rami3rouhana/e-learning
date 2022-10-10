<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Announcement extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'announcements';
    
    public function instructorAnnouncemnent() {
        return $this->belongsTo('App\Model\User','id','user_id')->where('role',2);
    }

    public function classAnnouncement() {
        return $this->belongsTo('App\Model\Course','id','course_id');
    }
}
