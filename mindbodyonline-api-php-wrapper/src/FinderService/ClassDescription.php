<?php

namespace Famoser\MBOApiWrapper\FinderService;

class ClassDescription extends MBObject
{

    /**
     * @var string $ImageURL
     */
    protected $ImageURL = null;

    /**
     * @var Level $Level
     */
    protected $Level = null;

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
     * @var string $Description
     */
    protected $Description = null;

    /**
     * @var string $Prereq
     */
    protected $Prereq = null;

    /**
     * @var string $Notes
     */
    protected $Notes = null;

    /**
     * @var \DateTime $LastUpdated
     */
    protected $LastUpdated = null;

    /**
     * @var Program $Program
     */
    protected $Program = null;

    /**
     * @var SessionType $SessionType
     */
    protected $SessionType = null;

    /**
     * @var boolean $Active
     */
    protected $Active = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return string
     */
    public function getImageURL()
    {
      return $this->ImageURL;
    }

    /**
     * @param string $ImageURL
     * @return \Famoser\MBOApiWrapper\FinderService\ClassDescription
     */
    public function setImageURL($ImageURL)
    {
      $this->ImageURL = $ImageURL;
      return $this;
    }

    /**
     * @return Level
     */
    public function getLevel()
    {
      return $this->Level;
    }

    /**
     * @param Level $Level
     * @return \Famoser\MBOApiWrapper\FinderService\ClassDescription
     */
    public function setLevel($Level)
    {
      $this->Level = $Level;
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
     * @return \Famoser\MBOApiWrapper\FinderService\ClassDescription
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
     * @return \Famoser\MBOApiWrapper\FinderService\ClassDescription
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
     * @return \Famoser\MBOApiWrapper\FinderService\ClassDescription
     */
    public function setName($Name)
    {
      $this->Name = $Name;
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
     * @return \Famoser\MBOApiWrapper\FinderService\ClassDescription
     */
    public function setDescription($Description)
    {
      $this->Description = $Description;
      return $this;
    }

    /**
     * @return string
     */
    public function getPrereq()
    {
      return $this->Prereq;
    }

    /**
     * @param string $Prereq
     * @return \Famoser\MBOApiWrapper\FinderService\ClassDescription
     */
    public function setPrereq($Prereq)
    {
      $this->Prereq = $Prereq;
      return $this;
    }

    /**
     * @return string
     */
    public function getNotes()
    {
      return $this->Notes;
    }

    /**
     * @param string $Notes
     * @return \Famoser\MBOApiWrapper\FinderService\ClassDescription
     */
    public function setNotes($Notes)
    {
      $this->Notes = $Notes;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getLastUpdated()
    {
      if ($this->LastUpdated == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->LastUpdated);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $LastUpdated
     * @return \Famoser\MBOApiWrapper\FinderService\ClassDescription
     */
    public function setLastUpdated(\DateTime $LastUpdated = null)
    {
      if ($LastUpdated == null) {
       $this->LastUpdated = null;
      } else {
        $this->LastUpdated = $LastUpdated->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return Program
     */
    public function getProgram()
    {
      return $this->Program;
    }

    /**
     * @param Program $Program
     * @return \Famoser\MBOApiWrapper\FinderService\ClassDescription
     */
    public function setProgram($Program)
    {
      $this->Program = $Program;
      return $this;
    }

    /**
     * @return SessionType
     */
    public function getSessionType()
    {
      return $this->SessionType;
    }

    /**
     * @param SessionType $SessionType
     * @return \Famoser\MBOApiWrapper\FinderService\ClassDescription
     */
    public function setSessionType($SessionType)
    {
      $this->SessionType = $SessionType;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getActive()
    {
      return $this->Active;
    }

    /**
     * @param boolean $Active
     * @return \Famoser\MBOApiWrapper\FinderService\ClassDescription
     */
    public function setActive($Active)
    {
      $this->Active = $Active;
      return $this;
    }

}
