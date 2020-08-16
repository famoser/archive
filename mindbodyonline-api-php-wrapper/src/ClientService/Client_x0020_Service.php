<?php

namespace Famoser\MBOApiWrapper\ClientService;


/**
 * Provides methods and attributes relating to clients.
 */
class Client_x0020_Service extends \SoapClient
{

    /**
     * @var array $classmap The defined classes
     */
    private static $classmap = array(
        'AddArrival' => 'Famoser\\MBOApiWrapper\\ClientService\\AddArrival',
        'AddArrivalRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\AddArrivalRequest',
        'MBRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\MBRequest',
        'SourceCredentials' => 'Famoser\\MBOApiWrapper\\ClientService\\SourceCredentials',
        'ArrayOfInt' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfInt',
        'UserCredentials' => 'Famoser\\MBOApiWrapper\\ClientService\\UserCredentials',
        'ArrayOfString' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfString',
        'AddArrivalResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\AddArrivalResponse',
        'AddArrivalResult' => 'Famoser\\MBOApiWrapper\\ClientService\\AddArrivalResult',
        'MBResult' => 'Famoser\\MBOApiWrapper\\ClientService\\MBResult',
        'ClientService' => 'Famoser\\MBOApiWrapper\\ClientService\\ClientService',
        'MBObject' => 'Famoser\\MBOApiWrapper\\ClientService\\MBObject',
        'Site' => 'Famoser\\MBOApiWrapper\\ClientService\\Site',
        'Program' => 'Famoser\\MBOApiWrapper\\ClientService\\Program',
        'AddOrUpdateClients' => 'Famoser\\MBOApiWrapper\\ClientService\\AddOrUpdateClients',
        'AddOrUpdateClientsRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\AddOrUpdateClientsRequest',
        'ArrayOfClient' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfClient',
        'Client' => 'Famoser\\MBOApiWrapper\\ClientService\\Client',
        'ArrayOfClientIndex' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfClientIndex',
        'ClientIndex' => 'Famoser\\MBOApiWrapper\\ClientService\\ClientIndex',
        'ArrayOfClientIndexValue' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfClientIndexValue',
        'ClientIndexValue' => 'Famoser\\MBOApiWrapper\\ClientService\\ClientIndexValue',
        'ClientCreditCard' => 'Famoser\\MBOApiWrapper\\ClientService\\ClientCreditCard',
        'ArrayOfClientRelationship' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfClientRelationship',
        'ClientRelationship' => 'Famoser\\MBOApiWrapper\\ClientService\\ClientRelationship',
        'Relationship' => 'Famoser\\MBOApiWrapper\\ClientService\\Relationship',
        'ArrayOfRep' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfRep',
        'Rep' => 'Famoser\\MBOApiWrapper\\ClientService\\Rep',
        'Staff' => 'Famoser\\MBOApiWrapper\\ClientService\\Staff',
        'ArrayOfAppointment' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfAppointment',
        'Appointment' => 'Famoser\\MBOApiWrapper\\ClientService\\Appointment',
        'ScheduleItem' => 'Famoser\\MBOApiWrapper\\ClientService\\ScheduleItem',
        'Unavailability' => 'Famoser\\MBOApiWrapper\\ClientService\\Unavailability',
        'Availability' => 'Famoser\\MBOApiWrapper\\ClientService\\Availability',
        'SessionType' => 'Famoser\\MBOApiWrapper\\ClientService\\SessionType',
        'ArrayOfProgram' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfProgram',
        'Location' => 'Famoser\\MBOApiWrapper\\ClientService\\Location',
        'ArrayOfResource' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfResource',
        'Resource' => 'Famoser\\MBOApiWrapper\\ClientService\\Resource',
        'ArrayOfUnavailability' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfUnavailability',
        'ArrayOfAvailability' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfAvailability',
        'ArrayOfLocation' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfLocation',
        'ArrayOfProviderIDUpdate' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfProviderIDUpdate',
        'ProviderIDUpdate' => 'Famoser\\MBOApiWrapper\\ClientService\\ProviderIDUpdate',
        'ArrayOfSalesRep' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfSalesRep',
        'SalesRep' => 'Famoser\\MBOApiWrapper\\ClientService\\SalesRep',
        'ArrayOfCustomClientField' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfCustomClientField',
        'CustomClientField' => 'Famoser\\MBOApiWrapper\\ClientService\\CustomClientField',
        'Liability' => 'Famoser\\MBOApiWrapper\\ClientService\\Liability',
        'ProspectStage' => 'Famoser\\MBOApiWrapper\\ClientService\\ProspectStage',
        'AddOrUpdateClientsResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\AddOrUpdateClientsResponse',
        'AddOrUpdateClientsResult' => 'Famoser\\MBOApiWrapper\\ClientService\\AddOrUpdateClientsResult',
        'GetClients' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClients',
        'GetClientsRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientsRequest',
        'GetClientsResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientsResponse',
        'GetClientsResult' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientsResult',
        'GetCustomClientFields' => 'Famoser\\MBOApiWrapper\\ClientService\\GetCustomClientFields',
        'GetCustomClientFieldsRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\GetCustomClientFieldsRequest',
        'GetCustomClientFieldsResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\GetCustomClientFieldsResponse',
        'GetCustomClientFieldsResult' => 'Famoser\\MBOApiWrapper\\ClientService\\GetCustomClientFieldsResult',
        'GetClientIndexes' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientIndexes',
        'GetClientIndexesRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientIndexesRequest',
        'GetClientIndexesResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientIndexesResponse',
        'GetClientIndexesResult' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientIndexesResult',
        'GetClientContactLogs' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientContactLogs',
        'GetClientContactLogsRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientContactLogsRequest',
        'ArrayOfLong' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfLong',
        'GetClientContactLogsResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientContactLogsResponse',
        'GetClientContactLogsResult' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientContactLogsResult',
        'ArrayOfContactLog' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfContactLog',
        'ContactLog' => 'Famoser\\MBOApiWrapper\\ClientService\\ContactLog',
        'ArrayOfContactLogComment' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfContactLogComment',
        'ContactLogComment' => 'Famoser\\MBOApiWrapper\\ClientService\\ContactLogComment',
        'ArrayOfContactLogType' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfContactLogType',
        'ContactLogType' => 'Famoser\\MBOApiWrapper\\ClientService\\ContactLogType',
        'ArrayOfContactLogSubtype' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfContactLogSubtype',
        'ContactLogSubtype' => 'Famoser\\MBOApiWrapper\\ClientService\\ContactLogSubtype',
        'AddOrUpdateContactLogs' => 'Famoser\\MBOApiWrapper\\ClientService\\AddOrUpdateContactLogs',
        'AddOrUpdateContactLogsRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\AddOrUpdateContactLogsRequest',
        'AddOrUpdateContactLogsResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\AddOrUpdateContactLogsResponse',
        'AddOrUpdateContactLogsResult' => 'Famoser\\MBOApiWrapper\\ClientService\\AddOrUpdateContactLogsResult',
        'GetContactLogTypes' => 'Famoser\\MBOApiWrapper\\ClientService\\GetContactLogTypes',
        'GetContactLogTypesRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\GetContactLogTypesRequest',
        'GetContactLogTypesResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\GetContactLogTypesResponse',
        'GetContactLogTypesResult' => 'Famoser\\MBOApiWrapper\\ClientService\\GetContactLogTypesResult',
        'UploadClientDocument' => 'Famoser\\MBOApiWrapper\\ClientService\\UploadClientDocument',
        'UploadClientDocumentRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\UploadClientDocumentRequest',
        'UploadClientDocumentResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\UploadClientDocumentResponse',
        'UploadClientDocumentResult' => 'Famoser\\MBOApiWrapper\\ClientService\\UploadClientDocumentResult',
        'UploadClientPhoto' => 'Famoser\\MBOApiWrapper\\ClientService\\UploadClientPhoto',
        'UploadClientPhotoRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\UploadClientPhotoRequest',
        'UploadClientPhotoResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\UploadClientPhotoResponse',
        'UploadClientPhotoResult' => 'Famoser\\MBOApiWrapper\\ClientService\\UploadClientPhotoResult',
        'GetClientFormulaNotes' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientFormulaNotes',
        'GetClientFormulaNotesRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientFormulaNotesRequest',
        'GetClientFormulaNotesResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientFormulaNotesResponse',
        'GetClientFormulaNotesResult' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientFormulaNotesResult',
        'ArrayOfFormulaNote' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfFormulaNote',
        'FormulaNote' => 'Famoser\\MBOApiWrapper\\ClientService\\FormulaNote',
        'AddClientFormulaNote' => 'Famoser\\MBOApiWrapper\\ClientService\\AddClientFormulaNote',
        'AddClientFormulaNoteRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\AddClientFormulaNoteRequest',
        'AddClientFormulaNoteResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\AddClientFormulaNoteResponse',
        'AddClientFormulaNoteResult' => 'Famoser\\MBOApiWrapper\\ClientService\\AddClientFormulaNoteResult',
        'DeleteClientFormulaNote' => 'Famoser\\MBOApiWrapper\\ClientService\\DeleteClientFormulaNote',
        'DeleteCientFormulaNoteRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\DeleteCientFormulaNoteRequest',
        'DeleteClientFormulaNoteResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\DeleteClientFormulaNoteResponse',
        'DeleteClientFormulaNoteResult' => 'Famoser\\MBOApiWrapper\\ClientService\\DeleteClientFormulaNoteResult',
        'GetClientReferralTypes' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientReferralTypes',
        'GetClientReferralTypesRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientReferralTypesRequest',
        'GetClientReferralTypesResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientReferralTypesResponse',
        'GetClientReferralTypesResult' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientReferralTypesResult',
        'GetActiveClientMemberships' => 'Famoser\\MBOApiWrapper\\ClientService\\GetActiveClientMemberships',
        'GetActiveClientMembershipsRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\GetActiveClientMembershipsRequest',
        'GetActiveClientMembershipsResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\GetActiveClientMembershipsResponse',
        'GetActiveClientMembershipsResult' => 'Famoser\\MBOApiWrapper\\ClientService\\GetActiveClientMembershipsResult',
        'ArrayOfClientMembership' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfClientMembership',
        'ClientMembership' => 'Famoser\\MBOApiWrapper\\ClientService\\ClientMembership',
        'GetClientContracts' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientContracts',
        'GetClientContractsRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientContractsRequest',
        'GetClientContractsResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientContractsResponse',
        'GetClientContractsResult' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientContractsResult',
        'ArrayOfClientContract' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfClientContract',
        'ClientContract' => 'Famoser\\MBOApiWrapper\\ClientService\\ClientContract',
        'GetClientAccountBalances' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientAccountBalances',
        'GetClientAccountBalancesRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientAccountBalancesRequest',
        'GetClientAccountBalancesResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientAccountBalancesResponse',
        'GetClientAccountBalancesResult' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientAccountBalancesResult',
        'GetClientServices' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientServices',
        'GetClientServicesRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientServicesRequest',
        'GetClientServicesResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientServicesResponse',
        'GetClientServicesResult' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientServicesResult',
        'ArrayOfClientService' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfClientService',
        'GetClientVisits' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientVisits',
        'GetClientVisitsRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientVisitsRequest',
        'GetClientVisitsResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientVisitsResponse',
        'GetClientVisitsResult' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientVisitsResult',
        'ArrayOfVisit' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfVisit',
        'Visit' => 'Famoser\\MBOApiWrapper\\ClientService\\Visit',
        'GetClientPurchases' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientPurchases',
        'GetClientPurchasesRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientPurchasesRequest',
        'GetClientPurchasesResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientPurchasesResponse',
        'GetClientPurchasesResult' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientPurchasesResult',
        'ArrayOfSaleItem' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfSaleItem',
        'SaleItem' => 'Famoser\\MBOApiWrapper\\ClientService\\SaleItem',
        'Sale' => 'Famoser\\MBOApiWrapper\\ClientService\\Sale',
        'ArrayOfPayment' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfPayment',
        'Payment' => 'Famoser\\MBOApiWrapper\\ClientService\\Payment',
        'GetClientSchedule' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientSchedule',
        'GetClientScheduleRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientScheduleRequest',
        'GetClientScheduleResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientScheduleResponse',
        'GetClientScheduleResult' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientScheduleResult',
        'GetRequiredClientFields' => 'Famoser\\MBOApiWrapper\\ClientService\\GetRequiredClientFields',
        'GetRequiredClientFieldsRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\GetRequiredClientFieldsRequest',
        'GetRequiredClientFieldsResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\GetRequiredClientFieldsResponse',
        'GetRequiredClientFieldsResult' => 'Famoser\\MBOApiWrapper\\ClientService\\GetRequiredClientFieldsResult',
        'ValidateLogin' => 'Famoser\\MBOApiWrapper\\ClientService\\ValidateLogin',
        'ValidateLoginRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\ValidateLoginRequest',
        'ValidateLoginResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\ValidateLoginResponse',
        'ValidateLoginResult' => 'Famoser\\MBOApiWrapper\\ClientService\\ValidateLoginResult',
        'UpdateClientServices' => 'Famoser\\MBOApiWrapper\\ClientService\\UpdateClientServices',
        'UpdateClientServicesRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\UpdateClientServicesRequest',
        'UpdateClientServicesResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\UpdateClientServicesResponse',
        'UpdateClientServicesResult' => 'Famoser\\MBOApiWrapper\\ClientService\\UpdateClientServicesResult',
        'SendUserNewPassword' => 'Famoser\\MBOApiWrapper\\ClientService\\SendUserNewPassword',
        'ClientSendUserNewPasswordRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\ClientSendUserNewPasswordRequest',
        'SendUserNewPasswordResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\SendUserNewPasswordResponse',
        'ClientSendUserNewPasswordResult' => 'Famoser\\MBOApiWrapper\\ClientService\\ClientSendUserNewPasswordResult',
        'GetClientRelationships' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientRelationships',
        'GetClientRelationshipsRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientRelationshipsRequest',
        'GetClientRelationshipsResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientRelationshipsResponse',
        'GetClientRelationshipsResult' => 'Famoser\\MBOApiWrapper\\ClientService\\GetClientRelationshipsResult',
        'ArrayOfConsumerRelationship' => 'Famoser\\MBOApiWrapper\\ClientService\\ArrayOfConsumerRelationship',
        'ConsumerRelationship' => 'Famoser\\MBOApiWrapper\\ClientService\\ConsumerRelationship',
        'AddClientRelationships' => 'Famoser\\MBOApiWrapper\\ClientService\\AddClientRelationships',
        'AddClientRelationshipsRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\AddClientRelationshipsRequest',
        'AddClientRelationshipsResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\AddClientRelationshipsResponse',
        'AddClientRelationshipsResult' => 'Famoser\\MBOApiWrapper\\ClientService\\AddClientRelationshipsResult',
        'DeleteClientRelationships' => 'Famoser\\MBOApiWrapper\\ClientService\\DeleteClientRelationships',
        'DeleteClientRelationshipsRequest' => 'Famoser\\MBOApiWrapper\\ClientService\\DeleteClientRelationshipsRequest',
        'DeleteClientRelationshipsResponse' => 'Famoser\\MBOApiWrapper\\ClientService\\DeleteClientRelationshipsResponse',
        'DeleteClientRelationshipsResult' => 'Famoser\\MBOApiWrapper\\ClientService\\DeleteClientRelationshipsResult',
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
        $options = array_merge(array(
            'features' => 1,
            'trace' => 1
        ), $options);
        if (!$wsdl) {
            $wsdl = 'https://api.mindbodyonline.com/0_5/ClientService.asmx?WSDL';
        }
        parent::__construct($wsdl, $options);
    }

