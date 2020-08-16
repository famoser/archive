<?php

namespace Famoser\MBOApiWrapper\FinderService;

class ArrayOfClientCreditCard implements \ArrayAccess, \Iterator, \Countable
{

    /**
     * @var ClientCreditCard[] $ClientCreditCard
     */
    protected $ClientCreditCard = null;

    
    public function __construct()
    {
    
    }

    /**
     * @return ClientCreditCard[]
     */
    public function getClientCreditCard()
    {
      return $this->ClientCreditCard;
    }

    /**
     * @param ClientCreditCard[] $ClientCreditCard
     * @return \Famoser\MBOApiWrapper\FinderService\ArrayOfClientCreditCard
     */
    public function setClientCreditCard(array $ClientCreditCard = null)
    {
      $this->ClientCreditCard = $ClientCreditCard;
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
      return isset($this->ClientCreditCard[$offset]);
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to retrieve
     * @return ClientCreditCard
     */
    public function offsetGet($offset)
    {
      return $this->ClientCreditCard[$offset];
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to assign the value to
     * @param ClientCreditCard $value The value to set
     * @return void
     */
    public function offsetSet($offset, $value)
    {
      $this->ClientCreditCard[$offset] = $value;
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to unset
     * @return void
     */
    public function offsetUnset($offset)
    {
      unset($this->ClientCreditCard[$offset]);
    }

    /**
     * Iterator implementation
     *
     * @return ClientCreditCard Return the current element
     */
    public function current()
    {
      return current($this->ClientCreditCard);
    }

    /**
     * Iterator implementation
     * Move forward to next element
     *
     * @return void
     */
    public function next()
    {
      next($this->ClientCreditCard);
    }

    /**
     * Iterator implementation
     *
     * @return string|null Return the key of the current element or null
     */
    public function key()
    {
      return key($this->ClientCreditCard);
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
      reset($this->ClientCreditCard);
    }

    /**
     * Countable implementation
     *
     * @return ClientCreditCard Return count of elements
     */
    public function count()
    {
      return count($this->ClientCreditCard);
    }

}
