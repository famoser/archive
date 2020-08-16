<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientReferralTypesResponse
{

    /**
     * @var GetClientReferralTypesResult $GetClientReferralTypesResult
     */
    protected $GetClientReferralTypesResult = null;

    /**
     * @param GetClientReferralTypesResult $GetClientReferralTypesResult
     */
    public function __construct($GetClientReferralTypesResult)
    {
      $this->GetClientReferralTypesResult = $GetClientReferralTypesResult;
    }

    /**
     * @return GetClientReferralTypesResult
     */
    public function getGetClientReferralTypesResult()
    {
      return $this->GetClientReferralTypesResult;
    }

    /**
     * @param GetClientReferralTypesResult $GetClientReferralTypesResult
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientReferralTypesResponse
     */
    public function setGetClientReferralTypesResult($GetClientReferralTypesResult)
    {
      $this->GetClientReferralTypesResult = $GetClientReferralTypesResult;
      return $this;
    }

}
