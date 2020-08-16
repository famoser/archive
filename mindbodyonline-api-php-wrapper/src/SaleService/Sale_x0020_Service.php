<?php

namespace Famoser\MBOApiWrapper\SaleService;


/**
 * Provides methods and attributes relating to sales.
 */
class Sale_x0020_Service extends \SoapClient
{

    /**
     * @var array $classmap The defined classes
     */
    private static $classmap = array (
      'GetAcceptedCardType' => 'Famoser\\MBOApiWrapper\\SaleService\\GetAcceptedCardType',
      'GetAcceptedCardTypeRequest' => 'Famoser\\MBOApiWrapper\\SaleService\\GetAcceptedCardTypeRequest',
      'MBRequest' => 'Famoser\\MBOApiWrapper\\SaleService\\MBRequest',
      'SourceCredentials' => 'Famoser\\MBOApiWrapper\\SaleService\\SourceCredentials',
      'ArrayOfInt' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfInt',
      'UserCredentials' => 'Famoser\\MBOApiWrapper\\SaleService\\UserCredentials',
      'ArrayOfString' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfString',
      'GetAcceptedCardTypeResponse' => 'Famoser\\MBOApiWrapper\\SaleService\\GetAcceptedCardTypeResponse',
      'GetAcceptedCardTypeResult' => 'Famoser\\MBOApiWrapper\\SaleService\\GetAcceptedCardTypeResult',
      'MBResult' => 'Famoser\\MBOApiWrapper\\SaleService\\MBResult',
      'CheckoutShoppingCart' => 'Famoser\\MBOApiWrapper\\SaleService\\CheckoutShoppingCart',
      'CheckoutShoppingCartRequest' => 'Famoser\\MBOApiWrapper\\SaleService\\CheckoutShoppingCartRequest',
      'ArrayOfCartItem' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfCartItem',
      'CartItem' => 'Famoser\\MBOApiWrapper\\SaleService\\CartItem',
      'MBObject' => 'Famoser\\MBOApiWrapper\\SaleService\\MBObject',
      'Site' => 'Famoser\\MBOApiWrapper\\SaleService\\Site',
      'ClassSchedule' => 'Famoser\\MBOApiWrapper\\SaleService\\ClassSchedule',
      'ArrayOfClass' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfClass',
      'Class' => 'Famoser\\MBOApiWrapper\\SaleService\\ClassCustom',
      'ArrayOfVisit' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfVisit',
      'Visit' => 'Famoser\\MBOApiWrapper\\SaleService\\Visit',
      'Staff' => 'Famoser\\MBOApiWrapper\\SaleService\\Staff',
      'ArrayOfAppointment' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfAppointment',
      'Appointment' => 'Famoser\\MBOApiWrapper\\SaleService\\Appointment',
      'ScheduleItem' => 'Famoser\\MBOApiWrapper\\SaleService\\ScheduleItem',
      'Unavailability' => 'Famoser\\MBOApiWrapper\\SaleService\\Unavailability',
      'Availability' => 'Famoser\\MBOApiWrapper\\SaleService\\Availability',
      'SessionType' => 'Famoser\\MBOApiWrapper\\SaleService\\SessionType',
      'ArrayOfProgram' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfProgram',
      'Program' => 'Famoser\\MBOApiWrapper\\SaleService\\Program',
      'Location' => 'Famoser\\MBOApiWrapper\\SaleService\\Location',
      'Client' => 'Famoser\\MBOApiWrapper\\SaleService\\Client',
      'ArrayOfClientIndex' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfClientIndex',
      'ClientIndex' => 'Famoser\\MBOApiWrapper\\SaleService\\ClientIndex',
      'ArrayOfClientIndexValue' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfClientIndexValue',
      'ClientIndexValue' => 'Famoser\\MBOApiWrapper\\SaleService\\ClientIndexValue',
      'ClientCreditCard' => 'Famoser\\MBOApiWrapper\\SaleService\\ClientCreditCard',
      'ArrayOfClientRelationship' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfClientRelationship',
      'ClientRelationship' => 'Famoser\\MBOApiWrapper\\SaleService\\ClientRelationship',
      'Relationship' => 'Famoser\\MBOApiWrapper\\SaleService\\Relationship',
      'ArrayOfRep' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfRep',
      'Rep' => 'Famoser\\MBOApiWrapper\\SaleService\\Rep',
      'ArrayOfSalesRep' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfSalesRep',
      'SalesRep' => 'Famoser\\MBOApiWrapper\\SaleService\\SalesRep',
      'ArrayOfCustomClientField' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfCustomClientField',
      'CustomClientField' => 'Famoser\\MBOApiWrapper\\SaleService\\CustomClientField',
      'Liability' => 'Famoser\\MBOApiWrapper\\SaleService\\Liability',
      'ProspectStage' => 'Famoser\\MBOApiWrapper\\SaleService\\ProspectStage',
      'ClientService' => 'Famoser\\MBOApiWrapper\\SaleService\\ClientService',
      'ArrayOfResource' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfResource',
      'Resource' => 'Famoser\\MBOApiWrapper\\SaleService\\Resource',
      'ArrayOfUnavailability' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfUnavailability',
      'ArrayOfAvailability' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfAvailability',
      'ArrayOfLocation' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfLocation',
      'ArrayOfProviderIDUpdate' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfProviderIDUpdate',
      'ProviderIDUpdate' => 'Famoser\\MBOApiWrapper\\SaleService\\ProviderIDUpdate',
      'ArrayOfClient' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfClient',
      'ClassDescription' => 'Famoser\\MBOApiWrapper\\SaleService\\ClassDescription',
      'Level' => 'Famoser\\MBOApiWrapper\\SaleService\\Level',
      'Course' => 'Famoser\\MBOApiWrapper\\SaleService\\Course',
      'ShoppingCart' => 'Famoser\\MBOApiWrapper\\SaleService\\ShoppingCart',
      'Size' => 'Famoser\\MBOApiWrapper\\SaleService\\Size',
      'Color' => 'Famoser\\MBOApiWrapper\\SaleService\\Color',
      'Item' => 'Famoser\\MBOApiWrapper\\SaleService\\Item',
      'Tip' => 'Famoser\\MBOApiWrapper\\SaleService\\Tip',
      'Package' => 'Famoser\\MBOApiWrapper\\SaleService\\Package',
      'ArrayOfService' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfService',
      'Service' => 'Famoser\\MBOApiWrapper\\SaleService\\Service',
      'ArrayOfProduct' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfProduct',
      'Product' => 'Famoser\\MBOApiWrapper\\SaleService\\Product',
      'ArrayOfLong' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfLong',
      'ArrayOfPaymentInfo' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfPaymentInfo',
      'PaymentInfo' => 'Famoser\\MBOApiWrapper\\SaleService\\PaymentInfo',
      'GiftCardInfo' => 'Famoser\\MBOApiWrapper\\SaleService\\GiftCardInfo',
      'CheckInfo' => 'Famoser\\MBOApiWrapper\\SaleService\\CheckInfo',
      'CashInfo' => 'Famoser\\MBOApiWrapper\\SaleService\\CashInfo',
      'CompInfo' => 'Famoser\\MBOApiWrapper\\SaleService\\CompInfo',
      'TrackDataInfo' => 'Famoser\\MBOApiWrapper\\SaleService\\TrackDataInfo',
      'StoredCardInfo' => 'Famoser\\MBOApiWrapper\\SaleService\\StoredCardInfo',
      'EncryptedTrackDataInfo' => 'Famoser\\MBOApiWrapper\\SaleService\\EncryptedTrackDataInfo',
      'CustomPaymentInfo' => 'Famoser\\MBOApiWrapper\\SaleService\\CustomPaymentInfo',
      'DebitAccountInfo' => 'Famoser\\MBOApiWrapper\\SaleService\\DebitAccountInfo',
      'CreditCardInfo' => 'Famoser\\MBOApiWrapper\\SaleService\\CreditCardInfo',
      'CheckoutShoppingCartResponse' => 'Famoser\\MBOApiWrapper\\SaleService\\CheckoutShoppingCartResponse',
      'CheckoutShoppingCartResult' => 'Famoser\\MBOApiWrapper\\SaleService\\CheckoutShoppingCartResult',
      'ArrayOfClassSchedule' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfClassSchedule',
      'GetSales' => 'Famoser\\MBOApiWrapper\\SaleService\\GetSales',
      'GetSalesRequest' => 'Famoser\\MBOApiWrapper\\SaleService\\GetSalesRequest',
      'GetSalesResponse' => 'Famoser\\MBOApiWrapper\\SaleService\\GetSalesResponse',
      'GetSalesResult' => 'Famoser\\MBOApiWrapper\\SaleService\\GetSalesResult',
      'ArrayOfSale' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfSale',
      'Sale' => 'Famoser\\MBOApiWrapper\\SaleService\\Sale',
      'ArrayOfPayment' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfPayment',
      'Payment' => 'Famoser\\MBOApiWrapper\\SaleService\\Payment',
      'GetServices' => 'Famoser\\MBOApiWrapper\\SaleService\\GetServices',
      'GetServicesRequest' => 'Famoser\\MBOApiWrapper\\SaleService\\GetServicesRequest',
      'GetServicesResponse' => 'Famoser\\MBOApiWrapper\\SaleService\\GetServicesResponse',
      'GetServicesResult' => 'Famoser\\MBOApiWrapper\\SaleService\\GetServicesResult',
      'UpdateServices' => 'Famoser\\MBOApiWrapper\\SaleService\\UpdateServices',
      'UpdateServicesRequest' => 'Famoser\\MBOApiWrapper\\SaleService\\UpdateServicesRequest',
      'UpdateServicesResponse' => 'Famoser\\MBOApiWrapper\\SaleService\\UpdateServicesResponse',
      'UpdateServicesResult' => 'Famoser\\MBOApiWrapper\\SaleService\\UpdateServicesResult',
      'GetPackages' => 'Famoser\\MBOApiWrapper\\SaleService\\GetPackages',
      'GetPackagesRequest' => 'Famoser\\MBOApiWrapper\\SaleService\\GetPackagesRequest',
      'GetPackagesResponse' => 'Famoser\\MBOApiWrapper\\SaleService\\GetPackagesResponse',
      'GetPackagesResult' => 'Famoser\\MBOApiWrapper\\SaleService\\GetPackagesResult',
      'ArrayOfPackage' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfPackage',
      'GetProducts' => 'Famoser\\MBOApiWrapper\\SaleService\\GetProducts',
      'GetProductsRequest' => 'Famoser\\MBOApiWrapper\\SaleService\\GetProductsRequest',
      'GetProductsResponse' => 'Famoser\\MBOApiWrapper\\SaleService\\GetProductsResponse',
      'GetProductsResult' => 'Famoser\\MBOApiWrapper\\SaleService\\GetProductsResult',
      'UpdateProducts' => 'Famoser\\MBOApiWrapper\\SaleService\\UpdateProducts',
      'UpdateProductsRequest' => 'Famoser\\MBOApiWrapper\\SaleService\\UpdateProductsRequest',
      'UpdateProductsResponse' => 'Famoser\\MBOApiWrapper\\SaleService\\UpdateProductsResponse',
      'UpdateProductsResult' => 'Famoser\\MBOApiWrapper\\SaleService\\UpdateProductsResult',
      'RedeemSpaFinderWellnessCard' => 'Famoser\\MBOApiWrapper\\SaleService\\RedeemSpaFinderWellnessCard',
      'RedeemSpaFinderWellnessCardRequest' => 'Famoser\\MBOApiWrapper\\SaleService\\RedeemSpaFinderWellnessCardRequest',
      'RedeemSpaFinderWellnessCardResponse' => 'Famoser\\MBOApiWrapper\\SaleService\\RedeemSpaFinderWellnessCardResponse',
      'RedeemSpaFinderWellnessCardResult' => 'Famoser\\MBOApiWrapper\\SaleService\\RedeemSpaFinderWellnessCardResult',
      'GetCustomPaymentMethods' => 'Famoser\\MBOApiWrapper\\SaleService\\GetCustomPaymentMethods',
      'GetCustomPaymentMethodsRequest' => 'Famoser\\MBOApiWrapper\\SaleService\\GetCustomPaymentMethodsRequest',
      'GetCustomPaymentMethodsResponse' => 'Famoser\\MBOApiWrapper\\SaleService\\GetCustomPaymentMethodsResponse',
      'GetCustomPaymentMethodsResult' => 'Famoser\\MBOApiWrapper\\SaleService\\GetCustomPaymentMethodsResult',
      'ArrayOfCustomPaymentInfo' => 'Famoser\\MBOApiWrapper\\SaleService\\ArrayOfCustomPaymentInfo',
      'ReturnSale' => 'Famoser\\MBOApiWrapper\\SaleService\\ReturnSale',
      'ReturnSaleRequest' => 'Famoser\\MBOApiWrapper\\SaleService\\ReturnSaleRequest',
      'ReturnSaleResponse' => 'Famoser\\MBOApiWrapper\\SaleService\\ReturnSaleResponse',
      'ReturnSaleResult' => 'Famoser\\MBOApiWrapper\\SaleService\\ReturnSaleResult',
      'UpdateSaleDate' => 'Famoser\\MBOApiWrapper\\SaleService\\UpdateSaleDate',
      'UpdateSaleDateRequest' => 'Famoser\\MBOApiWrapper\\SaleService\\UpdateSaleDateRequest',
      'UpdateSaleDateResponse' => 'Famoser\\MBOApiWrapper\\SaleService\\UpdateSaleDateResponse',
      'UpdateSaleDateResult' => 'Famoser\\MBOApiWrapper\\SaleService\\UpdateSaleDateResult',
    );

