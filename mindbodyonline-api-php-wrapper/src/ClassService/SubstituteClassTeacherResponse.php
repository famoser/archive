<?php

namespace Famoser\MBOApiWrapper\ClassService;

class SubstituteClassTeacherResponse
{

    /**
     * @var SubstituteClassTeacherResult $SubstituteClassTeacherResult
     */
    protected $SubstituteClassTeacherResult = null;

    /**
     * @param SubstituteClassTeacherResult $SubstituteClassTeacherResult
     */
    public function __construct($SubstituteClassTeacherResult)
    {
      $this->SubstituteClassTeacherResult = $SubstituteClassTeacherResult;
    }

    /**
     * @return SubstituteClassTeacherResult
     */
    public function getSubstituteClassTeacherResult()
    {
      return $this->SubstituteClassTeacherResult;
    }

    /**
     * @param SubstituteClassTeacherResult $SubstituteClassTeacherResult
     * @return \Famoser\MBOApiWrapper\ClassService\SubstituteClassTeacherResponse
     */
    public function setSubstituteClassTeacherResult($SubstituteClassTeacherResult)
    {
      $this->SubstituteClassTeacherResult = $SubstituteClassTeacherResult;
      return $this;
    }

}
