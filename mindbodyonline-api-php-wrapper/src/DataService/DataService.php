<?php

namespace Famoser\MBOApiWrapper\DataService;

class DataService extends \SoapClient
{

    /**
     * @var array $classmap The defined classes
     */
    private static $classmap = array (
      'SelectDataXml' => 'Famoser\\MBOApiWrapper\\DataService\\SelectDataXml',
      'SelectDataXmlRequest' => 'Famoser\\MBOApiWrapper\\DataService\\SelectDataXmlRequest',
      'MBRequest' => 'Famoser\\MBOApiWrapper\\DataService\\MBRequest',
      'SourceCredentials' => 'Famoser\\MBOApiWrapper\\DataService\\SourceCredentials',
      'ArrayOfInt' => 'Famoser\\MBOApiWrapper\\DataService\\ArrayOfInt',
      'UserCredentials' => 'Famoser\\MBOApiWrapper\\DataService\\UserCredentials',
      'ArrayOfString' => 'Famoser\\MBOApiWrapper\\DataService\\ArrayOfString',
      'SelectDataXmlResponse' => 'Famoser\\MBOApiWrapper\\DataService\\SelectDataXmlResponse',
      'SelectDataXmlResult' => 'Famoser\\MBOApiWrapper\\DataService\\SelectDataXmlResult',
      'MBResult' => 'Famoser\\MBOApiWrapper\\DataService\\MBResult',
      'FunctionDataXml' => 'Famoser\\MBOApiWrapper\\DataService\\FunctionDataXml',
      'FunctionDataXmlRequest' => 'Famoser\\MBOApiWrapper\\DataService\\FunctionDataXmlRequest',
      'ArrayOfFunctionParam' => 'Famoser\\MBOApiWrapper\\DataService\\ArrayOfFunctionParam',
      'FunctionParam' => 'Famoser\\MBOApiWrapper\\DataService\\FunctionParam',
      'FunctionDataXmlResponse' => 'Famoser\\MBOApiWrapper\\DataService\\FunctionDataXmlResponse',
      'FunctionDataCSV' => 'Famoser\\MBOApiWrapper\\DataService\\FunctionDataCSV',
      'FunctionDataCSVResponse' => 'Famoser\\MBOApiWrapper\\DataService\\FunctionDataCSVResponse',
      'SelectDataCSVResult' => 'Famoser\\MBOApiWrapper\\DataService\\SelectDataCSVResult',
      'SelectDataCSV' => 'Famoser\\MBOApiWrapper\\DataService\\SelectDataCSV',
      'SelectDataCSVRequest' => 'Famoser\\MBOApiWrapper\\DataService\\SelectDataCSVRequest',
      'SelectDataCSVResponse' => 'Famoser\\MBOApiWrapper\\DataService\\SelectDataCSVResponse',
      'FunctionAggregateDataXml' => 'Famoser\\MBOApiWrapper\\DataService\\FunctionAggregateDataXml',
      'FunctionAggregateDataXmlResponse' => 'Famoser\\MBOApiWrapper\\DataService\\FunctionAggregateDataXmlResponse',
      'SelectAggregateDataXml' => 'Famoser\\MBOApiWrapper\\DataService\\SelectAggregateDataXml',
      'SelectAggregateDataXmlRequest' => 'Famoser\\MBOApiWrapper\\DataService\\SelectAggregateDataXmlRequest',
      'SelectAggregateDataXmlResponse' => 'Famoser\\MBOApiWrapper\\DataService\\SelectAggregateDataXmlResponse',
      'SelectAggregateDataXmlResult' => 'Famoser\\MBOApiWrapper\\DataService\\SelectAggregateDataXmlResult',
      'SelectAggregateDataCSV' => 'Famoser\\MBOApiWrapper\\DataService\\SelectAggregateDataCSV',
      'SelectAggregateDataCSVRequest' => 'Famoser\\MBOApiWrapper\\DataService\\SelectAggregateDataCSVRequest',
      'SelectAggregateDataCSVResponse' => 'Famoser\\MBOApiWrapper\\DataService\\SelectAggregateDataCSVResponse',
      'SelectAggregateDataCSVResult' => 'Famoser\\MBOApiWrapper\\DataService\\SelectAggregateDataCSVResult',
      'GetFunctionNames' => 'Famoser\\MBOApiWrapper\\DataService\\GetFunctionNames',
      'GetFunctionNamesRequest' => 'Famoser\\MBOApiWrapper\\DataService\\GetFunctionNamesRequest',
      'GetFunctionNamesResponse' => 'Famoser\\MBOApiWrapper\\DataService\\GetFunctionNamesResponse',
      'GetFunctionNamesResult' => 'Famoser\\MBOApiWrapper\\DataService\\GetFunctionNamesResult',
      'ArrayOfApiFunction' => 'Famoser\\MBOApiWrapper\\DataService\\ArrayOfApiFunction',
      'ApiFunction' => 'Famoser\\MBOApiWrapper\\DataService\\ApiFunction',
      'GetFunctionParameters' => 'Famoser\\MBOApiWrapper\\DataService\\GetFunctionParameters',
      'GetFunctionParametersRequest' => 'Famoser\\MBOApiWrapper\\DataService\\GetFunctionParametersRequest',
      'GetFunctionParametersResponse' => 'Famoser\\MBOApiWrapper\\DataService\\GetFunctionParametersResponse',
      'GetFunctionParametersResult' => 'Famoser\\MBOApiWrapper\\DataService\\GetFunctionParametersResult',
      'ArrayOfApiFunctionParameter' => 'Famoser\\MBOApiWrapper\\DataService\\ArrayOfApiFunctionParameter',
      'ApiFunctionParameter' => 'Famoser\\MBOApiWrapper\\DataService\\ApiFunctionParameter',
      'GetSitesWithFunctionDataAccess' => 'Famoser\\MBOApiWrapper\\DataService\\GetSitesWithFunctionDataAccess',
      'GetSitesWithFunctionDataAccessRequest' => 'Famoser\\MBOApiWrapper\\DataService\\GetSitesWithFunctionDataAccessRequest',
      'GetSitesWithFunctionDataAccessResponse' => 'Famoser\\MBOApiWrapper\\DataService\\GetSitesWithFunctionDataAccessResponse',
      'GetSitesWithFunctionDataAccessResult' => 'Famoser\\MBOApiWrapper\\DataService\\GetSitesWithFunctionDataAccessResult',
      'ArrayOfSite' => 'Famoser\\MBOApiWrapper\\DataService\\ArrayOfSite',
      'Site' => 'Famoser\\MBOApiWrapper\\DataService\\Site',
      'RunFunctionForJob' => 'Famoser\\MBOApiWrapper\\DataService\\RunFunctionForJob',
      'RunFunctionForJobRequest' => 'Famoser\\MBOApiWrapper\\DataService\\RunFunctionForJobRequest',
      'RunFunctionForJobResponse' => 'Famoser\\MBOApiWrapper\\DataService\\RunFunctionForJobResponse',
      'RunFunctionForJobResult' => 'Famoser\\MBOApiWrapper\\DataService\\RunFunctionForJobResult',
      'Row' => 'Famoser\\MBOApiWrapper\\DataService\\Row',
      'RecordSet' => 'Famoser\\MBOApiWrapper\\DataService\\RecordSet',
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
        $wsdl = 'https://api.mindbodyonline.com/0_5/DataService.asmx?WSDL';
      }
      parent::__construct($wsdl, $options);
    }

    /**
     * Issue a select statement to your MB database
     *
     * @param SelectDataXml $parameters
     * @return SelectDataXmlResponse
     */
    public function SelectDataXml(SelectDataXml $parameters)
    {
      return $this->__soapCall('SelectDataXml', array($parameters));
    }

    /**
     * @param FunctionDataXml $parameters
     * @return FunctionDataXmlResponse
     */
    public function FunctionDataXml(FunctionDataXml $parameters)
    {
      return $this->__soapCall('FunctionDataXml', array($parameters));
    }

    /**
     * @param FunctionDataCSV $parameters
     * @return FunctionDataCSVResponse
     */
    public function FunctionDataCSV(FunctionDataCSV $parameters)
    {
      return $this->__soapCall('FunctionDataCSV', array($parameters));
    }

    /**
     * Issue a select statement to your MB database
     *
     * @param SelectDataCSV $parameters
     * @return SelectDataCSVResponse
     */
    public function SelectDataCSV(SelectDataCSV $parameters)
    {
      return $this->__soapCall('SelectDataCSV', array($parameters));
    }

    /**
     * @param FunctionAggregateDataXml $parameters
     * @return FunctionAggregateDataXmlResponse
     */
    public function FunctionAggregateDataXml(FunctionAggregateDataXml $parameters)
    {
      return $this->__soapCall('FunctionAggregateDataXml', array($parameters));
    }

    /**
     * Issue a select statement to aggregate data
     *
     * @param SelectAggregateDataXml $parameters
     * @return SelectAggregateDataXmlResponse
     */
    public function SelectAggregateDataXml(SelectAggregateDataXml $parameters)
    {
      return $this->__soapCall('SelectAggregateDataXml', array($parameters));
    }

    /**
     * Issue a select statement to aggregate data
     *
     * @param SelectAggregateDataCSV $parameters
     * @return SelectAggregateDataCSVResponse
     */
    public function SelectAggregateDataCSV(SelectAggregateDataCSV $parameters)
    {
      return $this->__soapCall('SelectAggregateDataCSV', array($parameters));
    }

    /**
     * Retrieve all available FunctionData function names for a given sourcename.
     *
     * @param GetFunctionNames $parameters
     * @return GetFunctionNamesResponse
     */
    public function GetFunctionNames(GetFunctionNames $parameters)
    {
      return $this->__soapCall('GetFunctionNames', array($parameters));
    }

    /**
     * Retrieve all available parameters for a given function.
     *
     * @param GetFunctionParameters $parameters
     * @return GetFunctionParametersResponse
     */
    public function GetFunctionParameters(GetFunctionParameters $parameters)
    {
      return $this->__soapCall('GetFunctionParameters', array($parameters));
    }

    /**
     * Retrieve all sites that you can access with FunctionData.
     *
     * @param GetSitesWithFunctionDataAccess $parameters
     * @return GetSitesWithFunctionDataAccessResponse
     */
    public function GetSitesWithFunctionDataAccess(GetSitesWithFunctionDataAccess $parameters)
    {
      return $this->__soapCall('GetSitesWithFunctionDataAccess', array($parameters));
    }

    /**
     * @param RunFunctionForJob $parameters
     * @return RunFunctionForJobResponse
     */
    public function RunFunctionForJob(RunFunctionForJob $parameters)
    {
      return $this->__soapCall('RunFunctionForJob', array($parameters));
    }

}
