<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetCoursesResult extends MBResult
{

    /**
     * @var ArrayOfCourse $Courses
     */
    protected $Courses = null;

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
     * @return ArrayOfCourse
     */
    public function getCourses()
    {
      return $this->Courses;
    }

    /**
     * @param ArrayOfCourse $Courses
     * @return \Famoser\MBOApiWrapper\ClassService\GetCoursesResult
     */
    public function setCourses($Courses)
    {
      $this->Courses = $Courses;
      return $this;
    }

}
