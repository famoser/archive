<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 27/09/2016
 * Time: 21:14
 */

namespace Famoser\MBOApiWrapper\Clients;


use Famoser\MBOApiWrapper\AppointmentService\Appointment_x0020_Service;
use Famoser\MBOApiWrapper\AppointmentService\GetBookableItems;
use Famoser\MBOApiWrapper\AppointmentService\GetBookableItemsRequest;
use Famoser\MBOApiWrapper\AppointmentService\MBResult;
use Famoser\MBOApiWrapper\AppointmentService\SourceCredentials;
use Famoser\MBOApiWrapper\Clients\Base\BaseClient;

class AppointmentClient extends BaseClient
{
    private $service;
    private $sourceCredentials;
    private $testMode = false;

    const UserCredentialsSessionVariable = "user_credentials";

    public function __construct(SourceCredentials $sourceCredentials, $testmode = false)
    {
        $this->service = new Appointment_x0020_Service();
        $this->sourceCredentials = $sourceCredentials;
        $this->testMode = $testmode;
    }

    /**
     * @return \Famoser\MBOApiWrapper\AppointmentService\GetBookableItemsResult|null
     */
    public function getBookableItems()
    {
        $request = new GetBookableItemsRequest();
        $request->setEndDate(new \DateTime("now + 4 weeks"));
        $request->setSourceCredentials($this->sourceCredentials);
        $result = $this->service->GetBookableItems(new GetBookableItems($request))->getGetBookableItemsResult();
        if ($this->resultIsSuccessful($result))
            return $result;
        return null;
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