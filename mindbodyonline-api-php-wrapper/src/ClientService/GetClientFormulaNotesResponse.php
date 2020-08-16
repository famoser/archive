<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientFormulaNotesResponse
{

    /**
     * @var GetClientFormulaNotesResult $GetClientFormulaNotesResult
     */
    protected $GetClientFormulaNotesResult = null;

    /**
     * @param GetClientFormulaNotesResult $GetClientFormulaNotesResult
     */
    public function __construct($GetClientFormulaNotesResult)
    {
      $this->GetClientFormulaNotesResult = $GetClientFormulaNotesResult;
    }

    /**
     * @return GetClientFormulaNotesResult
     */
    public function getGetClientFormulaNotesResult()
    {
      return $this->GetClientFormulaNotesResult;
    }

    /**
     * @param GetClientFormulaNotesResult $GetClientFormulaNotesResult
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientFormulaNotesResponse
     */
    public function setGetClientFormulaNotesResult($GetClientFormulaNotesResult)
    {
      $this->GetClientFormulaNotesResult = $GetClientFormulaNotesResult;
      return $this;
    }

}