    /**
     * Adds an arrival record for the given client.
     *
     * @param AddArrival $parameters
     * @return AddArrivalResponse
     */
    public function AddArrival(AddArrival $parameters)
    {
        return $this->__soapCall('AddArrival', array($parameters));
    }

    /**
     * Adds or updates information for a list of clients.
     *
     * @param AddOrUpdateClients $parameters
     * @return AddOrUpdateClientsResponse
     */
    public function AddOrUpdateClients(AddOrUpdateClients $parameters)
    {
        return $this->__soapCall('AddOrUpdateClients', array($parameters));
    }

    /**
     * Gets a list of clients.
     *
     * @param GetClients $parameters
     * @return GetClientsResponse
     */
    public function GetClients(GetClients $parameters)
    {
        return $this->__soapCall('GetClients', array($parameters));
    }

    /**
     * Gets a list of currently available client indexes.
     *
     * @param GetCustomClientFields $parameters
     * @return GetCustomClientFieldsResponse
     */
    public function GetCustomClientFields(GetCustomClientFields $parameters)
    {
        return $this->__soapCall('GetCustomClientFields', array($parameters));
    }

    /**
     * Gets a list of currently available client indexes.
     *
     * @param GetClientIndexes $parameters
     * @return GetClientIndexesResponse
     */
    public function GetClientIndexes(GetClientIndexes $parameters)
    {
        return $this->__soapCall('GetClientIndexes', array($parameters));
    }

