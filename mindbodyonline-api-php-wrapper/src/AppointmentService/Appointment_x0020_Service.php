<?php

namespace Famoser\MBOApiWrapper\AppointmentService;


/**
 * Provides methods and attributes relating to appointments.
 */
class Appointment_x0020_Service extends \SoapClient
{

    /**
     * @var array $classmap The defined classes
     */
    private static $classmap = array (
      'GetStaffAppointments' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetStaffAppointments',
      'GetStaffAppointmentsRequest' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetStaffAppointmentsRequest',
      'MBRequest' => 'Famoser\\MBOApiWrapper\\AppointmentService\\MBRequest',
      'SourceCredentials' => 'Famoser\\MBOApiWrapper\\AppointmentService\\SourceCredentials',
      'ArrayOfInt' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfInt',
      'UserCredentials' => 'Famoser\\MBOApiWrapper\\AppointmentService\\UserCredentials',
      'ArrayOfString' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfString',
      'StaffCredentials' => 'Famoser\\MBOApiWrapper\\AppointmentService\\StaffCredentials',
      'ArrayOfLong' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfLong',
      'GetStaffAppointmentsResponse' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetStaffAppointmentsResponse',
      'GetStaffAppointmentsResult' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetStaffAppointmentsResult',
      'MBResult' => 'Famoser\\MBOApiWrapper\\AppointmentService\\MBResult',
      'ArrayOfAppointment' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfAppointment',
      'Appointment' => 'Famoser\\MBOApiWrapper\\AppointmentService\\Appointment',
      'ScheduleItem' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ScheduleItem',
      'MBObject' => 'Famoser\\MBOApiWrapper\\AppointmentService\\MBObject',
      'Site' => 'Famoser\\MBOApiWrapper\\AppointmentService\\Site',
      'Resource' => 'Famoser\\MBOApiWrapper\\AppointmentService\\Resource',
      'ClientService' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ClientService',
      'Program' => 'Famoser\\MBOApiWrapper\\AppointmentService\\Program',
      'SalesRep' => 'Famoser\\MBOApiWrapper\\AppointmentService\\SalesRep',
      'Rep' => 'Famoser\\MBOApiWrapper\\AppointmentService\\Rep',
      'Staff' => 'Famoser\\MBOApiWrapper\\AppointmentService\\Staff',
      'ArrayOfUnavailability' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfUnavailability',
      'Unavailability' => 'Famoser\\MBOApiWrapper\\AppointmentService\\Unavailability',
      'ArrayOfAvailability' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfAvailability',
      'Availability' => 'Famoser\\MBOApiWrapper\\AppointmentService\\Availability',
      'SessionType' => 'Famoser\\MBOApiWrapper\\AppointmentService\\SessionType',
      'ArrayOfProgram' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfProgram',
      'Location' => 'Famoser\\MBOApiWrapper\\AppointmentService\\Location',
      'ArrayOfLocation' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfLocation',
      'ArrayOfProviderIDUpdate' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfProviderIDUpdate',
      'ProviderIDUpdate' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ProviderIDUpdate',
      'ClientRelationship' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ClientRelationship',
      'Client' => 'Famoser\\MBOApiWrapper\\AppointmentService\\Client',
      'ArrayOfClientIndex' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfClientIndex',
      'ClientIndex' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ClientIndex',
      'ArrayOfClientIndexValue' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfClientIndexValue',
      'ClientIndexValue' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ClientIndexValue',
      'ClientCreditCard' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ClientCreditCard',
      'ArrayOfClientRelationship' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfClientRelationship',
      'ArrayOfRep' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfRep',
      'ArrayOfSalesRep' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfSalesRep',
      'ArrayOfCustomClientField' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfCustomClientField',
      'CustomClientField' => 'Famoser\\MBOApiWrapper\\AppointmentService\\CustomClientField',
      'Liability' => 'Famoser\\MBOApiWrapper\\AppointmentService\\Liability',
      'ProspectStage' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ProspectStage',
      'Relationship' => 'Famoser\\MBOApiWrapper\\AppointmentService\\Relationship',
      'ArrayOfResource' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfResource',
      'AddOrUpdateAppointments' => 'Famoser\\MBOApiWrapper\\AppointmentService\\AddOrUpdateAppointments',
      'AddOrUpdateAppointmentsRequest' => 'Famoser\\MBOApiWrapper\\AppointmentService\\AddOrUpdateAppointmentsRequest',
      'AddOrUpdateAppointmentsResponse' => 'Famoser\\MBOApiWrapper\\AppointmentService\\AddOrUpdateAppointmentsResponse',
      'AddOrUpdateAppointmentsResult' => 'Famoser\\MBOApiWrapper\\AppointmentService\\AddOrUpdateAppointmentsResult',
      'GetBookableItems' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetBookableItems',
      'GetBookableItemsRequest' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetBookableItemsRequest',
      'GetBookableItemsResponse' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetBookableItemsResponse',
      'GetBookableItemsResult' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetBookableItemsResult',
      'ArrayOfScheduleItem' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfScheduleItem',
      'GetScheduleItems' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetScheduleItems',
      'GetScheduleItemsRequest' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetScheduleItemsRequest',
      'GetScheduleItemsResponse' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetScheduleItemsResponse',
      'GetScheduleItemsResult' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetScheduleItemsResult',
      'ArrayOfStaff' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfStaff',
      'AddOrUpdateAvailabilities' => 'Famoser\\MBOApiWrapper\\AppointmentService\\AddOrUpdateAvailabilities',
      'AddOrUpdateAvailabilitiesRequest' => 'Famoser\\MBOApiWrapper\\AppointmentService\\AddOrUpdateAvailabilitiesRequest',
      'ArrayOfDayOfWeek' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfDayOfWeek',
      'AddOrUpdateAvailabilitiesResponse' => 'Famoser\\MBOApiWrapper\\AppointmentService\\AddOrUpdateAvailabilitiesResponse',
      'AddOrUpdateAvailabilitiesResult' => 'Famoser\\MBOApiWrapper\\AppointmentService\\AddOrUpdateAvailabilitiesResult',
      'GetActiveSessionTimes' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetActiveSessionTimes',
      'GetActiveSessionTimesRequest' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetActiveSessionTimesRequest',
      'GetActiveSessionTimesResponse' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetActiveSessionTimesResponse',
      'GetActiveSessionTimesResult' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetActiveSessionTimesResult',
      'ArrayOfDateTime' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfDateTime',
      'GetAppointmentOptions' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetAppointmentOptions',
      'GetAppointmentOptionsRequest' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetAppointmentOptionsRequest',
      'GetAppointmentOptionsResponse' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetAppointmentOptionsResponse',
      'GetAppointmentOptionsResult' => 'Famoser\\MBOApiWrapper\\AppointmentService\\GetAppointmentOptionsResult',
      'ArrayOfOption' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ArrayOfOption',
      'Option' => 'Famoser\\MBOApiWrapper\\AppointmentService\\Option',
      'ApplyPayment' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ApplyPayment',
      'AppointmentApplyPaymentRequest' => 'Famoser\\MBOApiWrapper\\AppointmentService\\AppointmentApplyPaymentRequest',
      'ApplyPaymentResponse' => 'Famoser\\MBOApiWrapper\\AppointmentService\\ApplyPaymentResponse',
      'AppointmentApplyPaymentResult' => 'Famoser\\MBOApiWrapper\\AppointmentService\\AppointmentApplyPaymentResult',
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
        $wsdl = 'https://api.mindbodyonline.com/0_5/AppointmentService.asmx?WSDL';
      }
      parent::__construct($wsdl, $options);
    }

    /**
     * Gets a list of appointments that a given staff member is instructing.
     *
     * @param GetStaffAppointments $parameters
     * @return GetStaffAppointmentsResponse
     */
    public function GetStaffAppointments(GetStaffAppointments $parameters)
    {
      return $this->__soapCall('GetStaffAppointments', array($parameters));
    }

    /**
     * Adds or updates a list of appointments.
     *
     * @param AddOrUpdateAppointments $parameters
     * @return AddOrUpdateAppointmentsResponse
     */
    public function AddOrUpdateAppointments(AddOrUpdateAppointments $parameters)
    {
      return $this->__soapCall('AddOrUpdateAppointments', array($parameters));
    }

    /**
     * Gets a list of bookable items.
     *
     * @param GetBookableItems $parameters
     * @return GetBookableItemsResponse
     */
    public function GetBookableItems(GetBookableItems $parameters)
    {
      return $this->__soapCall('GetBookableItems', array($parameters));
    }

    /**
     * Gets a list of scheduled items (appointments, availabilities, and unavailabilities).
     *
     * @param GetScheduleItems $parameters
     * @return GetScheduleItemsResponse
     */
    public function GetScheduleItems(GetScheduleItems $parameters)
    {
      return $this->__soapCall('GetScheduleItems', array($parameters));
    }

    /**
     * Adds or updates a list of availabilities.
     *
     * @param AddOrUpdateAvailabilities $parameters
     * @return AddOrUpdateAvailabilitiesResponse
     */
    public function AddOrUpdateAvailabilities(AddOrUpdateAvailabilities $parameters)
    {
      return $this->__soapCall('AddOrUpdateAvailabilities', array($parameters));
    }

    /**
     * Gets a list of times that are active for a given program ID.
     *
     * @param GetActiveSessionTimes $parameters
     * @return GetActiveSessionTimesResponse
     */
    public function GetActiveSessionTimes(GetActiveSessionTimes $parameters)
    {
      return $this->__soapCall('GetActiveSessionTimes', array($parameters));
    }

    /**
     * Gets a list appointment options.
     *
     * @param GetAppointmentOptions $parameters
     * @return GetAppointmentOptionsResponse
     */
    public function GetAppointmentOptions(GetAppointmentOptions $parameters)
    {
      return $this->__soapCall('GetAppointmentOptions', array($parameters));
    }

    /**
     * Apply payment to appointment.
     *
     * @param ApplyPayment $parameters
     * @return ApplyPaymentResponse
     */
    public function ApplyPayment(ApplyPayment $parameters)
    {
      return $this->__soapCall('ApplyPayment', array($parameters));
    }

}
