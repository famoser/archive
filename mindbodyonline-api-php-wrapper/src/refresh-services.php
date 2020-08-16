<?php

include_once "../vendor/autoload.php";


$appointmentServiceWSDL = "https://api.mindbodyonline.com/0_5/AppointmentService.asmx?WSDL";
$classServiceWSDL = "https://api.mindbodyonline.com/0_5/ClassService.asmx?WSDL";
$clientServiceWSDL = "https://api.mindbodyonline.com/0_5/ClientService.asmx?WSDL";
$dataServiceWSDL = "https://api.mindbodyonline.com/0_5/DataService.asmx?WSDL";
$finderServiceWSDL = "https://api.mindbodyonline.com/0_5/FinderService.asmx?WSDL";
$saleServiceWSDL = "https://api.mindbodyonline.com/0_5/SaleService.asmx?WSDL";
$siteServiceWSDL = "https://api.mindbodyonline.com/0_5/SiteService.asmx?WSDL";
$staffServiceWSDL = "https://api.mindbodyonline.com/0_5/StaffService.asmx?WSDL";

$services = array(
    'AppointmentService' => $appointmentServiceWSDL,
    'ClassService' => $classServiceWSDL,
    'ClientService' => $clientServiceWSDL,
    'DataService' => $dataServiceWSDL,
    'FinderService' => $finderServiceWSDL,
    'SaleService' => $saleServiceWSDL,
    'SiteService' => $siteServiceWSDL,
    'StaffService' => $staffServiceWSDL
);


foreach ($services as $service) {
    $generator = new \Wsdl2PhpGenerator\Generator();
    $serviceName = str_replace(".asmx?WSDL", "", str_replace("https://api.mindbodyonline.com/0_5/", "", $service));
    $generator->generate(
        new \Wsdl2PhpGenerator\Config(array(
            'inputFile' => $service,
            'outputDir' => __DIR__ . "/" . $serviceName,
            'namespaceName' => "Famoser\\MBOApiWrapper\\" . $serviceName
        ))
    );
    echo $serviceName. ": done <br />";
}