    /**
     * Get contact logs for a client.
     *
     * @param GetClientContactLogs $parameters
     * @return GetClientContactLogsResponse
     */
    public function GetClientContactLogs(GetClientContactLogs $parameters)
    {
        return $this->__soapCall('GetClientContactLogs', array($parameters));
    }

    /**
     * Add or update client contact logs.
     *
     * @param AddOrUpdateContactLogs $parameters
     * @return AddOrUpdateContactLogsResponse
     */
    public function AddOrUpdateContactLogs(AddOrUpdateContactLogs $parameters)
    {
        return $this->__soapCall('AddOrUpdateContactLogs', array($parameters));
    }

    /**
     * Get contact log types for a client.
     *
     * @param GetContactLogTypes $parameters
     * @return GetContactLogTypesResponse
     */
    public function GetContactLogTypes(GetContactLogTypes $parameters)
    {
        return $this->__soapCall('GetContactLogTypes', array($parameters));
    }

    /**
     * Upload a client document.
     *
     * @param UploadClientDocument $parameters
     * @return UploadClientDocumentResponse
     */
    public function UploadClientDocument(UploadClientDocument $parameters)
    {
        return $this->__soapCall('UploadClientDocument', array($parameters));
    }

    /**
     * Upload a client photo.
     *
     * @param UploadClientPhoto $parameters
     * @return UploadClientPhotoResponse
     */
    public function UploadClientPhoto(UploadClientPhoto $parameters)
    {
        return $this->__soapCall('UploadClientPhoto', array($parameters));
    }

