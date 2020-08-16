<?php

require_once "commons.php";

$loginClient = createAccountAndLogin("famoser", "hallowah12");
$client = getClassClient();
$app = getAppointmentClient();

//get classes
$classes = $client->getClassSchedules();
$services = $loginClient->getClientServices(2239);
foreach ($loginClient->getErrorMessages() as $errorMessage) {
    dump($errorMessage);
}
dumpObj($services);
//can be quite large!
//dumpObj($classes);

//using 2152 here, because this is an id which actually exists in the test api
dumpObj($client->bookClass(2239, $services->getClientServices()[0]->getID(), new DateTime("now"), $loginClient));
foreach ($client->getErrorMessages() as $errorMessage) {
    dump($errorMessage);
}
