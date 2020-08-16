<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 25/08/2016
 * Time: 12:42
 */

namespace Famoser\OnlineOfficeBundle\Models\View;


class BreadCrumbEntry
{
    private $title;
    private $routeName;
    private $routeArguments;
    private $icon;

    public function __construct($title, $routeName, $routeArguments = array(), $icon = null)
    {
        $this->title = $title;
        $this->routeName = $routeName;
        if (!is_array($routeArguments))
            $this->routeArguments = array();
        else
            $this->routeArguments = $routeArguments;
        $this->icon = $icon;
    }

    /**
     * @return mixed
     */
    public function getRouteName()
    {
        return $this->routeName;
    }

    /**
     * @return mixed
     */
    public function getRouteArguments()
    {
        return $this->routeArguments;
    }

    /**
     * @return mixed
     */
    public function getIcon()
    {
        return $this->icon;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

}