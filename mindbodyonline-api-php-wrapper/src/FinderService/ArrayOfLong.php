<?php

namespace Famoser\MBOApiWrapper\FinderService;

class ArrayOfLong implements \ArrayAccess, \Iterator, \Countable
{

    /**
     * @var long[] $long
     */
    protected $long = null;

    
    public function __construct()
    {
    
    }

    /**
     * @return long[]
     */
    public function getLong()
    {
      return $this->long;
    }

    /**
     * @param long[] $long
     * @return \Famoser\MBOApiWrapper\FinderService\ArrayOfLong
     */
    public function setLong(array $long = null)
    {
      $this->long = $long;
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
      return isset($this->long[$offset]);
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to retrieve
     * @return long
     */
    public function offsetGet($offset)
    {
      return $this->long[$offset];
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to assign the value to
     * @param int $value The value to set
     * @return void
     */
    public function offsetSet($offset, $value)
    {
      $this->long[$offset] = $value;
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to unset
     * @return void
     */
    public function offsetUnset($offset)
    {
      unset($this->long[$offset]);
    }

    /**
     * Iterator implementation
     *
     * @return long Return the current element
     */
    public function current()
    {
      return current($this->long);
    }

    /**
     * Iterator implementation
     * Move forward to next element
     *
     * @return void
     */
    public function next()
    {
      next($this->long);
    }

    /**
     * Iterator implementation
     *
     * @return string|null Return the key of the current element or null
     */
    public function key()
    {
      return key($this->long);
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
      reset($this->long);
    }

    /**
     * Countable implementation
     *
     * @return long Return count of elements
     */
    public function count()
    {
      return count($this->long);
    }

}
