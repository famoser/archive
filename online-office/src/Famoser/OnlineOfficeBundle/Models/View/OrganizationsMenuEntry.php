<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 24/08/2016
 * Time: 19:58
 */

namespace Famoser\OnlineOfficeBundle\Models\View;


use Famoser\OnlineOfficeBundle\Entity\Organizations;

class OrganizationsMenuEntry
{
    private $isSelected;
    private $organizationName;
    private $organizationId;


    public function __construct(Organizations $organization, $isSelected)
    {
        $this->isSelected = $isSelected;
        $this->organizationName = $organization->getName();
        $this->organizationId = $organization->getId();
    }

    /**
     * @return mixed
     */
    public function getIsSelected()
    {
        return $this->isSelected;
    }

    /**
     * @return mixed
     */
    public function getIsActive()
    {
        return $this->isSelected ? "active" : "";
    }

    /**
     * @return string
     */
    public function getOrganizationName()
    {
        return $this->organizationName;
    }

    /**
     * @return int
     */
    public function getOrganizationId()
    {
        return $this->organizationId;
    }
}