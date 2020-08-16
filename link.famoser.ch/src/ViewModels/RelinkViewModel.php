<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 18/07/2016
 * Time: 22:55
 */

namespace Famoser\Link\ViewModels;


use Famoser\Link\Entities\Relink;

class RelinkViewModel
{
    private $relink;
    private $hits;

    public function __construct(Relink $relink, array $hits)
    {
        $this->relink = $relink;
        $this->hits = $hits;
    }

    public function getId()
    {
        return $this->relink->id;
    }

    public function getName()
    {
        return $this->relink->name;
    }

    public function getUrl()
    {
        return $this->relink->url;
    }

    public function getTarget()
    {
        return $this->relink->target;
    }

    public function getDescription()
    {
        return $this->relink->description;
    }

    public function getHitCount()
    {
        return count($this->hits);
    }
}