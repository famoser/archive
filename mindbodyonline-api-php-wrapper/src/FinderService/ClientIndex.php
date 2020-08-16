<?php

namespace Famoser\MBOApiWrapper\FinderService;

class ClientIndex extends MBObject
{

    /**
     * @var boolean $RequiredBusinessMode
     */
    protected $RequiredBusinessMode = null;

    /**
     * @var boolean $RequiredConsumerMode
     */
    protected $RequiredConsumerMode = null;

    /**
     * @var ActionCode $Action
     */
    protected $Action = null;

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var string $Name
     */
    protected $Name = null;

    /**
     * @var ArrayOfClientIndexValue $Values
     */
    protected $Values = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return boolean
     */
    public function getRequiredBusinessMode()
    {
      return $this->RequiredBusinessMode;
    }

    /**
     * @param boolean $RequiredBusinessMode
     * @return \Famoser\MBOApiWrapper\FinderService\ClientIndex
     */
    public function setRequiredBusinessMode($RequiredBusinessMode)
    {
      $this->RequiredBusinessMode = $RequiredBusinessMode;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getRequiredConsumerMode()
    {
      return $this->RequiredConsumerMode;
    }

    /**
     * @param boolean $RequiredConsumerMode
     * @return \Famoser\MBOApiWrapper\FinderService\ClientIndex
     */
    public function setRequiredConsumerMode($RequiredConsumerMode)
    {
      $this->RequiredConsumerMode = $RequiredConsumerMode;
      return $this;
    }

    /**
     * @return ActionCode
     */
    public function getAction()
    {
      return $this->Action;
    }

    /**
     * @param ActionCode $Action
     * @return \Famoser\MBOApiWrapper\FinderService\ClientIndex
     */
    public function setAction($Action)
    {
      $this->Action = $Action;
      return $this;
    }

    /**
     * @return int
     */
    public function getID()
    {
      return $this->ID;
    }

    /**
     * @param int $ID
     * @return \Famoser\MBOApiWrapper\FinderService\ClientIndex
     */
    public function setID($ID)
    {
      $this->ID = $ID;
      return $this;
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
     * @return \Famoser\MBOApiWrapper\FinderService\ClientIndex
     */
    public function setName($Name)
    {
      $this->Name = $Name;
      return $this;
    }

    /**
     * @return ArrayOfClientIndexValue
     */
    public function getValues()
    {
      return $this->Values;
    }

    /**
     * @param ArrayOfClientIndexValue $Values
     * @return \Famoser\MBOApiWrapper\FinderService\ClientIndex
     */
    public function setValues($Values)
    {
      $this->Values = $Values;
      return $this;
    }

}
