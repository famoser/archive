<?php

namespace Famoser\MBOApiWrapper\SiteService;


/**
 * Provides methods and attributes relating to sites and locations.
 */
class Site_x0020_Service extends \SoapClient
{

    /**
     * @var array $classmap The defined classes
     */
    private static $classmap = array (
      'GetSites' => 'Famoser\\MBOApiWrapper\\SiteService\\GetSites',
      'GetSitesRequest' => 'Famoser\\MBOApiWrapper\\SiteService\\GetSitesRequest',
      'MBRequest' => 'Famoser\\MBOApiWrapper\\SiteService\\MBRequest',
      'SourceCredentials' => 'Famoser\\MBOApiWrapper\\SiteService\\SourceCredentials',
      'ArrayOfInt' => 'Famoser\\MBOApiWrapper\\SiteService\\ArrayOfInt',
      'UserCredentials' => 'Famoser\\MBOApiWrapper\\SiteService\\UserCredentials',
      'ArrayOfString' => 'Famoser\\MBOApiWrapper\\SiteService\\ArrayOfString',
      'GetSitesResponse' => 'Famoser\\MBOApiWrapper\\SiteService\\GetSitesResponse',
      'GetSitesResult' => 'Famoser\\MBOApiWrapper\\SiteService\\GetSitesResult',
      'MBResult' => 'Famoser\\MBOApiWrapper\\SiteService\\MBResult',
      'ArrayOfSite' => 'Famoser\\MBOApiWrapper\\SiteService\\ArrayOfSite',
      'Site' => 'Famoser\\MBOApiWrapper\\SiteService\\Site',
      'GetLocations' => 'Famoser\\MBOApiWrapper\\SiteService\\GetLocations',
      'GetLocationsRequest' => 'Famoser\\MBOApiWrapper\\SiteService\\GetLocationsRequest',
      'GetLocationsResponse' => 'Famoser\\MBOApiWrapper\\SiteService\\GetLocationsResponse',
      'GetLocationsResult' => 'Famoser\\MBOApiWrapper\\SiteService\\GetLocationsResult',
      'ArrayOfLocation' => 'Famoser\\MBOApiWrapper\\SiteService\\ArrayOfLocation',
      'Location' => 'Famoser\\MBOApiWrapper\\SiteService\\Location',
      'MBObject' => 'Famoser\\MBOApiWrapper\\SiteService\\MBObject',
      'GetActivationCode' => 'Famoser\\MBOApiWrapper\\SiteService\\GetActivationCode',
      'GetActivationCodeRequest' => 'Famoser\\MBOApiWrapper\\SiteService\\GetActivationCodeRequest',
      'GetActivationCodeResponse' => 'Famoser\\MBOApiWrapper\\SiteService\\GetActivationCodeResponse',
      'GetActivationCodeResult' => 'Famoser\\MBOApiWrapper\\SiteService\\GetActivationCodeResult',
      'GetPrograms' => 'Famoser\\MBOApiWrapper\\SiteService\\GetPrograms',
      'GetProgramsRequest' => 'Famoser\\MBOApiWrapper\\SiteService\\GetProgramsRequest',
      'GetProgramsResponse' => 'Famoser\\MBOApiWrapper\\SiteService\\GetProgramsResponse',
      'GetProgramsResult' => 'Famoser\\MBOApiWrapper\\SiteService\\GetProgramsResult',
      'ArrayOfProgram' => 'Famoser\\MBOApiWrapper\\SiteService\\ArrayOfProgram',
      'Program' => 'Famoser\\MBOApiWrapper\\SiteService\\Program',
      'GetSessionTypes' => 'Famoser\\MBOApiWrapper\\SiteService\\GetSessionTypes',
      'GetSessionTypesRequest' => 'Famoser\\MBOApiWrapper\\SiteService\\GetSessionTypesRequest',
      'GetSessionTypesResponse' => 'Famoser\\MBOApiWrapper\\SiteService\\GetSessionTypesResponse',
      'GetSessionTypesResult' => 'Famoser\\MBOApiWrapper\\SiteService\\GetSessionTypesResult',
      'ArrayOfSessionType' => 'Famoser\\MBOApiWrapper\\SiteService\\ArrayOfSessionType',
      'SessionType' => 'Famoser\\MBOApiWrapper\\SiteService\\SessionType',
      'GetResources' => 'Famoser\\MBOApiWrapper\\SiteService\\GetResources',
      'GetResourcesRequest' => 'Famoser\\MBOApiWrapper\\SiteService\\GetResourcesRequest',
      'GetResourcesResponse' => 'Famoser\\MBOApiWrapper\\SiteService\\GetResourcesResponse',
      'GetResourcesResult' => 'Famoser\\MBOApiWrapper\\SiteService\\GetResourcesResult',
      'ArrayOfResource' => 'Famoser\\MBOApiWrapper\\SiteService\\ArrayOfResource',
      'Resource' => 'Famoser\\MBOApiWrapper\\SiteService\\Resource',
      'GetRelationships' => 'Famoser\\MBOApiWrapper\\SiteService\\GetRelationships',
      'GetRelationshipsRequest' => 'Famoser\\MBOApiWrapper\\SiteService\\GetRelationshipsRequest',
      'GetRelationshipsResponse' => 'Famoser\\MBOApiWrapper\\SiteService\\GetRelationshipsResponse',
      'GetRelationshipsResult' => 'Famoser\\MBOApiWrapper\\SiteService\\GetRelationshipsResult',
      'ArrayOfRelationship' => 'Famoser\\MBOApiWrapper\\SiteService\\ArrayOfRelationship',
      'Relationship' => 'Famoser\\MBOApiWrapper\\SiteService\\Relationship',
      'GetResourceSchedule' => 'Famoser\\MBOApiWrapper\\SiteService\\GetResourceSchedule',
      'GetResourceScheduleRequest' => 'Famoser\\MBOApiWrapper\\SiteService\\GetResourceScheduleRequest',
      'GetResourceScheduleResponse' => 'Famoser\\MBOApiWrapper\\SiteService\\GetResourceScheduleResponse',
      'GetResourceScheduleResult' => 'Famoser\\MBOApiWrapper\\SiteService\\GetResourceScheduleResult',
      'ReserveResource' => 'Famoser\\MBOApiWrapper\\SiteService\\ReserveResource',
      'ReserveResourceRequest' => 'Famoser\\MBOApiWrapper\\SiteService\\ReserveResourceRequest',
      'ReserveResourceResponse' => 'Famoser\\MBOApiWrapper\\SiteService\\ReserveResourceResponse',
      'ReserveResourceResult' => 'Famoser\\MBOApiWrapper\\SiteService\\ReserveResourceResult',
      'GetMobileProviders' => 'Famoser\\MBOApiWrapper\\SiteService\\GetMobileProviders',
      'GetMobileProvidersRequest' => 'Famoser\\MBOApiWrapper\\SiteService\\GetMobileProvidersRequest',
      'GetMobileProvidersResponse' => 'Famoser\\MBOApiWrapper\\SiteService\\GetMobileProvidersResponse',
      'GetMobileProvidersResult' => 'Famoser\\MBOApiWrapper\\SiteService\\GetMobileProvidersResult',
      'ArrayOfMobileProvider' => 'Famoser\\MBOApiWrapper\\SiteService\\ArrayOfMobileProvider',
      'MobileProvider' => 'Famoser\\MBOApiWrapper\\SiteService\\MobileProvider',
      'GetProspectStages' => 'Famoser\\MBOApiWrapper\\SiteService\\GetProspectStages',
      'GetProspectStagesRequest' => 'Famoser\\MBOApiWrapper\\SiteService\\GetProspectStagesRequest',
      'GetProspectStagesResponse' => 'Famoser\\MBOApiWrapper\\SiteService\\GetProspectStagesResponse',
      'GetProspectStagesResult' => 'Famoser\\MBOApiWrapper\\SiteService\\GetProspectStagesResult',
      'ArrayOfProspectStage' => 'Famoser\\MBOApiWrapper\\SiteService\\ArrayOfProspectStage',
      'ProspectStage' => 'Famoser\\MBOApiWrapper\\SiteService\\ProspectStage',
      'GetGenders' => 'Famoser\\MBOApiWrapper\\SiteService\\GetGenders',
      'GetGendersRequest' => 'Famoser\\MBOApiWrapper\\SiteService\\GetGendersRequest',
      'GetGendersResponse' => 'Famoser\\MBOApiWrapper\\SiteService\\GetGendersResponse',
      'GetGendersResult' => 'Famoser\\MBOApiWrapper\\SiteService\\GetGendersResult',
      'ArrayOfGenderOption' => 'Famoser\\MBOApiWrapper\\SiteService\\ArrayOfGenderOption',
      'GenderOption' => 'Famoser\\MBOApiWrapper\\SiteService\\GenderOption',
      'Row' => 'Famoser\\MBOApiWrapper\\SiteService\\Row',
      'RecordSet' => 'Famoser\\MBOApiWrapper\\SiteService\\RecordSet',
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
        $wsdl = 'https://api.mindbodyonline.com/0_5/SiteService.asmx?WSDL';
      }
      parent::__construct($wsdl, $options);
    }

    /**
     * Gets a list of sites.
     *
     * @param GetSites $parameters
     * @return GetSitesResponse
     */
    public function GetSites(GetSites $parameters)
    {
      return $this->__soapCall('GetSites', array($parameters));
    }

    /**
     * Gets a list of locations.
     *
     * @param GetLocations $parameters
     * @return GetLocationsResponse
     */
    public function GetLocations(GetLocations $parameters)
    {
      return $this->__soapCall('GetLocations', array($parameters));
    }

    /**
     * Gets an activation code.
     *
     * @param GetActivationCode $parameters
     * @return GetActivationCodeResponse
     */
    public function GetActivationCode(GetActivationCode $parameters)
    {
      return $this->__soapCall('GetActivationCode', array($parameters));
    }

    /**
     * Gets a list of programs.
     *
     * @param GetPrograms $parameters
     * @return GetProgramsResponse
     */
    public function GetPrograms(GetPrograms $parameters)
    {
      return $this->__soapCall('GetPrograms', array($parameters));
    }

    /**
     * Gets a list of session types.
     *
     * @param GetSessionTypes $parameters
     * @return GetSessionTypesResponse
     */
    public function GetSessionTypes(GetSessionTypes $parameters)
    {
      return $this->__soapCall('GetSessionTypes', array($parameters));
    }

    /**
     * Gets a list of resources.
     *
     * @param GetResources $parameters
     * @return GetResourcesResponse
     */
    public function GetResources(GetResources $parameters)
    {
      return $this->__soapCall('GetResources', array($parameters));
    }

    /**
     * Gets a list of relationships.
     *
     * @param GetRelationships $parameters
     * @return GetRelationshipsResponse
     */
    public function GetRelationships(GetRelationships $parameters)
    {
      return $this->__soapCall('GetRelationships', array($parameters));
    }

    /**
     * Gets all resources schedule.
     *
     * @param GetResourceSchedule $parameters
     * @return GetResourceScheduleResponse
     */
    public function GetResourceSchedule(GetResourceSchedule $parameters)
    {
      return $this->__soapCall('GetResourceSchedule', array($parameters));
    }

    /**
     * Reserves a resource.
     *
     * @param ReserveResource $parameters
     * @return ReserveResourceResponse
     */
    public function ReserveResource(ReserveResource $parameters)
    {
      return $this->__soapCall('ReserveResource', array($parameters));
    }

    /**
     * Gets a list of active mobile providers.
     *
     * @param GetMobileProviders $parameters
     * @return GetMobileProvidersResponse
     */
    public function GetMobileProviders(GetMobileProviders $parameters)
    {
      return $this->__soapCall('GetMobileProviders', array($parameters));
    }

    /**
     * Gets a list of prospect stages for a site.
     *
     * @param GetProspectStages $parameters
     * @return GetProspectStagesResponse
     */
    public function GetProspectStages(GetProspectStages $parameters)
    {
      return $this->__soapCall('GetProspectStages', array($parameters));
    }

    /**
     * Gets a list of prospect stages for a site.
     *
     * @param GetGenders $parameters
     * @return GetGendersResponse
     */
    public function GetGenders(GetGenders $parameters)
    {
      return $this->__soapCall('GetGenders', array($parameters));
    }

}
