<?php

namespace Famoser\MBOApiWrapper\ClientService;

class ContactLog extends MBObject
{

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var Staff $CreatedBy
     */
    protected $CreatedBy = null;

    /**
     * @var Client $Client
     */
    protected $Client = null;

    /**
     * @var \DateTime $CreatedDateTime
     */
    protected $CreatedDateTime = null;

    /**
     * @var \DateTime $FollowupByDate
     */
    protected $FollowupByDate = null;

    /**
     * @var string $ContactName
     */
    protected $ContactName = null;

    /**
     * @var string $Text
     */
    protected $Text = null;

    /**
     * @var Staff $AssignedTo
     */
    protected $AssignedTo = null;

    /**
     * @var string $ContactMethod
     */
    protected $ContactMethod = null;

    /**
     * @var boolean $IsSystemGenerated
     */
    protected $IsSystemGenerated = null;

    /**
     * @var ArrayOfContactLogComment $Comments
     */
    protected $Comments = null;

    /**
     * @var ArrayOfContactLogType $Types
     */
    protected $Types = null;

    /**
     * @var ActionCode $Action
     */
    protected $Action = null;

    
    public function __construct()
    {
      parent::__construct();
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
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLog
     */
    public function setID($ID)
    {
      $this->ID = $ID;
      return $this;
    }

    /**
     * @return Staff
     */
    public function getCreatedBy()
    {
      return $this->CreatedBy;
    }

    /**
     * @param Staff $CreatedBy
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLog
     */
    public function setCreatedBy($CreatedBy)
    {
      $this->CreatedBy = $CreatedBy;
      return $this;
    }

    /**
     * @return Client
     */
    public function getClient()
    {
      return $this->Client;
    }

    /**
     * @param Client $Client
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLog
     */
    public function setClient($Client)
    {
      $this->Client = $Client;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedDateTime()
    {
      if ($this->CreatedDateTime == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->CreatedDateTime);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $CreatedDateTime
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLog
     */
    public function setCreatedDateTime(\DateTime $CreatedDateTime = null)
    {
      if ($CreatedDateTime == null) {
       $this->CreatedDateTime = null;
      } else {
        $this->CreatedDateTime = $CreatedDateTime->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getFollowupByDate()
    {
      if ($this->FollowupByDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->FollowupByDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $FollowupByDate
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLog
     */
    public function setFollowupByDate(\DateTime $FollowupByDate = null)
    {
      if ($FollowupByDate == null) {
       $this->FollowupByDate = null;
      } else {
        $this->FollowupByDate = $FollowupByDate->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return string
     */
    public function getContactName()
    {
      return $this->ContactName;
    }

    /**
     * @param string $ContactName
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLog
     */
    public function setContactName($ContactName)
    {
      $this->ContactName = $ContactName;
      return $this;
    }

    /**
     * @return string
     */
    public function getText()
    {
      return $this->Text;
    }

    /**
     * @param string $Text
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLog
     */
    public function setText($Text)
    {
      $this->Text = $Text;
      return $this;
    }

    /**
     * @return Staff
     */
    public function getAssignedTo()
    {
      return $this->AssignedTo;
    }

    /**
     * @param Staff $AssignedTo
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLog
     */
    public function setAssignedTo($AssignedTo)
    {
      $this->AssignedTo = $AssignedTo;
      return $this;
    }

    /**
     * @return string
     */
    public function getContactMethod()
    {
      return $this->ContactMethod;
    }

    /**
     * @param string $ContactMethod
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLog
     */
    public function setContactMethod($ContactMethod)
    {
      $this->ContactMethod = $ContactMethod;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getIsSystemGenerated()
    {
      return $this->IsSystemGenerated;
    }

    /**
     * @param boolean $IsSystemGenerated
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLog
     */
    public function setIsSystemGenerated($IsSystemGenerated)
    {
      $this->IsSystemGenerated = $IsSystemGenerated;
      return $this;
    }

    /**
     * @return ArrayOfContactLogComment
     */
    public function getComments()
    {
      return $this->Comments;
    }

    /**
     * @param ArrayOfContactLogComment $Comments
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLog
     */
    public function setComments($Comments)
    {
      $this->Comments = $Comments;
      return $this;
    }

    /**
     * @return ArrayOfContactLogType
     */
    public function getTypes()
    {
      return $this->Types;
    }

    /**
     * @param ArrayOfContactLogType $Types
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLog
     */
    public function setTypes($Types)
    {
      $this->Types = $Types;
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
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLog
     */
    public function setAction($Action)
    {
      $this->Action = $Action;
      return $this;
    }

}
