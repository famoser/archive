<?php


use Famoser\MBOApiWrapper\ClientService\ArrayOfInt;
use Famoser\MBOApiWrapper\ClientService\Client;
use Famoser\MBOApiWrapper\ClientService\SourceCredentials;
use Famoser\MBOApiWrapper\Clients\ClientClient;

require_once "commons.php";

$client = getLoginClient();

//register
$myCl = new Client();
$myCl->setUsername("famoser5");
$myCl->setPassword("password12");
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
dump("Registering");
dump($client->register($myCl));
dump($client->isLoggedId());

//check out error messages
foreach ($client->getErrorMessages() as $errorMessage) {
    dump($errorMessage);
}

//login
dump("Logging in");
dump($client->login("famoser5", "password12"));
dump($client->isLoggedId());

//check out error messages
foreach ($client->getErrorMessages() as $errorMessage) {
    dump($errorMessage);
}

//logout
dump("Logging out");
dump($client->logout());
dump($client->isLoggedId());

//login with wrong credentials

dump("Logging in wrong");
dump($client->login("Peter", "Schwarz"));
dump($client->isLoggedId());

//check out error messages
foreach ($client->getErrorMessages() as $errorMessage) {
    dump($errorMessage);
}