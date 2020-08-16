<?php

namespace Famoser\MBOApiWrapper\DataService;

class ArrayOfFunctionParam implements \ArrayAccess, \Iterator, \Countable
{

    /**
     * @var FunctionParam[] $FunctionParam
     */
    protected $FunctionParam = null;

    
    public function __construct()
    {
    
    }

    /**
     * @return FunctionParam[]
     */
    public function getFunctionParam()
    {
      return $this->FunctionParam;
    }

    /**
     * @param FunctionParam[] $FunctionParam
     * @return \Famoser\MBOApiWrapper\DataService\ArrayOfFunctionParam
     */
    public function setFunctionParam(array $FunctionParam = null)
    {
      $this->FunctionParam = $FunctionParam;
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
      return isset($this->FunctionParam[$offset]);
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to retrieve
     * @return FunctionParam
     */
    public function offsetGet($offset)
    {
      return $this->FunctionParam[$offset];
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to assign the value to
     * @param FunctionParam $value The value to set
     * @return void
     */
    public function offsetSet($offset, $value)
    {
      $this->FunctionParam[$offset] = $value;
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to unset
     * @return void
     */
    public function offsetUnset($offset)
    {
      unset($this->FunctionParam[$offset]);
    }

    /**
     * Iterator implementation
     *
     * @return FunctionParam Return the current element
     */
    public function current()
    {
      return current($this->FunctionParam);
    }

    /**
     * Iterator implementation
     * Move forward to next element
     *
     * @return void
     */
    public function next()
    {
      next($this->FunctionParam);
    }

    /**
     * Iterator implementation
     *
     * @return string|null Return the key of the current element or null
     */
    public function key()
    {
      return key($this->FunctionParam);
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
      reset($this->FunctionParam);
    }

    /**
     * Countable implementation
     *
     * @return FunctionParam Return count of elements
     */
    public function count()
    {
      return count($this->FunctionParam);
    }

}
