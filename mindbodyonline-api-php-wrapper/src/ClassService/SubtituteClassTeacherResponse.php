<?php

namespace Famoser\MBOApiWrapper\ClassService;

class SubtituteClassTeacherResponse
{

    /**
     * @var SubstituteClassTeacherResult $SubtituteClassTeacherResult
     */
    protected $SubtituteClassTeacherResult = null;

    /**
     * @param SubstituteClassTeacherResult $SubtituteClassTeacherResult
     */
    public function __construct($SubtituteClassTeacherResult)
    {
      $this->SubtituteClassTeacherResult = $SubtituteClassTeacherResult;
    }

    /**
     * @return SubstituteClassTeacherResult
     */
    public function getSubtituteClassTeacherResult()
    {
      return $this->SubtituteClassTeacherResult;
    }

    /**
     * @param SubstituteClassTeacherResult $SubtituteClassTeacherResult
     * @return \Famoser\MBOApiWrapper\ClassService\SubtituteClassTeacherResponse
     */
    public function setSubtituteClassTeacherResult($SubtituteClassTeacherResult)
    {
      $this->SubtituteClassTeacherResult = $SubtituteClassTeacherResult;
      return $this;
    }

}
