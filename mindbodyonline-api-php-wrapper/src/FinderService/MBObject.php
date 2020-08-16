<?php

namespace Famoser\MBOApiWrapper\FinderService;

class MBObject
{

    /**
     * @var Site $Site
     */
    protected $Site = null;

    /**
     * @var ArrayOfString $Messages
     */
    protected $Messages = null;

    /**
     * @var string $Execute
     */
    protected $Execute = null;

    /**
     * @var string $ErrorCode
     */
    protected $ErrorCode = null;

    
    public function __construct()
    {
    
    }

    /**
     * @return Site
     */
    public function getSite()
    {
      return $this->Site;
    }

    /**
     * @param Site $Site
     * @return \Famoser\MBOApiWrapper\FinderService\MBObject
     */
    public function setSite($Site)
    {
      $this->Site = $Site;
      return $this;
    }

    /**
     * @return ArrayOfString
     */
    public function getMessages()
    {
      return $this->Messages;
    }

    /**
     * @param ArrayOfString $Messages
     * @return \Famoser\MBOApiWrapper\FinderService\MBObject
     */
    public function setMessages($Messages)
    {
      $this->Messages = $Messages;
      return $this;
    }

    /**
     * @return string
     */
    public function getExecute()
    {
      return $this->Execute;
    }

    /**
     * @param string $Execute
     * @return \Famoser\MBOApiWrapper\FinderService\MBObject
     */
    public function setExecute($Execute)
    {
      $this->Execute = $Execute;
      return $this;
    }

    /**
     * @return string
     */
    public function getErrorCode()
    {
      return $this->ErrorCode;
    }

    /**
     * @param string $ErrorCode
     * @return \Famoser\MBOApiWrapper\FinderService\MBObject
     */
    public function setErrorCode($ErrorCode)
    {
      $this->ErrorCode = $ErrorCode;
      return $this;
    }

}
