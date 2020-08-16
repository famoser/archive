<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 21/08/2016
 * Time: 11:50
 */

namespace Famoser\OnlineOfficeBundle\Models\View;


use Famoser\OnlineOfficeBundle\Models\Base\BaseModel;

class MenuEntry extends BaseModel
{
    private $title;
    private $isActive;
    private $path;
    private $icon;
    private $menuEntries;

    public function __construct($title, $path, $icon, $isActive)
    {
        $this->title = $title;
        $this->isActive = $isActive;
        $this->path = $path;
        $this->icon = $icon;

        $this->menuEntries = array();
    }

    public function addMenuEntry(MenuEntry $entry)
    {
        $this->menuEntries[] = $entry;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @return array
     */
    public function getMenuEntries()
    {
        return $this->menuEntries;
    }

    /**
     * @return mixed
     */
    public function getIsActive()
    {
        return $this->isActive;
    }

    /**
     * @return mixed
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * @return mixed
     */
    public function getIcon()
    {
        return $this->icon;
    }


}