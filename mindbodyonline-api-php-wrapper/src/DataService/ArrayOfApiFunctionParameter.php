<?php

namespace Famoser\MBOApiWrapper\DataService;

class ArrayOfApiFunctionParameter implements \ArrayAccess, \Iterator, \Countable
{

    /**
     * @var ApiFunctionParameter[] $ApiFunctionParameter
     */
    protected $ApiFunctionParameter = null;

    
    public function __construct()
    {
    
    }

    /**
     * @return ApiFunctionParameter[]
     */
    public function getApiFunctionParameter()
    {
      return $this->ApiFunctionParameter;
    }

    /**
     * @param ApiFunctionParameter[] $ApiFunctionParameter
     * @return \Famoser\MBOApiWrapper\DataService\ArrayOfApiFunctionParameter
     */
    public function setApiFunctionParameter(array $ApiFunctionParameter = null)
    {
      $this->ApiFunctionParameter = $ApiFunctionParameter;
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
      return isset($this->ApiFunctionParameter[$offset]);
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to retrieve
     * @return ApiFunctionParameter
     */
    public function offsetGet($offset)
    {
      return $this->ApiFunctionParameter[$offset];
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to assign the value to
     * @param ApiFunctionParameter $value The value to set
     * @return void
     */
    public function offsetSet($offset, $value)
    {
      $this->ApiFunctionParameter[$offset] = $value;
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to unset
     * @return void
     */
    public function offsetUnset($offset)
    {
      unset($this->ApiFunctionParameter[$offset]);
    }

    /**
     * Iterator implementation
     *
     * @return ApiFunctionParameter Return the current element
     */
    public function current()
    {
      return current($this->ApiFunctionParameter);
    }

    /**
     * Iterator implementation
     * Move forward to next element
     *
     * @return void
     */
    public function next()
    {
      next($this->ApiFunctionParameter);
    }

    /**
     * Iterator implementation
     *
     * @return string|null Return the key of the current element or null
     */
    public function key()
    {
      return key($this->ApiFunctionParameter);
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
      reset($this->ApiFunctionParameter);
    }

    /**
     * Countable implementation
     *
     * @return ApiFunctionParameter Return count of elements
     */
    public function count()
    {
      return count($this->ApiFunctionParameter);
    }

}
