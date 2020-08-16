<?php

namespace Famoser\MBOApiWrapper\DataService;

class RunFunctionForJobResponse
{

    /**
     * @var RunFunctionForJobResult $RunFunctionForJobResult
     */
    protected $RunFunctionForJobResult = null;

    /**
     * @param RunFunctionForJobResult $RunFunctionForJobResult
     */
    public function __construct($RunFunctionForJobResult)
    {
      $this->RunFunctionForJobResult = $RunFunctionForJobResult;
    }

    /**
     * @return RunFunctionForJobResult
     */
    public function getRunFunctionForJobResult()
    {
      return $this->RunFunctionForJobResult;
    }

    /**
     * @param RunFunctionForJobResult $RunFunctionForJobResult
     * @return \Famoser\MBOApiWrapper\DataService\RunFunctionForJobResponse
     */
    public function setRunFunctionForJobResult($RunFunctionForJobResult)
    {
      $this->RunFunctionForJobResult = $RunFunctionForJobResult;
      return $this;
    }

}
