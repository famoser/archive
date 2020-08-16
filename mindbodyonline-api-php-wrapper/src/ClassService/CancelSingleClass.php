<?php

namespace Famoser\MBOApiWrapper\ClassService;

class CancelSingleClass
{

    /**
     * @var CancelSingleClassRequest $Request
     */
    protected $Request = null;

    /**
     * @param CancelSingleClassRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return CancelSingleClassRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param CancelSingleClassRequest $Request
     * @return \Famoser\MBOApiWrapper\ClassService\CancelSingleClass
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
