<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 26/09/2016
 * Time: 17:24
 */

namespace Famoser\MBOApiWrapper\Clients;


use Famoser\MBOApiWrapper\Clients\Base\BaseClient;
use Famoser\MBOApiWrapper\FinderService\CartItem;
use Famoser\MBOApiWrapper\SaleService\ArrayOfCartItem;
use Famoser\MBOApiWrapper\SaleService\ArrayOfInt;
use Famoser\MBOApiWrapper\SaleService\ArrayOfPayment;
use Famoser\MBOApiWrapper\SaleService\ArrayOfPaymentInfo;
use Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCart;
use Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartRequest;
use Famoser\MBOApiWrapper\SaleService\GetProducts;
use Famoser\MBOApiWrapper\SaleService\GetProductsRequest;
use Famoser\MBOApiWrapper\SaleService\GetServices;
use Famoser\MBOApiWrapper\SaleService\GetServicesRequest;
use Famoser\MBOApiWrapper\SaleService\MBResult;
use Famoser\MBOApiWrapper\SaleService\Payment;
use Famoser\MBOApiWrapper\SaleService\PaymentInfo;
use Famoser\MBOApiWrapper\SaleService\Sale_x0020_Service;
use Famoser\MBOApiWrapper\SaleService\SourceCredentials;
use Famoser\MBOApiWrapper\SaleService\UserCredentials;

class SaleClient extends BaseClient
{
    private $service;
    private $sourceCredentials;
    private $testMode = false;

    const UserCredentialsSessionVariable = "user_credentials";

    public function __construct(SourceCredentials $sourceCredentials, $testmode = false)
    {
        $this->service = new Sale_x0020_Service();
        $this->sourceCredentials = $sourceCredentials;
        $this->testMode = $testmode;
    }


    /**
     * @param $locationId
     * @return \Famoser\MBOApiWrapper\SaleService\ArrayOfService|false
     */
    public function getServices($locationId)
    {
        $request = new GetServicesRequest($locationId, true);
        $request->setSourceCredentials($this->sourceCredentials);
        $resp = $this->service->GetServices(new GetServices($request));
        if ($this->resultIsSuccessful($resp->getGetServicesResult()))
            return $resp->getGetServicesResult()->getServices();
        return false;
    }

    /**
     * @param CartItem[] $items
     * @param PaymentInfo $payment
     * @param $email
     * @param $locationId
     * @param ClientClient $client
     * @return bool|\Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartResult
     * @internal param $giftCardNumber
     */
    public function orderProduct(array $items, PaymentInfo $payment, $email, $locationId, ClientClient $client)
    {
        if (!$client->getClientInformations())
            return false;

        $request = new CheckoutShoppingCartRequest();
        $request->setSourceCredentials($this->sourceCredentials);
        $request->setClientID($client->getClientInformations()->getID());
        $request->setLocationID($locationId);
        $request->setSendEmail($email);
        //$request->setUserCredentials($this->getUserCredentials($client));

        $pArr = new ArrayOfPaymentInfo();
        $pArr->setPaymentInfo(array($payment));
        $request->setPayments($pArr);

        $arr = new ArrayOfCartItem();
        $arr->setCartItem($items);
        $request->setCartItems($arr);
        $resp = $this->service->CheckoutShoppingCart(new CheckoutShoppingCart($request));
        return $resp->getCheckoutShoppingCartResult();
    }

    /**
     * @param ClientClient $client
     * @return UserCredentials
     */
    private function getUserCredentials(ClientClient $client)
    {
        $otherUserCredentials = $client->getUserCredentials();
        $userCredentials = new UserCredentials();
        $userCredentials->setLocationID($otherUserCredentials->getLocationID());
        $userCredentials->setUsername($otherUserCredentials->getUsername());
        $userCredentials->setPassword($otherUserCredentials->getPassword());

        $arr = new ArrayOfInt();
        $arrr = [];
        foreach ($otherUserCredentials->getSiteIDs() as $siteID) {
            $arrr[] = $siteID;
        }
        $arr->setInt($arrr);
        $userCredentials->setSiteIDs($arr);
        dumpObj($userCredentials);
        return $userCredentials;
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