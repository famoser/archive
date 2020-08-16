<?php

namespace Famoser\MBOApiWrapper\ClientService;

class AddClientFormulaNote
{

    /**
     * @var AddClientFormulaNoteRequest $Request
     */
    protected $Request = null;

    /**
     * @param AddClientFormulaNoteRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return AddClientFormulaNoteRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param AddClientFormulaNoteRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\AddClientFormulaNote
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
