<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 28.08.2016
 * Time: 16:36
 */

namespace Famoser\OnlineOfficeBundle\Entity\Base;


abstract class RoleEntity
{
    /**
     * @return string
     */
    abstract protected function getRoles();

    /**
     * @return array
     */
    private function getRolesPrivate()
    {
        return unserialize($this->getRoles());
    }

    /**
     * @param string $roles
     * @return mixed
     */
    abstract protected function setRoles($roles);

    /**
     * @param array $roles
     */
    private function setRolesPrivate($roles)
    {
        $this->setRoles(serialize($roles));
    }


    public function addRole($role)
    {
        $roles = $this->getRolesPrivate();

        if (!in_array($role, $roles)) {
            $roles[] = $role;
        }

        $this->setRolesPrivate($roles);

        return $this;
    }

    public function removeRole($role)
    {
        $roles = $this->getRolesPrivate();

        if (($key = array_search($role, $roles)) !== false) {
            unset($roles[$key]);
        }

        $this->setRolesPrivate($roles);
        return $this;
    }

    public function hasRole($role)
    {
        $roles = $this->getRolesPrivate();
        return in_array($role, $roles);
    }
}