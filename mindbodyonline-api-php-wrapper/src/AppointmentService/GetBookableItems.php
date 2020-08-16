<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class GetBookableItems
{

    /**
     * @var GetBookableItemsRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetBookableItemsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetBookableItemsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetBookableItemsRequest $Request
     * @return \Famoser\MBOApiWrapper\AppointmentService\GetBookableItems
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
