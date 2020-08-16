<?php

namespace Famoser\MBOApiWrapper\FinderService;

class SpaFinderWellnessCard
{

    /**
     * @var string $ID
     */
    protected $ID = null;

    /**
     * @var float $Amount
     */
    protected $Amount = null;

    /**
     * @param float $Amount
     */
    public function __construct($Amount)
    {
      $this->Amount = $Amount;
    }

    /**
     * @return string
     */
    public function getID()
    {
      return $this->ID;
    }

    /**
     * @param string $ID
     * @return \Famoser\MBOApiWrapper\FinderService\SpaFinderWellnessCard
     */
    public function setID($ID)
    {
      $this->ID = $ID;
      return $this;
    }

    /**
     * @return float
     */
    public function getAmount()
    {
      return $this->Amount;
    }

    /**
     * @param float $Amount
     * @return \Famoser\MBOApiWrapper\FinderService\SpaFinderWellnessCard
     */
    public function setAmount($Amount)
    {
      $this->Amount = $Amount;
      return $this;
    }

}
