<?php

namespace Famoser\MBOApiWrapper\DataService;

class SelectDataXmlResponse
{

    /**
     * @var SelectDataXmlResult $SelectDataXmlResult
     */
    protected $SelectDataXmlResult = null;

    /**
     * @param SelectDataXmlResult $SelectDataXmlResult
     */
    public function __construct($SelectDataXmlResult)
    {
      $this->SelectDataXmlResult = $SelectDataXmlResult;
    }

    /**
     * @return SelectDataXmlResult
     */
    public function getSelectDataXmlResult()
    {
      return $this->SelectDataXmlResult;
    }

    /**
     * @param SelectDataXmlResult $SelectDataXmlResult
     * @return \Famoser\MBOApiWrapper\DataService\SelectDataXmlResponse
     */
    public function setSelectDataXmlResult($SelectDataXmlResult)
    {
      $this->SelectDataXmlResult = $SelectDataXmlResult;
      return $this;
    }

}
