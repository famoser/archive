<?php

namespace Famoser\MBOApiWrapper\ClientService;

class ContactLogComment extends MBObject
{

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var string $Text
     */
    protected $Text = null;

    /**
     * @var Staff $CreatedBy
     */
    protected $CreatedBy = null;

    /**
     * @var \DateTime $CreatedDateTime
     */
    protected $CreatedDateTime = null;

    
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
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLogComment
     */
    public function setID($ID)
    {
      $this->ID = $ID;
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
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLogComment
     */
    public function setText($Text)
    {
      $this->Text = $Text;
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
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLogComment
     */
    public function setCreatedBy($CreatedBy)
    {
      $this->CreatedBy = $CreatedBy;
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
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLogComment
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

}
