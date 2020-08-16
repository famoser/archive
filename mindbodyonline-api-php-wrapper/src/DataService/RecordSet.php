<?php

namespace Famoser\MBOApiWrapper\DataService;

class RecordSet
{

    /**
     * @var Row[] $Row
     */
    protected $Row = null;

    
    public function __construct()
    {
    
    }

    /**
     * @return Row[]
     */
    public function getRow()
    {
      return $this->Row;
    }

    /**
     * @param Row[] $Row
     * @return \Famoser\MBOApiWrapper\DataService\RecordSet
     */
    public function setRow(array $Row = null)
    {
      $this->Row = $Row;
      return $this;
    }

}
