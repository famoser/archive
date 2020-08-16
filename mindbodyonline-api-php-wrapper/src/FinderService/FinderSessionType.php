<?php

namespace Famoser\MBOApiWrapper\FinderService;

class FinderSessionType
{

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var string $Name
     */
    protected $Name = null;

    /**
     * @var int $Length
     */
    protected $Length = null;

    /**
     * @var string $Description
     */
    protected $Description = null;

    /**
     * @param int $ID
     * @param int $Length
     */
    public function __construct($ID, $Length)
    {
      $this->ID = $ID;
      $this->Length = $Length;
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
     * @return \Famoser\MBOApiWrapper\FinderService\FinderSessionType
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
     * @return \Famoser\MBOApiWrapper\FinderService\FinderSessionType
     */
    public function setName($Name)
    {
      $this->Name = $Name;
      return $this;
    }

    /**
     * @return int
     */
    public function getLength()
    {
      return $this->Length;
    }

    /**
     * @param int $Length
     * @return \Famoser\MBOApiWrapper\FinderService\FinderSessionType
     */
    public function setLength($Length)
    {
      $this->Length = $Length;
      return $this;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
      return $this->Description;
    }

    /**
     * @param string $Description
     * @return \Famoser\MBOApiWrapper\FinderService\FinderSessionType
     */
    public function setDescription($Description)
    {
      $this->Description = $Description;
      return $this;
    }

}