    /**
     * Gets a list of client formula notes.
     *
     * @param GetClientFormulaNotes $parameters
     * @return GetClientFormulaNotesResponse
     */
    public function GetClientFormulaNotes(GetClientFormulaNotes $parameters)
    {
        return $this->__soapCall('GetClientFormulaNotes', array($parameters));
    }

    /**
     * Adds a formula note to a client.
     *
     * @param AddClientFormulaNote $parameters
     * @return AddClientFormulaNoteResponse
     */
    public function AddClientFormulaNote(AddClientFormulaNote $parameters)
    {
        return $this->__soapCall('AddClientFormulaNote', array($parameters));
    }

    /**
     * Deletes a formula note to a client.
     *
     * @param DeleteClientFormulaNote $parameters
     * @return DeleteClientFormulaNoteResponse
     */
    public function DeleteClientFormulaNote(DeleteClientFormulaNote $parameters)
    {
        return $this->__soapCall('DeleteClientFormulaNote', array($parameters));
    }

    /**
     * Gets a list of clients.
     *
     * @param GetClientReferralTypes $parameters
     * @return GetClientReferralTypesResponse
     */
    public function GetClientReferralTypes(GetClientReferralTypes $parameters)
    {
        return $this->__soapCall('GetClientReferralTypes', array($parameters));
    }

