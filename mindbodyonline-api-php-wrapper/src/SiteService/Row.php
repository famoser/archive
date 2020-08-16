<?php

namespace Famoser\MBOApiWrapper\SiteService;

class Row
{

    /**
     * @var anyType $Content
     */
    protected $Content = null;

    
    public function __construct()
    {
    
    }

    /**
     * @return anyType
     */
    public function getContent()
    {
      return $this->Content;
    }

    /**
     * @param anyType $Content
     * @return \Famoser\MBOApiWrapper\SiteService\Row
     */
    public function setContent($Content)
    {
      $this->Content = $Content;
      return $this;
    }

}
