<?php

namespace Famoser\MBOApiWrapper\SiteService;

class GetResourceScheduleRequest extends MBRequest
{

    /**
     * @var \DateTime $Date
     */
    protected $Date = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return \DateTime
     */
    public function getDate()
    {
      if ($this->Date == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->Date);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $Date
     * @return \Famoser\MBOApiWrapper\SiteService\GetResourceScheduleRequest
     */
    public function setDate(\DateTime $Date = null)
    {
      if ($Date == null) {
       $this->Date = null;
      } else {
        $this->Date = $Date->format(\DateTime::ATOM);
      }
      return $this;
    }

}
