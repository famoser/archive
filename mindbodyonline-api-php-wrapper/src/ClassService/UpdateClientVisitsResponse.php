<?php

namespace Famoser\MBOApiWrapper\ClassService;

class UpdateClientVisitsResponse
{

    /**
     * @var UpdateClientVisitsResult $UpdateClientVisitsResult
     */
    protected $UpdateClientVisitsResult = null;

    /**
     * @param UpdateClientVisitsResult $UpdateClientVisitsResult
     */
    public function __construct($UpdateClientVisitsResult)
    {
      $this->UpdateClientVisitsResult = $UpdateClientVisitsResult;
    }

    /**
     * @return UpdateClientVisitsResult
     */
    public function getUpdateClientVisitsResult()
    {
      return $this->UpdateClientVisitsResult;
    }

    /**
     * @param UpdateClientVisitsResult $UpdateClientVisitsResult
     * @return \Famoser\MBOApiWrapper\ClassService\UpdateClientVisitsResponse
     */
    public function setUpdateClientVisitsResult($UpdateClientVisitsResult)
    {
      $this->UpdateClientVisitsResult = $UpdateClientVisitsResult;
      return $this;
    }

}
