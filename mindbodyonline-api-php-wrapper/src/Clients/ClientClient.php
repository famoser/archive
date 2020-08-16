<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 25/09/2016
 * Time: 18:54
 */

namespace Famoser\MBOApiWrapper\Clients;


use Famoser\MBOApiWrapper\ClassService\GetEnrollmentsRequest;
use Famoser\MBOApiWrapper\Clients\Base\BaseClient;
use Famoser\MBOApiWrapper\ClientService\AddOrUpdateClients;
use Famoser\MBOApiWrapper\ClientService\AddOrUpdateClientsRequest;
use Famoser\MBOApiWrapper\ClientService\ArrayOfClient;
use Famoser\MBOApiWrapper\ClientService\Client;
use Famoser\MBOApiWrapper\ClientService\Client_x0020_Service;
use Famoser\MBOApiWrapper\ClientService\GetClientSchedule;
use Famoser\MBOApiWrapper\ClientService\GetClientScheduleRequest;
use Famoser\MBOApiWrapper\ClientService\GetClientServices;
use Famoser\MBOApiWrapper\ClientService\GetClientServicesRequest;
use Famoser\MBOApiWrapper\ClientService\GetRequiredClientFields;
use Famoser\MBOApiWrapper\ClientService\GetRequiredClientFieldsRequest;
use Famoser\MBOApiWrapper\ClientService\MBResult;
use Famoser\MBOApiWrapper\ClientService\SourceCredentials;
use Famoser\MBOApiWrapper\ClientService\UserCredentials;
use Famoser\MBOApiWrapper\ClientService\ValidateLogin;
use Famoser\MBOApiWrapper\ClientService\ValidateLoginRequest;

class ClientClient extends BaseClient
{
    private $service;
    private $sourceCredentials;
    private $testMode = false;

    const UserCredentialsSessionVariable = "user_credentials";
    const ClientSessionVariable = "client";

    public function __construct(SourceCredentials $sourceCredentials, $testmode = false)
    {
        $this->service = new Client_x0020_Service();
        $this->sourceCredentials = $sourceCredentials;
        $this->testMode = $testmode;
    }

    /**
     * @param $username
     * @param $password
     * @return bool
     */
    public function login($username, $password)
    {
        $request = new ValidateLoginRequest();
        $request->setSourceCredentials($this->sourceCredentials);
        $request->setUsername($username);
        $request->setPassword($password);
        $cred = new UserCredentials();
        $cred->setSiteIDs($this->sourceCredentials->getSiteIDs());
        $cred->setPassword($password);
        $cred->setUsername($username);
        $request->setUserCredentials($cred);
        $request->setPassword($password);
        $result = $this->service->ValidateLogin(new ValidateLogin($request))->getValidateLoginResult();
        if ($result->getClient()) {
            $this->setUserCredentials($username, $password, $result->getClient());
            return $this->resultIsSuccessful($result);
        }
        return $this->resultIsSuccessful($result) && false;
    }

    /**
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientScheduleResult|null
     */
    public function getSchedule()
    {
        $request = new GetClientScheduleRequest();
        $request->setEndDate(new \DateTime("now + 4 weeks"));
        $request->setClientID($this->getClientInformations()->getID());
        $result = $this->service->GetClientSchedule(new GetClientSchedule($request))->getGetClientScheduleResult();
        if ($this->resultIsSuccessful($result))
            return $result;
        return null;
    }


    public function logout()
    {
        if (isset($_SESSION[ClientClient::UserCredentialsSessionVariable]))
            unset($_SESSION[ClientClient::UserCredentialsSessionVariable]);
        if (isset($_SESSION[ClientClient::ClientSessionVariable]))
            unset($_SESSION[ClientClient::ClientSessionVariable]);
        return true;
    }

    public function isLoggedId()
    {
        if ($this->getUserCredentials()) {
            return $this->login($this->getUserCredentials()->getUsername(), $this->getUserCredentials()->getPassword());
        }
        return false;
    }

    public function isLoggedIdUnsafe()
    {
        return $this->getUserCredentials();
    }

    /**
     * @param $password
     * @param $username
     */
    private function setUserCredentials($username, $password, Client $client)
    {
        $userCredentials = new UserCredentials();
        $userCredentials->setSiteIDs($this->sourceCredentials->getSiteIDs());
        $userCredentials->setPassword($password);
        $userCredentials->setUsername($username);
        $_SESSION[ClientClient::UserCredentialsSessionVariable] = serialize($userCredentials);
        $_SESSION[ClientClient::ClientSessionVariable] = serialize($client);
    }

    /**
     * @return UserCredentials
     */
    public function getUserCredentials()
    {
        if (isset($_SESSION[ClientClient::UserCredentialsSessionVariable]))
            return unserialize($_SESSION[ClientClient::UserCredentialsSessionVariable]);
        return null;
    }

    /**
     * @return Client
     */
    public function getClientInformations()
    {
        if (isset($_SESSION[ClientClient::ClientSessionVariable]))
            return unserialize($_SESSION[ClientClient::ClientSessionVariable]);
        return null;
    }

    /**
     * registers a new client
     * Be aware:
     *  - password must contain at least one number, one letter, and must be at least 8 digits long
     * @param Client $client
     * @return bool
     */
    public function register(Client $client)
    {
        $request = new AddOrUpdateClientsRequest();
        $request->setSourceCredentials($this->sourceCredentials);
        $arrayClient = new ArrayOfClient();
        $arrayClient->setClient(array($client));
        $request->setClients($arrayClient);
        $request->setSendEmail($client->getEmail());
        //$request->setTest($this->testMode);
        $addResponse = $this->service->AddOrUpdateClients(new AddOrUpdateClients($request))->getAddOrUpdateClientsResult();

        if ($this->resultIsSuccessful($addResponse, $addResponse->getMessage() != "An action has failed. Please see object message for details.")) {
            return $this->login($client->getUsername(), $client->getPassword());
        }
        if (is_array($addResponse->getClients()))
        foreach ($addResponse->getClients() as $client) {
            if (is_object($client->getMessages()))
                foreach ($client->getMessages() as $message) {
                    $this->errorMessages[] = $message;
                }
        }
        return false;
    }

    /**
     * @param $classId
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientServicesResult|null
     */
    public function getClientServices($classId)
    {
        $request = new GetClientServicesRequest($classId);
        $request->setClientID($this->getClientInformations()->getID());
        $request->setSourceCredentials($this->sourceCredentials);
        $result = $this->service->GetClientServices(new GetClientServices($request));
        if ($this->resultIsSuccessful($result->getGetClientServicesResult())) {
            return $result->getGetClientServicesResult();
        }
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