    /**
     * @param array $options A array of config values
     * @param string $wsdl The wsdl file to use
     */
    public function __construct(array $options = array(), $wsdl = null)
    {
      foreach (self::$classmap as $key => $value) {
        if (!isset($options['classmap'][$key])) {
          $options['classmap'][$key] = $value;
        }
      }
      $options = array_merge(array (
      'features' => 1,
    ), $options);
      if (!$wsdl) {
        $wsdl = 'https://api.mindbodyonline.com/0_5/SaleService.asmx?WSDL';
      }
      parent::__construct($wsdl, $options);
    }

    /**
     * Gets a list of card types that the site accepts.
     *
     * @param GetAcceptedCardType $parameters
     * @return GetAcceptedCardTypeResponse
     */
    public function GetAcceptedCardType(GetAcceptedCardType $parameters)
    {
      return $this->__soapCall('GetAcceptedCardType', array($parameters));
    }

    /**
     * Validates and completes a sale by processing all items added to a shopping cart.
     *
     * @param CheckoutShoppingCart $parameters
     * @return CheckoutShoppingCartResponse
     */
    public function CheckoutShoppingCart(CheckoutShoppingCart $parameters)
    {
      return $this->__soapCall('CheckoutShoppingCart', array($parameters));
    }

    /**
     * Gets a list of sales.
     *
     * @param GetSales $parameters
     * @return GetSalesResponse
     */
    public function GetSales(GetSales $parameters)
    {
      return $this->__soapCall('GetSales', array($parameters));
    }

