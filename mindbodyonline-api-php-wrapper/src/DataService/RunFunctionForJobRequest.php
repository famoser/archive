<?php

namespace Famoser\MBOApiWrapper\DataService;

class RunFunctionForJobRequest extends MBRequest
{

    /**
     * @var int $JobID
     */
    protected $JobID = null;

    /**
     * @param int $JobID
     */
    public function __construct($JobID)
    {
      parent::__construct();
      $this->JobID = $JobID;
    }

    /**
     * @return int
     */
    public function getJobID()
    {
      return $this->JobID;
    }

    /**
     * @param int $JobID
     * @return \Famoser\MBOApiWrapper\DataService\RunFunctionForJobRequest
     */
    public function setJobID($JobID)
    {
      $this->JobID = $JobID;
      return $this;
    }

}
