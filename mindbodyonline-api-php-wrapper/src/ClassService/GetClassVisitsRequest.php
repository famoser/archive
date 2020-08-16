<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetClassVisitsRequest extends MBRequest
{

    /**
     * @var int $ClassID
     */
    protected $ClassID = null;

    /**
     * @param int $ClassID
     */
    public function __construct($ClassID)
    {
      parent::__construct();
      $this->ClassID = $ClassID;
    }

    /**
     * @return int
     */
    public function getClassID()
    {
      return $this->ClassID;
    }

    /**
     * @param int $ClassID
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassVisitsRequest
     */
    public function setClassID($ClassID)
    {
      $this->ClassID = $ClassID;
      return $this;
    }

}
