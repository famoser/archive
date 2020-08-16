<?php

namespace Famoser\MBOApiWrapper\SaleService;

class CheckoutShoppingCartResult extends MBResult
{

    /**
     * @var ShoppingCart $ShoppingCart
     */
    protected $ShoppingCart = null;

    /**
     * @var ArrayOfClass $Classes
     */
    protected $Classes = null;

    /**
     * @var ArrayOfAppointment $Appointments
     */
    protected $Appointments = null;

    /**
     * @var ArrayOfClassSchedule $Enrollments
     */
    protected $Enrollments = null;

    /**
     * @param StatusCode $Status
     * @param int $ErrorCode
     * @param XMLDetailLevel $XMLDetail
     * @param int $ResultCount
     * @param int $CurrentPageIndex
     * @param int $TotalPageCount
     */
    public function __construct($Status, $ErrorCode, $XMLDetail, $ResultCount, $CurrentPageIndex, $TotalPageCount)
    {
      parent::__construct($Status, $ErrorCode, $XMLDetail, $ResultCount, $CurrentPageIndex, $TotalPageCount);
    }

    /**
     * @return ShoppingCart
     */
    public function getShoppingCart()
    {
      return $this->ShoppingCart;
    }

    /**
     * @param ShoppingCart $ShoppingCart
     * @return \Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartResult
     */
    public function setShoppingCart($ShoppingCart)
    {
      $this->ShoppingCart = $ShoppingCart;
      return $this;
    }

    /**
     * @return ArrayOfClass
     */
    public function getClasses()
    {
      return $this->Classes;
    }

    /**
     * @param ArrayOfClass $Classes
     * @return \Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartResult
     */
    public function setClasses($Classes)
    {
      $this->Classes = $Classes;
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
     * @return \Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartResult
     */
    public function setAppointments($Appointments)
    {
      $this->Appointments = $Appointments;
      return $this;
    }

    /**
     * @return ArrayOfClassSchedule
     */
    public function getEnrollments()
    {
      return $this->Enrollments;
    }

    /**
     * @param ArrayOfClassSchedule $Enrollments
     * @return \Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartResult
     */
    public function setEnrollments($Enrollments)
    {
      $this->Enrollments = $Enrollments;
      return $this;
    }

}
