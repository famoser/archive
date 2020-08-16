<?php

namespace Famoser\MBOApiWrapper\SaleService;

class CartItem extends MBObject
{

    /**
     * @var Item $Item
     */
    protected $Item = null;

    /**
     * @var float $DiscountAmount
     */
    protected $DiscountAmount = null;

    /**
     * @var ArrayOfAppointment $Appointments
     */
    protected $Appointments = null;

    /**
     * @var ArrayOfInt $EnrollmentIDs
     */
    protected $EnrollmentIDs = null;

    /**
     * @var ArrayOfInt $ClassIDs
     */
    protected $ClassIDs = null;

    /**
     * @var ArrayOfLong $CourseIDs
     */
    protected $CourseIDs = null;

    /**
     * @var ArrayOfLong $VisitIDs
     */
    protected $VisitIDs = null;

    /**
     * @var ArrayOfLong $AppointmentIDs
     */
    protected $AppointmentIDs = null;

    /**
     * @var ActionCode $Action
     */
    protected $Action = null;

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var int $Quantity
     */
    protected $Quantity = null;

    /**
     * @param float $DiscountAmount
     */
    public function __construct($DiscountAmount)
    {
      parent::__construct();
      $this->DiscountAmount = $DiscountAmount;
    }

    /**
     * @return Item
     */
    public function getItem()
    {
      return $this->Item;
    }

    /**
     * @param Item $Item
     * @return \Famoser\MBOApiWrapper\SaleService\CartItem
     */
    public function setItem($Item)
    {
      $this->Item = $Item;
      return $this;
    }

    /**
     * @return float
     */
    public function getDiscountAmount()
    {
      return $this->DiscountAmount;
    }

    /**
     * @param float $DiscountAmount
     * @return \Famoser\MBOApiWrapper\SaleService\CartItem
     */
    public function setDiscountAmount($DiscountAmount)
    {
      $this->DiscountAmount = $DiscountAmount;
      return $this;
    }

    /**
     * @return ArrayOfAppointment
     */
    public function getAppointments()
    {
      return $this->Appointments;
    }

    /**
     * @param ArrayOfAppointment $Appointments
     * @return \Famoser\MBOApiWrapper\SaleService\CartItem
     */
    public function setAppointments($Appointments)
    {
      $this->Appointments = $Appointments;
      return $this;
    }

    /**
     * @return ArrayOfInt
     */
    public function getEnrollmentIDs()
    {
      return $this->EnrollmentIDs;
    }

    /**
     * @param ArrayOfInt $EnrollmentIDs
     * @return \Famoser\MBOApiWrapper\SaleService\CartItem
     */
    public function setEnrollmentIDs($EnrollmentIDs)
    {
      $this->EnrollmentIDs = $EnrollmentIDs;
      return $this;
    }

    /**
     * @return ArrayOfInt
     */
    public function getClassIDs()
    {
      return $this->ClassIDs;
    }

    /**
     * @param ArrayOfInt $ClassIDs
     * @return \Famoser\MBOApiWrapper\SaleService\CartItem
     */
    public function setClassIDs($ClassIDs)
    {
      $this->ClassIDs = $ClassIDs;
      return $this;
    }

    /**
     * @return ArrayOfLong
     */
    public function getCourseIDs()
    {
      return $this->CourseIDs;
    }

    /**
     * @param ArrayOfLong $CourseIDs
     * @return \Famoser\MBOApiWrapper\SaleService\CartItem
     */
    public function setCourseIDs($CourseIDs)
    {
      $this->CourseIDs = $CourseIDs;
      return $this;
    }

    /**
     * @return ArrayOfLong
     */
    public function getVisitIDs()
    {
      return $this->VisitIDs;
    }

    /**
     * @param ArrayOfLong $VisitIDs
     * @return \Famoser\MBOApiWrapper\SaleService\CartItem
     */
    public function setVisitIDs($VisitIDs)
    {
      $this->VisitIDs = $VisitIDs;
      return $this;
    }

    /**
     * @return ArrayOfLong
     */
    public function getAppointmentIDs()
    {
      return $this->AppointmentIDs;
    }

    /**
     * @param ArrayOfLong $AppointmentIDs
     * @return \Famoser\MBOApiWrapper\SaleService\CartItem
     */
    public function setAppointmentIDs($AppointmentIDs)
    {
      $this->AppointmentIDs = $AppointmentIDs;
      return $this;
    }

    /**
     * @return ActionCode
     */
    public function getAction()
    {
      return $this->Action;
    }

    /**
     * @param ActionCode $Action
     * @return \Famoser\MBOApiWrapper\SaleService\CartItem
     */
    public function setAction($Action)
    {
      $this->Action = $Action;
      return $this;
    }

    /**
     * @return int
     */
    public function getID()
    {
      return $this->ID;
    }

    /**
     * @param int $ID
     * @return \Famoser\MBOApiWrapper\SaleService\CartItem
     */
    public function setID($ID)
    {
      $this->ID = $ID;
      return $this;
    }

    /**
     * @return int
     */
    public function getQuantity()
    {
      return $this->Quantity;
    }

    /**
     * @param int $Quantity
     * @return \Famoser\MBOApiWrapper\SaleService\CartItem
     */
    public function setQuantity($Quantity)
    {
      $this->Quantity = $Quantity;
      return $this;
    }

}
