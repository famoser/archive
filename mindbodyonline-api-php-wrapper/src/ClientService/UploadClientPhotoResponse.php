<?php

namespace Famoser\MBOApiWrapper\ClientService;

class UploadClientPhotoResponse
{

    /**
     * @var UploadClientPhotoResult $UploadClientPhotoResult
     */
    protected $UploadClientPhotoResult = null;

    /**
     * @param UploadClientPhotoResult $UploadClientPhotoResult
     */
    public function __construct($UploadClientPhotoResult)
    {
      $this->UploadClientPhotoResult = $UploadClientPhotoResult;
    }

    /**
     * @return UploadClientPhotoResult
     */
    public function getUploadClientPhotoResult()
    {
      return $this->UploadClientPhotoResult;
    }

    /**
     * @param UploadClientPhotoResult $UploadClientPhotoResult
     * @return \Famoser\MBOApiWrapper\ClientService\UploadClientPhotoResponse
     */
    public function setUploadClientPhotoResult($UploadClientPhotoResult)
    {
      $this->UploadClientPhotoResult = $UploadClientPhotoResult;
      return $this;
    }

}
