<?php

namespace Famoser\MBOApiWrapper\DataService;

class ArrayOfApiFunction implements \ArrayAccess, \Iterator, \Countable
{

    /**
     * @var ApiFunction[] $ApiFunction
     */
    protected $ApiFunction = null;

    
    public function __construct()
    {
    
    }

    /**
     * @return ApiFunction[]
     */
    public function getApiFunction()
    {
      return $this->ApiFunction;
    }

    /**
     * @param ApiFunction[] $ApiFunction
     * @return \Famoser\MBOApiWrapper\DataService\ArrayOfApiFunction
     */
    public function setApiFunction(array $ApiFunction = null)
    {
      $this->ApiFunction = $ApiFunction;
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
      return isset($this->ApiFunction[$offset]);
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to retrieve
     * @return ApiFunction
     */
    public function offsetGet($offset)
    {
      return $this->ApiFunction[$offset];
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to assign the value to
     * @param ApiFunction $value The value to set
     * @return void
     */
    public function offsetSet($offset, $value)
    {
      $this->ApiFunction[$offset] = $value;
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to unset
     * @return void
     */
    public function offsetUnset($offset)
    {
      unset($this->ApiFunction[$offset]);
    }

    /**
     * Iterator implementation
     *
     * @return ApiFunction Return the current element
     */
    public function current()
    {
      return current($this->ApiFunction);
    }

    /**
     * Iterator implementation
     * Move forward to next element
     *
     * @return void
     */
    public function next()
    {
      next($this->ApiFunction);
    }

    /**
     * Iterator implementation
     *
     * @return string|null Return the key of the current element or null
     */
    public function key()
    {
      return key($this->ApiFunction);
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
      reset($this->ApiFunction);
    }

    /**
     * Countable implementation
     *
     * @return ApiFunction Return count of elements
     */
    public function count()
    {
      return count($this->ApiFunction);
    }

}
