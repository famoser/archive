<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetClassDescriptionsResponse
{

    /**
     * @var GetClassDescriptionsResult $GetClassDescriptionsResult
     */
    protected $GetClassDescriptionsResult = null;

    /**
     * @param GetClassDescriptionsResult $GetClassDescriptionsResult
     */
    public function __construct($GetClassDescriptionsResult)
    {
      $this->GetClassDescriptionsResult = $GetClassDescriptionsResult;
    }

    /**
     * @return GetClassDescriptionsResult
     */
    public function getGetClassDescriptionsResult()
    {
      return $this->GetClassDescriptionsResult;
    }

    /**
     * @param GetClassDescriptionsResult $GetClassDescriptionsResult
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassDescriptionsResponse
     */
    public function setGetClassDescriptionsResult($GetClassDescriptionsResult)
    {
      $this->GetClassDescriptionsResult = $GetClassDescriptionsResult;
      return $this;
    }

}
