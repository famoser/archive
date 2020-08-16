<?php

namespace Famoser\MBOApiWrapper\DataService;

class GetFunctionParametersRequest extends MBRequest
{

    /**
     * @var int $FunctionID
     */
    protected $FunctionID = null;

    /**
     * @param int $FunctionID
     */
    public function __construct($FunctionID)
    {
      parent::__construct();
      $this->FunctionID = $FunctionID;
    }

    /**
     * @return int
     */
    public function getFunctionID()
    {
      return $this->FunctionID;
    }

    /**
     * @param int $FunctionID
     * @return \Famoser\MBOApiWrapper\DataService\GetFunctionParametersRequest
     */
    public function setFunctionID($FunctionID)
    {
      $this->FunctionID = $FunctionID;
      return $this;
    }

}