    /**
     * Gets the active membership for a given client.
     *
     * @param GetActiveClientMemberships $parameters
     * @return GetActiveClientMembershipsResponse
     */
    public function GetActiveClientMemberships(GetActiveClientMemberships $parameters)
    {
        return $this->__soapCall('GetActiveClientMemberships', array($parameters));
    }

    /**
     * Gets a list of contracts for a given client.
     *
     * @param GetClientContracts $parameters
     * @return GetClientContractsResponse
     */
    public function GetClientContracts(GetClientContracts $parameters)
    {
        return $this->__soapCall('GetClientContracts', array($parameters));
    }

    /**
     * Gets account balances for the given clients.
     *
     * @param GetClientAccountBalances $parameters
     * @return GetClientAccountBalancesResponse
     */
    public function GetClientAccountBalances(GetClientAccountBalances $parameters)
    {
        return $this->__soapCall('GetClientAccountBalances', array($parameters));
    }

    /**
     * Gets a client service for a given client.
     *
     * @param GetClientServices $parameters
     * @return GetClientServicesResponse
     */
    public function GetClientServices(GetClientServices $parameters)
    {
        return $this->__soapCall('GetClientServices', array($parameters));
    }

    /**
     * Get visits for a client.
     *
     * @param GetClientVisits $parameters
     * @return GetClientVisitsResponse
     */
    public function GetClientVisits(GetClientVisits $parameters)
    {
        return $this->__soapCall('GetClientVisits', array($parameters));
    }

