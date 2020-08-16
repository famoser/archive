<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 23/08/2016
 * Time: 21:05
 */

namespace Famoser\OnlineOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Notification
 *
 * @ORM\Entity(repositoryClass="Famoser\OnlineOfficeBundle\Entity\Repositories\NotificationsRepository")
 */
class Notification
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
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $linkType;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $linkArguments;

    /**
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    private $isRead;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime")
     */
    private $notificationDate;

    /**
     * @var Persons
     *
     * @ORM\ManyToOne(targetEntity="Persons")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $receiver;

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
     * Set name
     *
     * @param string $name
     *
     * @return Notifications
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Notifications
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set linkType
     *
     * @param string $linkType
     *
     * @return Notifications
     */
    public function setLinkType($linkType)
    {
        $this->linkType = $linkType;

        return $this;
    }

    /**
     * Get linkType
     *
     * @return string
     */
    public function getLinkType()
    {
        return $this->linkType;
    }

    /**
     * Set linkArguments
     *
     * @param string $linkArguments
     *
     * @return Notifications
     */
    public function setLinkArguments($linkArguments)
    {
        $this->linkArguments = $linkArguments;

        return $this;
    }

    /**
     * Get linkArguments
     *
     * @return string
     */
    public function getLinkArguments()
    {
        return $this->linkArguments;
    }

    /**
     * Set isRead
     *
     * @param boolean $isRead
     *
     * @return Notifications
     */
    public function setIsRead($isRead)
    {
        $this->isRead = $isRead;

        return $this;
    }

    /**
     * Get isRead
     *
     * @return boolean
     */
    public function getIsRead()
    {
        return $this->isRead;
    }

    /**
     * Set receiver
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\Persons $receiver
     *
     * @return Notifications
     */
    public function setReceiver(\Famoser\OnlineOfficeBundle\Entity\Persons $receiver = null)
    {
        $this->receiver = $receiver;

        return $this;
    }

    /**
     * Get receiver
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\Persons
     */
    public function getReceiver()
    {
        return $this->receiver;
    }

    /**
     * @return \DateTime
     */
    public function getNotificationDate()
    {
        return $this->notificationDate;
    }

    /**
     * @param \DateTime $notificationDate
     */
    public function setNotificationDate($notificationDate)
    {
        $this->notificationDate = $notificationDate;
    }
}
