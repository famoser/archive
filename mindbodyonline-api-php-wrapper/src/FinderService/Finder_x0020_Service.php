<?php

namespace Famoser\MBOApiWrapper\FinderService;


/**
 * Provides methods and attributes relating to clients.
 */
class Finder_x0020_Service extends \SoapClient
{

    /**
     * @var array $classmap The defined classes
     */
    private static $classmap = array (
      'GetClassesWithinRadius' => 'Famoser\\MBOApiWrapper\\FinderService\\GetClassesWithinRadius',
      'GetClassesWithinRadiusRequest' => 'Famoser\\MBOApiWrapper\\FinderService\\GetClassesWithinRadiusRequest',
      'MBRequest' => 'Famoser\\MBOApiWrapper\\FinderService\\MBRequest',
      'SourceCredentials' => 'Famoser\\MBOApiWrapper\\FinderService\\SourceCredentials',
      'ArrayOfInt' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfInt',
      'UserCredentials' => 'Famoser\\MBOApiWrapper\\FinderService\\UserCredentials',
      'ArrayOfString' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfString',
      'GetClassesWithinRadiusResponse' => 'Famoser\\MBOApiWrapper\\FinderService\\GetClassesWithinRadiusResponse',
      'GetClassesWithinRadiusResult' => 'Famoser\\MBOApiWrapper\\FinderService\\GetClassesWithinRadiusResult',
      'MBResult' => 'Famoser\\MBOApiWrapper\\FinderService\\MBResult',
      'ArrayOfFinderClass' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfFinderClass',
      'FinderClass' => 'Famoser\\MBOApiWrapper\\FinderService\\FinderClass',
      'Organization' => 'Famoser\\MBOApiWrapper\\FinderService\\Organization',
      'Site' => 'Famoser\\MBOApiWrapper\\FinderService\\Site',
      'FinderSessionType' => 'Famoser\\MBOApiWrapper\\FinderService\\FinderSessionType',
      'Location' => 'Famoser\\MBOApiWrapper\\FinderService\\Location',
      'MBObject' => 'Famoser\\MBOApiWrapper\\FinderService\\MBObject',
      'Resource' => 'Famoser\\MBOApiWrapper\\FinderService\\Resource',
      'ClientService' => 'Famoser\\MBOApiWrapper\\FinderService\\ClientService',
      'Program' => 'Famoser\\MBOApiWrapper\\FinderService\\Program',
      'SalesRep' => 'Famoser\\MBOApiWrapper\\FinderService\\SalesRep',
      'Rep' => 'Famoser\\MBOApiWrapper\\FinderService\\Rep',
      'Staff' => 'Famoser\\MBOApiWrapper\\FinderService\\Staff',
      'ArrayOfAppointment' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfAppointment',
      'Appointment' => 'Famoser\\MBOApiWrapper\\FinderService\\Appointment',
      'ScheduleItem' => 'Famoser\\MBOApiWrapper\\FinderService\\ScheduleItem',
      'Unavailability' => 'Famoser\\MBOApiWrapper\\FinderService\\Unavailability',
      'Availability' => 'Famoser\\MBOApiWrapper\\FinderService\\Availability',
      'SessionType' => 'Famoser\\MBOApiWrapper\\FinderService\\SessionType',
      'ArrayOfProgram' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfProgram',
      'Client' => 'Famoser\\MBOApiWrapper\\FinderService\\Client',
      'ArrayOfClientIndex' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfClientIndex',
      'ClientIndex' => 'Famoser\\MBOApiWrapper\\FinderService\\ClientIndex',
      'ArrayOfClientIndexValue' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfClientIndexValue',
      'ClientIndexValue' => 'Famoser\\MBOApiWrapper\\FinderService\\ClientIndexValue',
      'ClientCreditCard' => 'Famoser\\MBOApiWrapper\\FinderService\\ClientCreditCard',
      'ArrayOfClientRelationship' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfClientRelationship',
      'ClientRelationship' => 'Famoser\\MBOApiWrapper\\FinderService\\ClientRelationship',
      'Relationship' => 'Famoser\\MBOApiWrapper\\FinderService\\Relationship',
      'ArrayOfRep' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfRep',
      'ArrayOfSalesRep' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfSalesRep',
      'ArrayOfCustomClientField' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfCustomClientField',
      'CustomClientField' => 'Famoser\\MBOApiWrapper\\FinderService\\CustomClientField',
      'Liability' => 'Famoser\\MBOApiWrapper\\FinderService\\Liability',
      'ProspectStage' => 'Famoser\\MBOApiWrapper\\FinderService\\ProspectStage',
      'ArrayOfResource' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfResource',
      'ArrayOfUnavailability' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfUnavailability',
      'ArrayOfAvailability' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfAvailability',
      'ArrayOfLocation' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfLocation',
      'ArrayOfProviderIDUpdate' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfProviderIDUpdate',
      'ProviderIDUpdate' => 'Famoser\\MBOApiWrapper\\FinderService\\ProviderIDUpdate',
      'GetSessionTypesWithinRadius' => 'Famoser\\MBOApiWrapper\\FinderService\\GetSessionTypesWithinRadius',
      'GetSessionTypesWithinRadiusRequest' => 'Famoser\\MBOApiWrapper\\FinderService\\GetSessionTypesWithinRadiusRequest',
      'GetSessionTypesWithinRadiusResponse' => 'Famoser\\MBOApiWrapper\\FinderService\\GetSessionTypesWithinRadiusResponse',
      'GetSessionTypesWithinRadiusResult' => 'Famoser\\MBOApiWrapper\\FinderService\\GetSessionTypesWithinRadiusResult',
      'ArrayOfFinderAppointment' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfFinderAppointment',
      'FinderAppointment' => 'Famoser\\MBOApiWrapper\\FinderService\\FinderAppointment',
      'GetBusinessLocationsWithinRadius' => 'Famoser\\MBOApiWrapper\\FinderService\\GetBusinessLocationsWithinRadius',
      'GetBusinessLocationsWithinRadiusRequest' => 'Famoser\\MBOApiWrapper\\FinderService\\GetBusinessLocationsWithinRadiusRequest',
      'GetBusinessLocationsWithinRadiusResponse' => 'Famoser\\MBOApiWrapper\\FinderService\\GetBusinessLocationsWithinRadiusResponse',
      'GetBusinessLocationsWithinRadiusResult' => 'Famoser\\MBOApiWrapper\\FinderService\\GetBusinessLocationsWithinRadiusResult',
      'FinderCheckoutShoppingCart' => 'Famoser\\MBOApiWrapper\\FinderService\\FinderCheckoutShoppingCart',
      'FinderCheckoutShoppingCartRequest' => 'Famoser\\MBOApiWrapper\\FinderService\\FinderCheckoutShoppingCartRequest',
      'SpaFinderWellnessCard' => 'Famoser\\MBOApiWrapper\\FinderService\\SpaFinderWellnessCard',
      'PaymentInfo' => 'Famoser\\MBOApiWrapper\\FinderService\\PaymentInfo',
      'GiftCardInfo' => 'Famoser\\MBOApiWrapper\\FinderService\\GiftCardInfo',
      'CheckInfo' => 'Famoser\\MBOApiWrapper\\FinderService\\CheckInfo',
      'CashInfo' => 'Famoser\\MBOApiWrapper\\FinderService\\CashInfo',
      'CompInfo' => 'Famoser\\MBOApiWrapper\\FinderService\\CompInfo',
      'TrackDataInfo' => 'Famoser\\MBOApiWrapper\\FinderService\\TrackDataInfo',
      'StoredCardInfo' => 'Famoser\\MBOApiWrapper\\FinderService\\StoredCardInfo',
      'EncryptedTrackDataInfo' => 'Famoser\\MBOApiWrapper\\FinderService\\EncryptedTrackDataInfo',
      'CustomPaymentInfo' => 'Famoser\\MBOApiWrapper\\FinderService\\CustomPaymentInfo',
      'DebitAccountInfo' => 'Famoser\\MBOApiWrapper\\FinderService\\DebitAccountInfo',
      'CreditCardInfo' => 'Famoser\\MBOApiWrapper\\FinderService\\CreditCardInfo',
      'FinderCheckoutShoppingCartResponse' => 'Famoser\\MBOApiWrapper\\FinderService\\FinderCheckoutShoppingCartResponse',
      'FinderCheckoutShoppingCartResult' => 'Famoser\\MBOApiWrapper\\FinderService\\FinderCheckoutShoppingCartResult',
      'ShoppingCart' => 'Famoser\\MBOApiWrapper\\FinderService\\ShoppingCart',
      'ArrayOfCartItem' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfCartItem',
      'CartItem' => 'Famoser\\MBOApiWrapper\\FinderService\\CartItem',
      'Item' => 'Famoser\\MBOApiWrapper\\FinderService\\Item',
      'Tip' => 'Famoser\\MBOApiWrapper\\FinderService\\Tip',
      'Package' => 'Famoser\\MBOApiWrapper\\FinderService\\Package',
      'ArrayOfService' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfService',
      'Service' => 'Famoser\\MBOApiWrapper\\FinderService\\Service',
      'ArrayOfProduct' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfProduct',
      'Product' => 'Famoser\\MBOApiWrapper\\FinderService\\Product',
      'Color' => 'Famoser\\MBOApiWrapper\\FinderService\\Color',
      'Size' => 'Famoser\\MBOApiWrapper\\FinderService\\Size',
      'ArrayOfLong' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfLong',
      'ArrayOfClass' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfClass',
      'Class' => 'Famoser\\MBOApiWrapper\\FinderService\\ClassCustom',
      'ArrayOfVisit' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfVisit',
      'Visit' => 'Famoser\\MBOApiWrapper\\FinderService\\Visit',
      'ArrayOfClient' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfClient',
      'ClassDescription' => 'Famoser\\MBOApiWrapper\\FinderService\\ClassDescription',
      'Level' => 'Famoser\\MBOApiWrapper\\FinderService\\Level',
      'AddOrUpdateFinderUsers' => 'Famoser\\MBOApiWrapper\\FinderService\\AddOrUpdateFinderUsers',
      'AddOrUpdateFinderUsersRequest' => 'Famoser\\MBOApiWrapper\\FinderService\\AddOrUpdateFinderUsersRequest',
      'ArrayOfFinderUser' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfFinderUser',
      'FinderUser' => 'Famoser\\MBOApiWrapper\\FinderService\\FinderUser',
      'ArrayOfClientCreditCard' => 'Famoser\\MBOApiWrapper\\FinderService\\ArrayOfClientCreditCard',
      'AddOrUpdateFinderUsersResponse' => 'Famoser\\MBOApiWrapper\\FinderService\\AddOrUpdateFinderUsersResponse',
      'AddOrUpdateFinderUsersResult' => 'Famoser\\MBOApiWrapper\\FinderService\\AddOrUpdateFinderUsersResult',
      'GetFinderUser' => 'Famoser\\MBOApiWrapper\\FinderService\\GetFinderUser',
      'GetFinderUserRequest' => 'Famoser\\MBOApiWrapper\\FinderService\\GetFinderUserRequest',
      'GetFinderUserResponse' => 'Famoser\\MBOApiWrapper\\FinderService\\GetFinderUserResponse',
      'GetFinderUserResult' => 'Famoser\\MBOApiWrapper\\FinderService\\GetFinderUserResult',
      'SendFinderUserNewPassword' => 'Famoser\\MBOApiWrapper\\FinderService\\SendFinderUserNewPassword',
      'SendFinderUserNewPasswordRequest' => 'Famoser\\MBOApiWrapper\\FinderService\\SendFinderUserNewPasswordRequest',
      'SendFinderUserNewPasswordResponse' => 'Famoser\\MBOApiWrapper\\FinderService\\SendFinderUserNewPasswordResponse',
      'SendFinderUserNewPasswordResult' => 'Famoser\\MBOApiWrapper\\FinderService\\SendFinderUserNewPasswordResult',
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
        $wsdl = 'https://api.mindbodyonline.com/0_5/FinderService.asmx?WSDL';
      }
      parent::__construct($wsdl, $options);
    }

    /**
     * Gets finder classes within a given radius.
     *
     * @param GetClassesWithinRadius $parameters
     * @return GetClassesWithinRadiusResponse
     */
    public function GetClassesWithinRadius(GetClassesWithinRadius $parameters)
    {
      return $this->__soapCall('GetClassesWithinRadius', array($parameters));
    }

    /**
     * Gets finder classes within a given radius.
     *
     * @param GetSessionTypesWithinRadius $parameters
     * @return GetSessionTypesWithinRadiusResponse
     */
    public function GetSessionTypesWithinRadius(GetSessionTypesWithinRadius $parameters)
    {
      return $this->__soapCall('GetSessionTypesWithinRadius', array($parameters));
    }

    /**
     * Gets available locations within a given radius.
     *
     * @param GetBusinessLocationsWithinRadius $parameters
     * @return GetBusinessLocationsWithinRadiusResponse
     */
    public function GetBusinessLocationsWithinRadius(GetBusinessLocationsWithinRadius $parameters)
    {
      return $this->__soapCall('GetBusinessLocationsWithinRadius', array($parameters));
    }

    /**
     * Validates and completes a sale by processing all items added to a shopping cart.
     *
     * @param FinderCheckoutShoppingCart $parameters
     * @return FinderCheckoutShoppingCartResponse
     */
    public function FinderCheckoutShoppingCart(FinderCheckoutShoppingCart $parameters)
    {
      return $this->__soapCall('FinderCheckoutShoppingCart', array($parameters));
    }

    /**
     * Adds a Finder user. If a site ID and a location ID are provided the client will also be added to the site.
     *
     * @param AddOrUpdateFinderUsers $parameters
     * @return AddOrUpdateFinderUsersResponse
     */
    public function AddOrUpdateFinderUsers(AddOrUpdateFinderUsers $parameters)
    {
      return $this->__soapCall('AddOrUpdateFinderUsers', array($parameters));
    }

    /**
     * Gets a Finder user.
     *
     * @param GetFinderUser $parameters
     * @return GetFinderUserResponse
     */
    public function GetFinderUser(GetFinderUser $parameters)
    {
      return $this->__soapCall('GetFinderUser', array($parameters));
    }

    /**
     * Sends the finder user a new password.
     *
     * @param SendFinderUserNewPassword $parameters
     * @return SendFinderUserNewPasswordResponse
     */
    public function SendFinderUserNewPassword(SendFinderUserNewPassword $parameters)
    {
      return $this->__soapCall('SendFinderUserNewPassword', array($parameters));
    }

}