    /**
     * Get purchases for a client.
     *
     * @param GetClientPurchases $parameters
     * @return GetClientPurchasesResponse
     */
    public function GetClientPurchases(GetClientPurchases $parameters)
    {
        return $this->__soapCall('GetClientPurchases', array($parameters));
    }

    /**
     * Get visits for a client.
     *
     * @param GetClientSchedule $parameters
     * @return GetClientScheduleResponse
     */
    public function GetClientSchedule(GetClientSchedule $parameters)
    {
        return $this->__soapCall('GetClientSchedule', array($parameters));
    }

    /**
     * Updates a client service for a given client.
     *
     * @param GetRequiredClientFields $parameters
     * @return GetRequiredClientFieldsResponse
     */
    public function GetRequiredClientFields(GetRequiredClientFields $parameters)
    {
        return $this->__soapCall('GetRequiredClientFields', array($parameters));
    }

    /**
     * Validates a username and password. This method returns the associated clients record and a session GUID on success.
     *
     * @param ValidateLogin $parameters
     * @return ValidateLoginResponse
     */
    public function ValidateLogin(ValidateLogin $parameters)
    {
        $resp = $this->__soapCall('ValidateLogin', array($parameters));
        return $resp;
    }

    /**
     * Updates a client service for a given client.
     *
     * @param UpdateClientServices $parameters
     * @return UpdateClientServicesResponse
     */
    public function UpdateClientServices(UpdateClientServices $parameters)
    {
        return $this->__soapCall('UpdateClientServices', array($parameters));
    }

    /**
     * Sends the user a new password.
     *
     * @param SendUserNewPassword $parameters
     * @return SendUserNewPasswordResponse
     */
    public function SendUserNewPassword(SendUserNewPassword $parameters)
    {
        return $this->__soapCall('SendUserNewPassword', array($parameters));
    }

    /**
     * Gets relationships for a specific client
     *
     * @param GetClientRelationships $parameters
     * @return GetClientRelationshipsResponse
     */
    public function GetClientRelationships(GetClientRelationships $parameters)
    {
        return $this->__soapCall('GetClientRelationships', array($parameters));
    }

    /**
     * Adds relationships for a specific client
     *
     * @param AddClientRelationships $parameters
     * @return AddClientRelationshipsResponse
     */
    public function AddClientRelationships(AddClientRelationships $parameters)
    {
        return $this->__soapCall('AddClientRelationships', array($parameters));
    }

    /**
     * Deletes specified relationships for a specific client
     *
     * @param DeleteClientRelationships $parameters
     * @return DeleteClientRelationshipsResponse
     */
    public function DeleteClientRelationships(DeleteClientRelationships $parameters)
    {
        return $this->__soapCall('DeleteClientRelationships', array($parameters));
    }

}
