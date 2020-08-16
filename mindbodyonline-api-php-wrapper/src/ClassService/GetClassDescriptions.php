<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetClassDescriptions
{

    /**
     * @var GetClassDescriptionsRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetClassDescriptionsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetClassDescriptionsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetClassDescriptionsRequest $Request
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassDescriptions
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
