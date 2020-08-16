<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 27/09/2016
 * Time: 21:32
 */

namespace Clients;

namespace Famoser\MBOApiWrapper\Clients;

use Famoser\MBOApiWrapper\AppointmentService\GetBookableItemsRequest;
use Famoser\MBOApiWrapper\ClassService\AddClientsToClasses;
use Famoser\MBOApiWrapper\ClassService\AddClientsToClassesRequest;
use Famoser\MBOApiWrapper\ClassService\AddClientsToEnrollments;
use Famoser\MBOApiWrapper\ClassService\AddClientsToEnrollmentsRequest;
use Famoser\MBOApiWrapper\ClassService\ArrayOfDateTime;
use Famoser\MBOApiWrapper\ClassService\ArrayOfInt;
use Famoser\MBOApiWrapper\ClassService\ArrayOfString;
use Famoser\MBOApiWrapper\ClassService\Class_x0020_Service;
use Famoser\MBOApiWrapper\ClassService\GetClasses;
use Famoser\MBOApiWrapper\ClassService\GetClassesRequest;
use Famoser\MBOApiWrapper\ClassService\GetClassSchedules;
use Famoser\MBOApiWrapper\ClassService\GetClassSchedulesRequest;
use Famoser\MBOApiWrapper\ClassService\GetEnrollments;
use Famoser\MBOApiWrapper\ClassService\GetEnrollmentsRequest;
use Famoser\MBOApiWrapper\ClassService\MBResult;
use Famoser\MBOApiWrapper\ClassService\SourceCredentials;
use Famoser\MBOApiWrapper\Clients\Base\BaseClient;
use Famoser\MBOApiWrapper\ClientService\GetClientServicesRequest;

class ClassClient extends BaseClient
{
    private $service;
    private $sourceCredentials;
    private $testMode = false;

    const UserCredentialsSessionVariable = "user_credentials";

    public function __construct(SourceCredentials $sourceCredentials, $testmode = false)
    {
        $this->service = new Class_x0020_Service();
        $this->sourceCredentials = $sourceCredentials;
        $this->testMode = $testmode;

    }

    /**
     * @deprecated untested method, use with care
     * @return \Famoser\MBOApiWrapper\ClassService\ArrayOfClassSchedule|null
     */
    public function getEnrollments()
    {
        $request = new GetEnrollmentsRequest();
        $request->setSourceCredentials($this->sourceCredentials);
        $request->setEndDate(new \DateTime("now + 4 weeks"));
        $result = $this->service->GetEnrollments(new GetEnrollments($request))->getGetEnrollmentsResult();
        if ($this->resultIsSuccessful($result))
            return $result->getEnrollments();
        return null;
    }

    /**
     * @return \Famoser\MBOApiWrapper\ClassService\ArrayOfClassSchedule|null
     */
    public function getClassSchedules()
    {
        $request = new GetClassSchedulesRequest();
        $request->setSourceCredentials($this->sourceCredentials);
        $request->setEndDate(new \DateTime("now + 4 weeks"));
        $result = $this->service->GetClassSchedules(new GetClassSchedules($request))->getGetClassSchedulesResult();
        if ($this->resultIsSuccessful($result))
            return $result->getClassSchedules();
        return null;
    }

    /**
     * @return \Famoser\MBOApiWrapper\ClassService\ArrayOfClass|null
     */
    public function getClasses()
    {
        $request = new GetClassesRequest();
        $request->setSourceCredentials($this->sourceCredentials);
        $request->setEndDateTime(new \DateTime("today + 2 weeks"));
        $request->setStartDateTime(new \DateTime("today"));
        $result = $this->service->GetClasses(new GetClasses($request))->getGetClassesResult();
        if ($this->resultIsSuccessful($result))
            return $result->getClasses();
        return null;
    }

    /**
     * @deprecated untested method, use with care
     * @param $classId
     * @param \DateTime $dateTime
     * @param ClientClient $client
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToEnrollmentsResult|null
     */
    public function enroll($classId, \DateTime $dateTime, ClientClient $client)
    {
        $request = new AddClientsToEnrollmentsRequest();
        $request->setSourceCredentials($this->sourceCredentials);
        $arr = new ArrayOfInt();
        $arr->setInt(array($classId));
        $request->setClassScheduleIDs($arr);
        $arr = new ArrayOfString();
        $arr->setString(array($client->getClientInformations()->getID()));
        $request->setClientIDs($arr);
        $arr = new ArrayOfDateTime();
        $arr->setDateTime(array($dateTime->format(\DateTime::ATOM)));
        $request->setEnrollOpen($arr);
        $result = $this->service->AddClientsToEnrollments(new AddClientsToEnrollments($request))->getAddClientsToEnrollmentsResult();
        if ($this->resultIsSuccessful($result))
            return $result;
        dumpObj($result);
        return null;
    }

    /**
     * @param $classId
     * @param \DateTime $dateTime
     * @param ClientClient $client
     * @return \Famoser\MBOApiWrapper\ClassService\ArrayOfClass|bool
     */
    public function bookClass($classId, $clientServiceId, \DateTime $dateTime, ClientClient $client)
    {
        $request = new AddClientsToClassesRequest();
        $request->setSourceCredentials($this->sourceCredentials);
        $arr = new ArrayOfInt();
        $arr->setInt(array($classId));
        $request->setClassIDs($arr);
        $arr = new ArrayOfString();
        $arr->setString(array($client->getClientInformations()->getID()));
        $request->setClientIDs($arr);
        $request->setRequirePayment(true);
        $request->setSendEmail(true);
        $request->setClientServiceID($clientServiceId);
        //$request->set($arr);
        $result = $this->service->AddClientsToClasses(new AddClientsToClasses($request))->getAddClientsToClassesResult();
        if ($this->resultIsSuccessful($result)) {
            //after enrollment, register for attendances
            return $result->getClasses();

        }
        dumpObj($result);
        return false;
    }

    /**
     * @deprecated untested method, use with care
     * @param $classId
     * @param \DateTime $dateTime
     * @param ClientClient $client
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToEnrollmentsResult|null
     */
    public function enrollPermanent($classId, \DateTime $dateTime, ClientClient $client)
    {
        $request = new AddClientsToEnrollmentsRequest();
        $request->setSourceCredentials($this->sourceCredentials);
        $arr = new ArrayOfInt();
        $arr->setInt(array($classId));
        $request->setClassScheduleIDs($arr);
        $arr = new ArrayOfString();
        $arr->setString(array($client->getClientInformations()->getID()));
        $request->setClientIDs($arr);
        $request->setEnrollDateForward($dateTime);
        $result = $this->service->AddClientsToEnrollments(new AddClientsToEnrollments($request))->getAddClientsToEnrollmentsResult();
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