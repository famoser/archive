<?php

namespace Famoser\MBOApiWrapper\DataService;

class FunctionParam
{

    /**
     * @var string $ParamName
     */
    protected $ParamName = null;

    /**
     * @var string $ParamValue
     */
    protected $ParamValue = null;

    /**
     * @var string $ParamDataType
     */
    protected $ParamDataType = null;

    
    public function __construct()
    {
    
    }

    /**
     * @return string
     */
    public function getParamName()
    {
      return $this->ParamName;
    }

    /**
     * @param string $ParamName
     * @return \Famoser\MBOApiWrapper\DataService\FunctionParam
     */
    public function setParamName($ParamName)
    {
      $this->ParamName = $ParamName;
      return $this;
    }

    /**
     * @return string
     */
    public function getParamValue()
    {
      return $this->ParamValue;
    }

    /**
     * @param string $ParamValue
     * @return \Famoser\MBOApiWrapper\DataService\FunctionParam
     */
    public function setParamValue($ParamValue)
    {
      $this->ParamValue = $ParamValue;
      return $this;
    }

    /**
     * @return string
     */
    public function getParamDataType()
    {
      return $this->ParamDataType;
    }

    /**
     * @param string $ParamDataType
     * @return \Famoser\MBOApiWrapper\DataService\FunctionParam
     */
    public function setParamDataType($ParamDataType)
    {
      $this->ParamDataType = $ParamDataType;
      return $this;
    }

}
