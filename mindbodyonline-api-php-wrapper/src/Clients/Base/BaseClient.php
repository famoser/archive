<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 25/09/2016
 * Time: 22:52
 */

namespace Famoser\MBOApiWrapper\Clients\Base;

abstract class BaseClient
{
    /**
     * @return string[]
     */
    public abstract function getErrorMessages();
}