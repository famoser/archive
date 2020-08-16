<?php

namespace Famoser\MBOApiWrapper\ClientService;

class UploadClientDocument
{

    /**
     * @var UploadClientDocumentRequest $Request
     */
    protected $Request = null;

    /**
     * @param UploadClientDocumentRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return UploadClientDocumentRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param UploadClientDocumentRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\UploadClientDocument
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
