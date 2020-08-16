<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 26/09/2016
 * Time: 18:07
 */

use Famoser\MBOApiWrapper\SaleService\CartItem;
use Famoser\MBOApiWrapper\SaleService\CreditCardInfo;
use Famoser\MBOApiWrapper\SaleService\Item;
use Famoser\MBOApiWrapper\SaleService\PaymentInfo;
use Famoser\MBOApiWrapper\SaleService\Service;

require_once "commons.php";

$loginClient = createAccountAndLogin("famoser", "hallowah12");
$client = getSaleClient();
$locations = getSiteClient()->getLocations();

//get a location id (is need by the API for tax calculations)
$locationId = $locations->getLocations()->current()->getID();

$services = $client->getServices($locationId);
$serviceId = $services->current()->getID();

dumpObj($services);
dump("services for " . $locationId . ": " . count($services));

//check out error messages
foreach ($client->getErrorMessages() as $errorMessage) {
    dump($errorMessage);
}


dump("order " . $serviceId);
//order first two products
$payment = new CreditCardInfo();
$payment->setAmount("200");
$payment->setCreditCardNumber("377618455826150");
$payment->setName("Florian Moser");
$payment->setExpMonth("12");
$payment->setExpYear("17");
$payment->setBillingPostalCode("2103");

//make cart item
$cartItem = new CartItem(0);
$cartItem->setQuantity(1);
$item = new Service();
$item->setID($serviceId);
$cartItem->setItem($item);

$resp = $client->orderProduct(array($cartItem), $payment, "git@famoser.ch", $locationId, $loginClient);

dumpObj($resp);