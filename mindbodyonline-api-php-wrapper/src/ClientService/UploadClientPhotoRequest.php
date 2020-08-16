<?php

namespace Famoser\MBOApiWrapper\ClientService;

class UploadClientPhotoRequest extends MBRequest
{

    /**
     * @var string $ClientID
     */
    protected $ClientID = null;

    /**
     * @var base64Binary $Bytes
     */
    protected $Bytes = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return string
     */
    public function getClientID()
    {
      return $this->ClientID;
    }

    /**
     * @param string $ClientID
     * @return \Famoser\MBOApiWrapper\ClientService\UploadClientPhotoRequest
     */
    public function setClientID($ClientID)
    {
      $this->ClientID = $ClientID;
      return $this;
    }

    /**
     * @return base64Binary
     */
    public function getBytes()
    {
      return $this->Bytes;
    }

    /**
     * @param base64Binary $Bytes
     * @return \Famoser\MBOApiWrapper\ClientService\UploadClientPhotoRequest
     */
    public function setBytes($Bytes)
    {
      $this->Bytes = $Bytes;
      return $this;
    }

}
