<?php

namespace Famoser\MBOApiWrapper\ClassService;

class AddClientsToClassesResponse
{

    /**
     * @var AddClientsToClassesResult $AddClientsToClassesResult
     */
    protected $AddClientsToClassesResult = null;

    /**
     * @param AddClientsToClassesResult $AddClientsToClassesResult
     */
    public function __construct($AddClientsToClassesResult)
    {
      $this->AddClientsToClassesResult = $AddClientsToClassesResult;
    }

    /**
     * @return AddClientsToClassesResult
     */
    public function getAddClientsToClassesResult()
    {
      return $this->AddClientsToClassesResult;
    }

    /**
     * @param AddClientsToClassesResult $AddClientsToClassesResult
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToClassesResponse
     */
    public function setAddClientsToClassesResult($AddClientsToClassesResult)
    {
      $this->AddClientsToClassesResult = $AddClientsToClassesResult;
      return $this;
    }

}
