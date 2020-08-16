<?php

namespace Famoser\MBOApiWrapper\FinderService;

class ArrayOfFinderAppointment implements \ArrayAccess, \Iterator, \Countable
{

    /**
     * @var FinderAppointment[] $FinderAppointment
     */
    protected $FinderAppointment = null;

    
    public function __construct()
    {
    
    }

    /**
     * @return FinderAppointment[]
     */
    public function getFinderAppointment()
    {
      return $this->FinderAppointment;
    }

    /**
     * @param FinderAppointment[] $FinderAppointment
     * @return \Famoser\MBOApiWrapper\FinderService\ArrayOfFinderAppointment
     */
    public function setFinderAppointment(array $FinderAppointment = null)
    {
      $this->FinderAppointment = $FinderAppointment;
      return $this;
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset An offset to check for
     * @return boolean true on success or false on failure
     */
    public function offsetExists($offset)
    {
      return isset($this->FinderAppointment[$offset]);
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to retrieve
     * @return FinderAppointment
     */
    public function offsetGet($offset)
    {
      return $this->FinderAppointment[$offset];
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to assign the value to
     * @param FinderAppointment $value The value to set
     * @return void
     */
    public function offsetSet($offset, $value)
    {
      $this->FinderAppointment[$offset] = $value;
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to unset
     * @return void
     */
    public function offsetUnset($offset)
    {
      unset($this->FinderAppointment[$offset]);
    }

    /**
     * Iterator implementation
     *
     * @return FinderAppointment Return the current element
     */
    public function current()
    {
      return current($this->FinderAppointment);
    }

    /**
     * Iterator implementation
     * Move forward to next element
     *
     * @return void
     */
    public function next()
    {
      next($this->FinderAppointment);
    }

    /**
     * Iterator implementation
     *
     * @return string|null Return the key of the current element or null
     */
    public function key()
    {
      return key($this->FinderAppointment);
    }

    /**
     * Iterator implementation
     *
     * @return boolean Return the validity of the current position
     */
    public function valid()
    {
      return $this->key() !== null;
    }

    /**
     * Iterator implementation
     * Rewind the Iterator to the first element
     *
     * @return void
     */
    public function rewind()
    {
      reset($this->FinderAppointment);
    }

    /**
     * Countable implementation
     *
     * @return FinderAppointment Return count of elements
     */
    public function count()
    {
      return count($this->FinderAppointment);
    }

}
