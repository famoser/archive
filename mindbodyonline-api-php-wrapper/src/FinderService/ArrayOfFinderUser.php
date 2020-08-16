<?php

namespace Famoser\MBOApiWrapper\FinderService;

class ArrayOfFinderUser implements \ArrayAccess, \Iterator, \Countable
{

    /**
     * @var FinderUser[] $FinderUser
     */
    protected $FinderUser = null;

    
    public function __construct()
    {
    
    }

    /**
     * @return FinderUser[]
     */
    public function getFinderUser()
    {
      return $this->FinderUser;
    }

    /**
     * @param FinderUser[] $FinderUser
     * @return \Famoser\MBOApiWrapper\FinderService\ArrayOfFinderUser
     */
    public function setFinderUser(array $FinderUser = null)
    {
      $this->FinderUser = $FinderUser;
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
      return isset($this->FinderUser[$offset]);
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to retrieve
     * @return FinderUser
     */
    public function offsetGet($offset)
    {
      return $this->FinderUser[$offset];
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to assign the value to
     * @param FinderUser $value The value to set
     * @return void
     */
    public function offsetSet($offset, $value)
    {
      $this->FinderUser[$offset] = $value;
    }

    /**
     * ArrayAccess implementation
     *
     * @param mixed $offset The offset to unset
     * @return void
     */
    public function offsetUnset($offset)
    {
      unset($this->FinderUser[$offset]);
    }

    /**
     * Iterator implementation
     *
     * @return FinderUser Return the current element
     */
    public function current()
    {
      return current($this->FinderUser);
    }

    /**
     * Iterator implementation
     * Move forward to next element
     *
     * @return void
     */
    public function next()
    {
      next($this->FinderUser);
    }

    /**
     * Iterator implementation
     *
     * @return string|null Return the key of the current element or null
     */
    public function key()
    {
      return key($this->FinderUser);
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
      reset($this->FinderUser);
    }

    /**
     * Countable implementation
     *
     * @return FinderUser Return count of elements
     */
    public function count()
    {
      return count($this->FinderUser);
    }

}
