<?php

namespace Famoser\MBOApiWrapper\ClientService;

class AddClientFormulaNoteResponse
{

    /**
     * @var AddClientFormulaNoteResult $AddClientFormulaNoteResult
     */
    protected $AddClientFormulaNoteResult = null;

    /**
     * @param AddClientFormulaNoteResult $AddClientFormulaNoteResult
     */
    public function __construct($AddClientFormulaNoteResult)
    {
      $this->AddClientFormulaNoteResult = $AddClientFormulaNoteResult;
    }

    /**
     * @return AddClientFormulaNoteResult
     */
    public function getAddClientFormulaNoteResult()
    {
      return $this->AddClientFormulaNoteResult;
    }

    /**
     * @param AddClientFormulaNoteResult $AddClientFormulaNoteResult
     * @return \Famoser\MBOApiWrapper\ClientService\AddClientFormulaNoteResponse
     */
    public function setAddClientFormulaNoteResult($AddClientFormulaNoteResult)
    {
      $this->AddClientFormulaNoteResult = $AddClientFormulaNoteResult;
      return $this;
    }

}
