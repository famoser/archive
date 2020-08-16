<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 26/09/2016
 * Time: 18:51
 */

namespace Famoser\MBOApiWrapper\Clients;


use Famoser\MBOApiWrapper\Clients\Base\BaseClient;
use Famoser\MBOApiWrapper\SiteService\GetLocations;
use Famoser\MBOApiWrapper\SiteService\GetLocationsRequest;
use Famoser\MBOApiWrapper\SiteService\Location;
use Famoser\MBOApiWrapper\SiteService\MBResult;
use Famoser\MBOApiWrapper\SiteService\Site_x0020_Service;
use Famoser\MBOApiWrapper\SiteService\SourceCredentials;

class SiteClient extends BaseClient
{
    private $service;
    private $sourceCredentials;
    private $testMode = false;

    const UserCredentialsSessionVariable = "user_credentials";

    public function __construct(SourceCredentials $sourceCredentials, $testmode = false)
    {
        $this->service = new Site_x0020_Service();
        $this->sourceCredentials = $sourceCredentials;
        $this->testMode = $testmode;
    }

    /**
     * @return \Famoser\MBOApiWrapper\SiteService\GetLocationsResult
     */
    public function getLocations()
    {
        $request = new GetLocationsRequest();
        $request->setSourceCredentials($this->sourceCredentials);
        return $this->service->GetLocations(new GetLocations($request))->getGetLocationsResult();
    }


    /**
     * @param MBResult $result
     * @param bool $addToMessages
     * @return bool
     */
    protected function resultIsSuccessful(MBResult $result, $addToMessages = true)
    {
        if ($result->getErrorCode() == 200)
            return true;
        if ($addToMessages)
            $this->errorMessages[] = $result->getMessage();
        return false;
    }

    private $errorMessages = array();

    /**
     * @return string[]
     */
    public function getErrorMessages()
    {
        $arr = $this->errorMessages;
        $this->errorMessages = array();
        return $arr;
    }
}