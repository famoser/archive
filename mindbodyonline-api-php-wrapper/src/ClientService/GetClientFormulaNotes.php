<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientFormulaNotes
{

    /**
     * @var GetClientFormulaNotesRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetClientFormulaNotesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetClientFormulaNotesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetClientFormulaNotesRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientFormulaNotes
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
