<?php

namespace Famoser\MBOApiWrapper\DataService;

class SelectDataCSVRequest extends MBRequest
{

    /**
     * @var string $SelectSql
     */
    protected $SelectSql = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return string
     */
    public function getSelectSql()
    {
      return $this->SelectSql;
    }

    /**
     * @param string $SelectSql
     * @return \Famoser\MBOApiWrapper\DataService\SelectDataCSVRequest
     */
    public function setSelectSql($SelectSql)
    {
      $this->SelectSql = $SelectSql;
      return $this;
    }

}
