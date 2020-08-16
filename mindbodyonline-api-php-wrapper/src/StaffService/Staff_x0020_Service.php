<?php

namespace Famoser\MBOApiWrapper\StaffService;


/**
 * Provides methods and attributes relating to staff.
 */
class Staff_x0020_Service extends \SoapClient
{

    /**
     * @var array $classmap The defined classes
     */
    private static $classmap = array (
      'GetStaff' => 'Famoser\\MBOApiWrapper\\StaffService\\GetStaff',
      'GetStaffRequest' => 'Famoser\\MBOApiWrapper\\StaffService\\GetStaffRequest',
      'MBRequest' => 'Famoser\\MBOApiWrapper\\StaffService\\MBRequest',
      'SourceCredentials' => 'Famoser\\MBOApiWrapper\\StaffService\\SourceCredentials',
      'ArrayOfInt' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfInt',
      'UserCredentials' => 'Famoser\\MBOApiWrapper\\StaffService\\UserCredentials',
      'ArrayOfString' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfString',
      'ArrayOfLong' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfLong',
      'StaffCredentials' => 'Famoser\\MBOApiWrapper\\StaffService\\StaffCredentials',
      'ArrayOfStaffFilter' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfStaffFilter',
      'GetStaffResponse' => 'Famoser\\MBOApiWrapper\\StaffService\\GetStaffResponse',
      'GetStaffResult' => 'Famoser\\MBOApiWrapper\\StaffService\\GetStaffResult',
      'MBResult' => 'Famoser\\MBOApiWrapper\\StaffService\\MBResult',
      'ArrayOfStaff' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfStaff',
      'Staff' => 'Famoser\\MBOApiWrapper\\StaffService\\Staff',
      'MBObject' => 'Famoser\\MBOApiWrapper\\StaffService\\MBObject',
      'Site' => 'Famoser\\MBOApiWrapper\\StaffService\\Site',
      'Resource' => 'Famoser\\MBOApiWrapper\\StaffService\\Resource',
      'ClientService' => 'Famoser\\MBOApiWrapper\\StaffService\\ClientService',
      'Program' => 'Famoser\\MBOApiWrapper\\StaffService\\Program',
      'SalesRep' => 'Famoser\\MBOApiWrapper\\StaffService\\SalesRep',
      'Rep' => 'Famoser\\MBOApiWrapper\\StaffService\\Rep',
      'ClientRelationship' => 'Famoser\\MBOApiWrapper\\StaffService\\ClientRelationship',
      'Client' => 'Famoser\\MBOApiWrapper\\StaffService\\Client',
      'ArrayOfClientIndex' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfClientIndex',
      'ClientIndex' => 'Famoser\\MBOApiWrapper\\StaffService\\ClientIndex',
      'ArrayOfClientIndexValue' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfClientIndexValue',
      'ClientIndexValue' => 'Famoser\\MBOApiWrapper\\StaffService\\ClientIndexValue',
      'ClientCreditCard' => 'Famoser\\MBOApiWrapper\\StaffService\\ClientCreditCard',
      'ArrayOfClientRelationship' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfClientRelationship',
      'ArrayOfRep' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfRep',
      'ArrayOfSalesRep' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfSalesRep',
      'ArrayOfCustomClientField' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfCustomClientField',
      'CustomClientField' => 'Famoser\\MBOApiWrapper\\StaffService\\CustomClientField',
      'Liability' => 'Famoser\\MBOApiWrapper\\StaffService\\Liability',
      'ProspectStage' => 'Famoser\\MBOApiWrapper\\StaffService\\ProspectStage',
      'Location' => 'Famoser\\MBOApiWrapper\\StaffService\\Location',
      'Relationship' => 'Famoser\\MBOApiWrapper\\StaffService\\Relationship',
      'SessionType' => 'Famoser\\MBOApiWrapper\\StaffService\\SessionType',
      'ScheduleItem' => 'Famoser\\MBOApiWrapper\\StaffService\\ScheduleItem',
      'Appointment' => 'Famoser\\MBOApiWrapper\\StaffService\\Appointment',
      'ArrayOfResource' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfResource',
      'Unavailability' => 'Famoser\\MBOApiWrapper\\StaffService\\Unavailability',
      'Availability' => 'Famoser\\MBOApiWrapper\\StaffService\\Availability',
      'ArrayOfProgram' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfProgram',
      'ArrayOfAppointment' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfAppointment',
      'ArrayOfUnavailability' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfUnavailability',
      'ArrayOfAvailability' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfAvailability',
      'ArrayOfLocation' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfLocation',
      'ArrayOfProviderIDUpdate' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfProviderIDUpdate',
      'ProviderIDUpdate' => 'Famoser\\MBOApiWrapper\\StaffService\\ProviderIDUpdate',
      'GetStaffPermissions' => 'Famoser\\MBOApiWrapper\\StaffService\\GetStaffPermissions',
      'GetStaffPermissionsRequest' => 'Famoser\\MBOApiWrapper\\StaffService\\GetStaffPermissionsRequest',
      'GetStaffPermissionsResponse' => 'Famoser\\MBOApiWrapper\\StaffService\\GetStaffPermissionsResponse',
      'GetStaffPermissionsResult' => 'Famoser\\MBOApiWrapper\\StaffService\\GetStaffPermissionsResult',
      'ArrayOfPermission' => 'Famoser\\MBOApiWrapper\\StaffService\\ArrayOfPermission',
      'Permission' => 'Famoser\\MBOApiWrapper\\StaffService\\Permission',
      'AddOrUpdateStaff' => 'Famoser\\MBOApiWrapper\\StaffService\\AddOrUpdateStaff',
      'AddOrUpdateStaffRequest' => 'Famoser\\MBOApiWrapper\\StaffService\\AddOrUpdateStaffRequest',
      'AddOrUpdateStaffResponse' => 'Famoser\\MBOApiWrapper\\StaffService\\AddOrUpdateStaffResponse',
      'AddOrUpdateStaffResult' => 'Famoser\\MBOApiWrapper\\StaffService\\AddOrUpdateStaffResult',
      'GetStaffImgURL' => 'Famoser\\MBOApiWrapper\\StaffService\\GetStaffImgURL',
      'GetStaffImgURLRequest' => 'Famoser\\MBOApiWrapper\\StaffService\\GetStaffImgURLRequest',
      'GetStaffImgURLResponse' => 'Famoser\\MBOApiWrapper\\StaffService\\GetStaffImgURLResponse',
      'GetStaffImgURLResult' => 'Famoser\\MBOApiWrapper\\StaffService\\GetStaffImgURLResult',
      'ValidateStaffLogin' => 'Famoser\\MBOApiWrapper\\StaffService\\ValidateStaffLogin',
      'ValidateLoginRequest' => 'Famoser\\MBOApiWrapper\\StaffService\\ValidateLoginRequest',
      'ValidateStaffLoginResponse' => 'Famoser\\MBOApiWrapper\\StaffService\\ValidateStaffLoginResponse',
      'ValidateLoginResult' => 'Famoser\\MBOApiWrapper\\StaffService\\ValidateLoginResult',
      'GetSalesReps' => 'Famoser\\MBOApiWrapper\\StaffService\\GetSalesReps',
      'GetSalesRepsRequest' => 'Famoser\\MBOApiWrapper\\StaffService\\GetSalesRepsRequest',
      'GetSalesRepsResponse' => 'Famoser\\MBOApiWrapper\\StaffService\\GetSalesRepsResponse',
      'GetSalesRepsResult' => 'Famoser\\MBOApiWrapper\\StaffService\\GetSalesRepsResult',
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
        $wsdl = 'https://api.mindbodyonline.com/0_5/StaffService.asmx?WSDL';
      }
      parent::__construct($wsdl, $options);
    }

    /**
     * Gets a list of staff members.
     *
     * @param GetStaff $parameters
     * @return GetStaffResponse
     */
    public function GetStaff(GetStaff $parameters)
    {
      return $this->__soapCall('GetStaff', array($parameters));
    }

    /**
     * Gets a list of staff permissions based on the given staff member.
     *
     * @param GetStaffPermissions $parameters
     * @return GetStaffPermissionsResponse
     */
    public function GetStaffPermissions(GetStaffPermissions $parameters)
    {
      return $this->__soapCall('GetStaffPermissions', array($parameters));
    }

    /**
     * Add or update staff.
     *
     * @param AddOrUpdateStaff $parameters
     * @return AddOrUpdateStaffResponse
     */
    public function AddOrUpdateStaff(AddOrUpdateStaff $parameters)
    {
      return $this->__soapCall('AddOrUpdateStaff', array($parameters));
    }

    /**
     * Gets a staff member's image URL if it exists.
     *
     * @param GetStaffImgURL $parameters
     * @return GetStaffImgURLResponse
     */
    public function GetStaffImgURL(GetStaffImgURL $parameters)
    {
      return $this->__soapCall('GetStaffImgURL', array($parameters));
    }

    /**
     * Validates a username and password. This method returns the staff on success.
     *
     * @param ValidateStaffLogin $parameters
     * @return ValidateStaffLoginResponse
     */
    public function ValidateStaffLogin(ValidateStaffLogin $parameters)
    {
      return $this->__soapCall('ValidateStaffLogin', array($parameters));
    }

    /**
     * Gets a list of sales reps based on the requested rep IDs
     *
     * @param GetSalesReps $parameters
     * @return GetSalesRepsResponse
     */
    public function GetSalesReps(GetSalesReps $parameters)
    {
      return $this->__soapCall('GetSalesReps', array($parameters));
    }

}
