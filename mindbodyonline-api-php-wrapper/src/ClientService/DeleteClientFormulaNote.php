<?php

namespace Famoser\MBOApiWrapper\ClientService;

class DeleteClientFormulaNote
{

    /**
     * @var DeleteCientFormulaNoteRequest $Request
     */
    protected $Request = null;

    /**
     * @param DeleteCientFormulaNoteRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return DeleteCientFormulaNoteRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param DeleteCientFormulaNoteRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\DeleteClientFormulaNote
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
