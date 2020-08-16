<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 18/07/2016
 * Time: 22:53
 */

namespace Famoser\Link\Entities;


use Famoser\Link\Entities\Base\BaseEntity;

class Relink extends BaseEntity
{
    public $url;
    public $target;
    public $name;
    public $description;

    public function getTableName()
    {
        return "relinks";
    }
}