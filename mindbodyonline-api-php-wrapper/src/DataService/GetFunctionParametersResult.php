<?php

namespace Famoser\MBOApiWrapper\DataService;

class GetFunctionParametersResult extends MBResult
{

    /**
     * @var ArrayOfApiFunctionParameter $Parameters
     */
    protected $Parameters = null;

    /**
     * @param StatusCode $Status
     * @param int $ErrorCode
     * @param XMLDetailLevel $XMLDetail
     * @param int $ResultCount
     * @param int $CurrentPageIndex
     * @param int $TotalPageCount
     */
    public function __construct($Status, $ErrorCode, $XMLDetail, $ResultCount, $CurrentPageIndex, $TotalPageCount)
    {
      parent::__construct($Status, $ErrorCode, $XMLDetail, $ResultCount, $CurrentPageIndex, $TotalPageCount);
    }

    /**
     * @return ArrayOfApiFunctionParameter
     */
    public function getParameters()
    {
      return $this->Parameters;
    }

    /**
     * @param ArrayOfApiFunctionParameter $Parameters
     * @return \Famoser\MBOApiWrapper\DataService\GetFunctionParametersResult
     */
    public function setParameters($Parameters)
    {
      $this->Parameters = $Parameters;
      return $this;
    }

}
