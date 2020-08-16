<?php
use Famoser\MBOApiWrapper\Clients\AppointmentClient;
use Famoser\MBOApiWrapper\Clients\ClassClient;
use Famoser\MBOApiWrapper\Clients\ClientClient;
use Famoser\MBOApiWrapper\Clients\SaleClient;
use Famoser\MBOApiWrapper\Clients\SiteClient;
use Famoser\MBOApiWrapper\ClientService\ArrayOfInt;
use Famoser\MBOApiWrapper\ClientService\Client;
use Famoser\MBOApiWrapper\ClientService\SourceCredentials;

require_once "../vendor/autoload.php";

/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 26/09/2016
 * Time: 18:07
 */

function dumpObj($obj)
{
    dump(nl2br(json_encode_private($obj)));
}

function dump($obj)
{
    if (is_array($obj))
        $obj = implode(", ", $obj);
    if (is_bool($obj))
        $obj = $obj ? "True" : "False";
    echo $obj . "<br />" . "<br />" . "<br />";
}

/**
 * @return SaleClient
 */
function getSaleClient()
{
    //get config
    $configJson = json_decode(file_get_contents("../test_data.json"), true);

    //construct credentials
    $sourceCredentials = new Famoser\MBOApiWrapper\SaleService\SourceCredentials();
    $sourceCredentials->setPassword($configJson["password"]);
    $arr = new Famoser\MBOApiWrapper\SaleService\ArrayOfInt();
    $sourceCredentials->setSiteIDs($arr->setInt(array($configJson["site_id"])));
    $sourceCredentials->setSourceName($configJson["sourceName"]);

    //return client
    return new SaleClient($sourceCredentials, true);
}

/**
 * @return SiteClient
 */
function getSiteClient()
{
    //get config
    $configJson = json_decode(file_get_contents("../test_data.json"), true);

    //construct credentials
    $sourceCredentials = new Famoser\MBOApiWrapper\SiteService\SourceCredentials();
    $sourceCredentials->setPassword($configJson["password"]);
    $arr = new Famoser\MBOApiWrapper\SiteService\ArrayOfInt();
    $sourceCredentials->setSiteIDs($arr->setInt(array($configJson["site_id"])));
    $sourceCredentials->setSourceName($configJson["sourceName"]);

    //return client
    return new SiteClient($sourceCredentials, true);
}

/**
 * @return ClientClient
 */
function getLoginClient()
{
    //get config
    $configJson = json_decode(file_get_contents("../test_data.json"), true);

    //construct credentials
    $sourceCredentials = new SourceCredentials();
    $sourceCredentials->setPassword($configJson["password"]);
    $arr = new ArrayOfInt();
    $sourceCredentials->setSiteIDs($arr->setInt(array($configJson["site_id"])));
    $sourceCredentials->setSourceName($configJson["sourceName"]);

    //return client
    return new ClientClient($sourceCredentials, true);
}

/**
 * @return AppointmentClient
 */
function getAppointmentClient()
{
    //get config
    $configJson = json_decode(file_get_contents("../test_data.json"), true);

    //construct credentials
    $sourceCredentials = new Famoser\MBOApiWrapper\AppointmentService\SourceCredentials();
    $sourceCredentials->setPassword($configJson["password"]);
    $arr = new Famoser\MBOApiWrapper\AppointmentService\ArrayOfInt();
    $sourceCredentials->setSiteIDs($arr->setInt(array($configJson["site_id"])));
    $sourceCredentials->setSourceName($configJson["sourceName"]);

    //return client
    return new AppointmentClient($sourceCredentials, true);
}

/**
 * @return ClassClient
 */
function getClassClient()
{
    //get config
    $configJson = json_decode(file_get_contents("../test_data.json"), true);

    //construct credentials
    $sourceCredentials = new Famoser\MBOApiWrapper\ClassService\SourceCredentials();
    $sourceCredentials->setPassword($configJson["password"]);
    $arr = new Famoser\MBOApiWrapper\ClassService\ArrayOfInt();
    $sourceCredentials->setSiteIDs($arr->setInt(array($configJson["site_id"])));
    $sourceCredentials->setSourceName($configJson["sourceName"]);

    //return client
    return new ClassClient($sourceCredentials, true);
}

/**
 * @param $username
 * @param $password
 * @return ClientClient
 */
function createAccountAndLogin($username, $password)
{
    $client = getLoginClient();
    $myCl = new Client();
    $myCl->setUsername($username);
    $myCl->setPassword($password);
    $myCl->setAddressLine1("Am Ring 2");
    $myCl->setCity("Basel");
    $myCl->setPostalCode("4123");
    $myCl->setFirstName("Florian");
    $myCl->setLastName("Moser");
    $myCl->setMobilePhone("0831823121");
    $myCl->setEmail("git@famoser.ch");
    $myCl->setCountry("CH");
    $myCl->setState("BS");
    $myCl->setBirthDate(new DateTime("2000-01-01"));
    $myCl->setReferredBy("webpage turicum.fit");
    //registering
    $client->register($myCl);

    //login
    $client->login($username, $password);
    return $client;
}


function json_encode_private($object)
{
    if ($object == null)
        return "null object";
    return json_encode(extract_props($object));
}

function extract_props($object)
{
    $public = [];

    try {
        $reflection = new ReflectionClass(get_class($object));

        foreach ($reflection->getProperties() as $property) {
            $property->setAccessible(true);

            $value = $property->getValue($object);
            $name = $property->getName();

            if (is_array($value)) {
                $public[$name] = [];

                foreach ($value as $item) {
                    if (is_object($item)) {
                        $itemArray = extract_props($item);
                        $public[$name][] = $itemArray;
                    } else {
                        $public[$name][] = $item;
                    }
                }
            } else if (is_object($value)) {
                $public[$name] = extract_props($value);
            } else $public[$name] = $value;
        }
    } catch (\Exception $ex) {
        $public["exception"] = "sorry, I could not serialize this object. exception: " . $ex->getMessage();
    }

    return $public;
}