    /**
     * Gets a list of services available for sale.
     *
     * @param GetServices $parameters
     * @return GetServicesResponse
     */
    public function GetServices(GetServices $parameters)
    {
      return $this->__soapCall('GetServices', array($parameters));
    }

    /**
     * Update select services information.
     *
     * @param UpdateServices $parameters
     * @return UpdateServicesResponse
     */
    public function UpdateServices(UpdateServices $parameters)
    {
      return $this->__soapCall('UpdateServices', array($parameters));
    }

    /**
     * Gets a list of packages available for sale.
     *
     * @param GetPackages $parameters
     * @return GetPackagesResponse
     */
    public function GetPackages(GetPackages $parameters)
    {
      return $this->__soapCall('GetPackages', array($parameters));
    }

    /**
     * Get a list of products available for sale.
     *
     * @param GetProducts $parameters
     * @return GetProductsResponse
     */
    public function GetProducts(GetProducts $parameters)
    {
      return $this->__soapCall('GetProducts', array($parameters));
    }

    /**
     * Update select products information.
     *
     * @param UpdateProducts $parameters
     * @return UpdateProductsResponse
     */
    public function UpdateProducts(UpdateProducts $parameters)
    {
      return $this->__soapCall('UpdateProducts', array($parameters));
    }

    /**
     * Redeem a Spa Finder Gift Card.
     *
     * @param RedeemSpaFinderWellnessCard $parameters
     * @return RedeemSpaFinderWellnessCardResponse
     */
    public function RedeemSpaFinderWellnessCard(RedeemSpaFinderWellnessCard $parameters)
    {
      return $this->__soapCall('RedeemSpaFinderWellnessCard', array($parameters));
    }

    /**
     * Gets a list of Custom Payment Methods.
     *
     * @param GetCustomPaymentMethods $parameters
     * @return GetCustomPaymentMethodsResponse
     */
    public function GetCustomPaymentMethods(GetCustomPaymentMethods $parameters)
    {
      return $this->__soapCall('GetCustomPaymentMethods', array($parameters));
    }

    /**
     * Return a sale used in business mode. This only supports comp payment method.
     *
     * @param ReturnSale $parameters
     * @return ReturnSaleResponse
     */
    public function ReturnSale(ReturnSale $parameters)
    {
      return $this->__soapCall('ReturnSale', array($parameters));
    }

    /**
     * Modify sale date in business mode
     *
     * @param UpdateSaleDate $parameters
     * @return UpdateSaleDateResponse
     */
    public function UpdateSaleDate(UpdateSaleDate $parameters)
    {
      return $this->__soapCall('UpdateSaleDate', array($parameters));
    }

}
