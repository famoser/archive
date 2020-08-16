<?php

namespace Famoser\MBOApiWrapper\FinderService;

class SessionType extends MBObject
{

    /**
     * @var int $DefaultTimeLength
     */
    protected $DefaultTimeLength = null;

    /**
     * @var int $ProgramID
     */
    protected $ProgramID = null;

    /**
     * @var int $NumDeducted
     */
    protected $NumDeducted = null;

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

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return int
     */
    public function getDefaultTimeLength()
    {
      return $this->DefaultTimeLength;
    }

    /**
     * @param int $DefaultTimeLength
     * @return \Famoser\MBOApiWrapper\FinderService\SessionType
     */
    public function setDefaultTimeLength($DefaultTimeLength)
    {
      $this->DefaultTimeLength = $DefaultTimeLength;
      return $this;
    }

    /**
     * @return int
     */
    public function getProgramID()
    {
      return $this->ProgramID;
    }

    /**
     * @param int $ProgramID
     * @return \Famoser\MBOApiWrapper\FinderService\SessionType
     */
    public function setProgramID($ProgramID)
    {
      $this->ProgramID = $ProgramID;
      return $this;
    }

    /**
     * @return int
     */
    public function getNumDeducted()
    {
      return $this->NumDeducted;
    }

    /**
     * @param int $NumDeducted
     * @return \Famoser\MBOApiWrapper\FinderService\SessionType
     */
    public function setNumDeducted($NumDeducted)
    {
      $this->NumDeducted = $NumDeducted;
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
     * @return \Famoser\MBOApiWrapper\FinderService\SessionType
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
     * @return \Famoser\MBOApiWrapper\FinderService\SessionType
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
     * @return \Famoser\MBOApiWrapper\FinderService\SessionType
     */
    public function setName($Name)
    {
      $this->Name = $Name;
      return $this;
    }

}
