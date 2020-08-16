<?php

namespace Famoser\MBOApiWrapper\ClassService;

class RemoveClientsFromClassesResponse
{

    /**
     * @var RemoveClientsFromClassesResult $RemoveClientsFromClassesResult
     */
    protected $RemoveClientsFromClassesResult = null;

    /**
     * @param RemoveClientsFromClassesResult $RemoveClientsFromClassesResult
     */
    public function __construct($RemoveClientsFromClassesResult)
    {
      $this->RemoveClientsFromClassesResult = $RemoveClientsFromClassesResult;
    }

    /**
     * @return RemoveClientsFromClassesResult
     */
    public function getRemoveClientsFromClassesResult()
    {
      return $this->RemoveClientsFromClassesResult;
    }

    /**
     * @param RemoveClientsFromClassesResult $RemoveClientsFromClassesResult
     * @return \Famoser\MBOApiWrapper\ClassService\RemoveClientsFromClassesResponse
     */
    public function setRemoveClientsFromClassesResult($RemoveClientsFromClassesResult)
    {
      $this->RemoveClientsFromClassesResult = $RemoveClientsFromClassesResult;
      return $this;
    }

}
