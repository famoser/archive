<?php

namespace Famoser\MBOApiWrapper\DataService;

class ApiFunctionParameter
{

    /**
     * @var string $Name
     */
    protected $Name = null;

    /**
     * @var string $Type
     */
    protected $Type = null;

    /**
     * @var boolean $isIterable
     */
    protected $isIterable = null;

    /**
     * @var boolean $isRequired
     */
    protected $isRequired = null;

    /**
     * @param boolean $isIterable
     * @param boolean $isRequired
     */
    public function __construct($isIterable, $isRequired)
    {
      $this->isIterable = $isIterable;
      $this->isRequired = $isRequired;
    }

    /**
     * @return string
     */
    public function getName()
    {
      return $this->Name;
    }

    /**
     * @param string $Name
     * @return \Famoser\MBOApiWrapper\DataService\ApiFunctionParameter
     */
    public function setName($Name)
    {
      $this->Name = $Name;
      return $this;
    }

    /**
     * @return string
     */
    public function getType()
    {
      return $this->Type;
    }

    /**
     * @param string $Type
     * @return \Famoser\MBOApiWrapper\DataService\ApiFunctionParameter
     */
    public function setType($Type)
    {
      $this->Type = $Type;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getIsIterable()
    {
      return $this->isIterable;
    }

    /**
     * @param boolean $isIterable
     * @return \Famoser\MBOApiWrapper\DataService\ApiFunctionParameter
     */
    public function setIsIterable($isIterable)
    {
      $this->isIterable = $isIterable;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getIsRequired()
    {
      return $this->isRequired;
    }

    /**
     * @param boolean $isRequired
     * @return \Famoser\MBOApiWrapper\DataService\ApiFunctionParameter
     */
    public function setIsRequired($isRequired)
    {
      $this->isRequired = $isRequired;
      return $this;
    }

}
