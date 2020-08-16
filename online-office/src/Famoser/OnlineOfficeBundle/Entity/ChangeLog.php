<?php

namespace Famoser\OnlineOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ChangeLog
 *
 * @ORM\Entity
 */
class ChangeLog
{
    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $changedTable;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    private $changedEntryId;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $content;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime")
     */
    private $changeDate;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="changeLogs")
     */
    private $changer;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set changedTable
     *
     * @param string $changedTable
     *
     * @return ChangeLog
     */
    public function setChangedTable($changedTable)
    {
        $this->changedTable = $changedTable;

        return $this;
    }

    /**
     * Get changedTable
     *
     * @return string
     */
    public function getChangedTable()
    {
        return $this->changedTable;
    }

    /**
     * Set changedEntryId
     *
     * @param integer $changedEntryId
     *
     * @return ChangeLog
     */
    public function setChangedEntryId($changedEntryId)
    {
        $this->changedEntryId = $changedEntryId;

        return $this;
    }

    /**
     * Get changedEntryId
     *
     * @return integer
     */
    public function getChangedEntryId()
    {
        return $this->changedEntryId;
    }

    /**
     * Set content
     *
     * @param string $content
     *
     * @return ChangeLog
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get content
     *
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set changeDate
     *
     * @param \DateTime $changeDate
     *
     * @return ChangeLog
     */
    public function setChangeDate($changeDate)
    {
        $this->changeDate = $changeDate;

        return $this;
    }

    /**
     * Get changeDate
     *
     * @return \DateTime
     */
    public function getChangeDate()
    {
        return $this->changeDate;
    }

    /**
     * @return User
     */
    public function getChanger()
    {
        return $this->changer;
    }

    /**
     * @param User $changer
     */
    public function setChanger($changer)
    {
        $this->changer = $changer;
    }
}
