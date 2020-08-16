<?php

namespace Famoser\MBOApiWrapper\DataService;

class FunctionDataXmlRequest extends MBRequest
{

    /**
     * @var string $FunctionName
     */
    protected $FunctionName = null;

    /**
     * @var ArrayOfFunctionParam $FunctionParams
     */
    protected $FunctionParams = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return string
     */
    public function getFunctionName()
    {
      return $this->FunctionName;
    }

    /**
     * @param string $FunctionName
     * @return \Famoser\MBOApiWrapper\DataService\FunctionDataXmlRequest
     */
    public function setFunctionName($FunctionName)
    {
      $this->FunctionName = $FunctionName;
      return $this;
    }

    /**
     * @return ArrayOfFunctionParam
     */
    public function getFunctionParams()
    {
      return $this->FunctionParams;
    }

    /**
     * @param ArrayOfFunctionParam $FunctionParams
     * @return \Famoser\MBOApiWrapper\DataService\FunctionDataXmlRequest
     */
    public function setFunctionParams($FunctionParams)
    {
      $this->FunctionParams = $FunctionParams;
      return $this;
    }

}
