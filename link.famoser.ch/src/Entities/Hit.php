<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 18/07/2016
 * Time: 22:56
 */

namespace Famoser\Link\Entities;


use Famoser\Link\Entities\Base\BaseEntity;

class Hit extends BaseEntity
{
    public $relink_id;
    public $ip;
    public $create_date;

    public function getTableName()
    {
        return "hits";
    }
}