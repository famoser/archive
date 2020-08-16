<?php

namespace Famoser\MBOApiWrapper\ClientService;

class ArrayOfConsumerRelationship implements \ArrayAccess, \Iterator, \Countable
{

    /**
     * @var ConsumerRelationship[] $ConsumerRelationship
     */
    protected $ConsumerRelationship = null;

    
    public function __construct()
    {
    
    }

    /**
     * @return ConsumerRelationship[]
     */
    public function getConsumerRelationship()
    {
      return $this->ConsumerRelationship;
    }

    /**
     * @param ConsumerRelationship[] $ConsumerRelationship
     * @return \Famoser\MBOApiWrapper\ClientService\ArrayOfConsumerRelationship
     */
    public function setConsumerRelationship(array $ConsumerRelationship = null)
    {
      $this->ConsumerRelationship = $ConsumerRelationship;
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
      return isset($this->ConsumerRelationship[$offset]);
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to retrieve
     * @return ConsumerRelationship
     */
    public function offsetGet($offset)
    {
      return $this->ConsumerRelationship[$offset];
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to assign the value to
     * @param ConsumerRelationship $value The value to set
     * @return void
     */
    public function offsetSet($offset, $value)
    {
      $this->ConsumerRelationship[$offset] = $value;
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to unset
     * @return void
     */
    public function offsetUnset($offset)
    {
      unset($this->ConsumerRelationship[$offset]);
    }

    /**
     * Iterator implementation
     *
     * @return ConsumerRelationship Return the current element
     */
    public function current()
    {
      return current($this->ConsumerRelationship);
    }

    /**
     * Iterator implementation
     * Move forward to next element
     *
     * @return void
     */
    public function next()
    {
      next($this->ConsumerRelationship);
    }

    /**
     * Iterator implementation
     *
     * @return string|null Return the key of the current element or null
     */
    public function key()
    {
      return key($this->ConsumerRelationship);
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
      reset($this->ConsumerRelationship);
    }

    /**
     * Countable implementation
     *
     * @return ConsumerRelationship Return count of elements
     */
    public function count()
    {
      return count($this->ConsumerRelationship);
    }

}
