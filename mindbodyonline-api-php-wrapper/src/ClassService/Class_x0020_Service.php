<?php

namespace Famoser\MBOApiWrapper\ClassService;


/**
 * Provides methods and attributes relating to classes and enrollments.
 */
class Class_x0020_Service extends \SoapClient
{

    /**
     * @var array $classmap The defined classes
     */
    private static $classmap = array(
        'GetClasses' => 'Famoser\\MBOApiWrapper\\ClassService\\GetClasses',
        'GetClassesRequest' => 'Famoser\\MBOApiWrapper\\ClassService\\GetClassesRequest',
        'MBRequest' => 'Famoser\\MBOApiWrapper\\ClassService\\MBRequest',
        'SourceCredentials' => 'Famoser\\MBOApiWrapper\\ClassService\\SourceCredentials',
        'ArrayOfInt' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfInt',
        'UserCredentials' => 'Famoser\\MBOApiWrapper\\ClassService\\UserCredentials',
        'ArrayOfString' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfString',
        'ArrayOfLong' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfLong',
        'GetClassesResponse' => 'Famoser\\MBOApiWrapper\\ClassService\\GetClassesResponse',
        'GetClassesResult' => 'Famoser\\MBOApiWrapper\\ClassService\\GetClassesResult',
        'MBResult' => 'Famoser\\MBOApiWrapper\\ClassService\\MBResult',
        'ArrayOfClass' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfClass',
        'Class' => 'Famoser\\MBOApiWrapper\\ClassService\\ClassCustom',
        'MBObject' => 'Famoser\\MBOApiWrapper\\ClassService\\MBObject',
        'Site' => 'Famoser\\MBOApiWrapper\\ClassService\\Site',
        'ClassDescription' => 'Famoser\\MBOApiWrapper\\ClassService\\ClassDescription',
        'Level' => 'Famoser\\MBOApiWrapper\\ClassService\\Level',
        'Program' => 'Famoser\\MBOApiWrapper\\ClassService\\Program',
        'SessionType' => 'Famoser\\MBOApiWrapper\\ClassService\\SessionType',
        'Resource' => 'Famoser\\MBOApiWrapper\\ClassService\\Resource',
        'ClientService' => 'Famoser\\MBOApiWrapper\\ClassService\\ClientService',
        'SalesRep' => 'Famoser\\MBOApiWrapper\\ClassService\\SalesRep',
        'Rep' => 'Famoser\\MBOApiWrapper\\ClassService\\Rep',
        'Staff' => 'Famoser\\MBOApiWrapper\\ClassService\\Staff',
        'ArrayOfAppointment' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfAppointment',
        'Appointment' => 'Famoser\\MBOApiWrapper\\ClassService\\Appointment',
        'ScheduleItem' => 'Famoser\\MBOApiWrapper\\ClassService\\ScheduleItem',
        'Unavailability' => 'Famoser\\MBOApiWrapper\\ClassService\\Unavailability',
        'Availability' => 'Famoser\\MBOApiWrapper\\ClassService\\Availability',
        'ArrayOfProgram' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfProgram',
        'Location' => 'Famoser\\MBOApiWrapper\\ClassService\\Location',
        'Client' => 'Famoser\\MBOApiWrapper\\ClassService\\Client',
        'ArrayOfClientIndex' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfClientIndex',
        'ClientIndex' => 'Famoser\\MBOApiWrapper\\ClassService\\ClientIndex',
        'ArrayOfClientIndexValue' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfClientIndexValue',
        'ClientIndexValue' => 'Famoser\\MBOApiWrapper\\ClassService\\ClientIndexValue',
        'ClientCreditCard' => 'Famoser\\MBOApiWrapper\\ClassService\\ClientCreditCard',
        'ArrayOfClientRelationship' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfClientRelationship',
        'ClientRelationship' => 'Famoser\\MBOApiWrapper\\ClassService\\ClientRelationship',
        'Relationship' => 'Famoser\\MBOApiWrapper\\ClassService\\Relationship',
        'ArrayOfRep' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfRep',
        'ArrayOfSalesRep' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfSalesRep',
        'ArrayOfCustomClientField' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfCustomClientField',
        'CustomClientField' => 'Famoser\\MBOApiWrapper\\ClassService\\CustomClientField',
        'Liability' => 'Famoser\\MBOApiWrapper\\ClassService\\Liability',
        'ProspectStage' => 'Famoser\\MBOApiWrapper\\ClassService\\ProspectStage',
        'ArrayOfResource' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfResource',
        'ArrayOfUnavailability' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfUnavailability',
        'ArrayOfAvailability' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfAvailability',
        'ArrayOfLocation' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfLocation',
        'ArrayOfProviderIDUpdate' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfProviderIDUpdate',
        'ProviderIDUpdate' => 'Famoser\\MBOApiWrapper\\ClassService\\ProviderIDUpdate',
        'Visit' => 'Famoser\\MBOApiWrapper\\ClassService\\Visit',
        'ArrayOfVisit' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfVisit',
        'ArrayOfClient' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfClient',
        'UpdateClientVisits' => 'Famoser\\MBOApiWrapper\\ClassService\\UpdateClientVisits',
        'UpdateClientVisitsRequest' => 'Famoser\\MBOApiWrapper\\ClassService\\UpdateClientVisitsRequest',
        'UpdateClientVisitsResponse' => 'Famoser\\MBOApiWrapper\\ClassService\\UpdateClientVisitsResponse',
        'UpdateClientVisitsResult' => 'Famoser\\MBOApiWrapper\\ClassService\\UpdateClientVisitsResult',
        'GetClassVisits' => 'Famoser\\MBOApiWrapper\\ClassService\\GetClassVisits',
        'GetClassVisitsRequest' => 'Famoser\\MBOApiWrapper\\ClassService\\GetClassVisitsRequest',
        'GetClassVisitsResponse' => 'Famoser\\MBOApiWrapper\\ClassService\\GetClassVisitsResponse',
        'GetClassVisitsResult' => 'Famoser\\MBOApiWrapper\\ClassService\\GetClassVisitsResult',
        'GetClassDescriptions' => 'Famoser\\MBOApiWrapper\\ClassService\\GetClassDescriptions',
        'GetClassDescriptionsRequest' => 'Famoser\\MBOApiWrapper\\ClassService\\GetClassDescriptionsRequest',
        'GetClassDescriptionsResponse' => 'Famoser\\MBOApiWrapper\\ClassService\\GetClassDescriptionsResponse',
        'GetClassDescriptionsResult' => 'Famoser\\MBOApiWrapper\\ClassService\\GetClassDescriptionsResult',
        'ArrayOfClassDescription' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfClassDescription',
        'GetEnrollments' => 'Famoser\\MBOApiWrapper\\ClassService\\GetEnrollments',
        'GetEnrollmentsRequest' => 'Famoser\\MBOApiWrapper\\ClassService\\GetEnrollmentsRequest',
        'GetEnrollmentsResponse' => 'Famoser\\MBOApiWrapper\\ClassService\\GetEnrollmentsResponse',
        'GetEnrollmentsResult' => 'Famoser\\MBOApiWrapper\\ClassService\\GetEnrollmentsResult',
        'ArrayOfClassSchedule' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfClassSchedule',
        'ClassSchedule' => 'Famoser\\MBOApiWrapper\\ClassService\\ClassSchedule',
        'Course' => 'Famoser\\MBOApiWrapper\\ClassService\\Course',
        'GetClassSchedules' => 'Famoser\\MBOApiWrapper\\ClassService\\GetClassSchedules',
        'GetClassSchedulesRequest' => 'Famoser\\MBOApiWrapper\\ClassService\\GetClassSchedulesRequest',
        'GetClassSchedulesResponse' => 'Famoser\\MBOApiWrapper\\ClassService\\GetClassSchedulesResponse',
        'GetClassSchedulesResult' => 'Famoser\\MBOApiWrapper\\ClassService\\GetClassSchedulesResult',
        'AddClientsToClasses' => 'Famoser\\MBOApiWrapper\\ClassService\\AddClientsToClasses',
        'AddClientsToClassesRequest' => 'Famoser\\MBOApiWrapper\\ClassService\\AddClientsToClassesRequest',
        'AddClientsToClassesResponse' => 'Famoser\\MBOApiWrapper\\ClassService\\AddClientsToClassesResponse',
        'AddClientsToClassesResult' => 'Famoser\\MBOApiWrapper\\ClassService\\AddClientsToClassesResult',
        'RemoveClientsFromClasses' => 'Famoser\\MBOApiWrapper\\ClassService\\RemoveClientsFromClasses',
        'RemoveClientsFromClassesRequest' => 'Famoser\\MBOApiWrapper\\ClassService\\RemoveClientsFromClassesRequest',
        'RemoveClientsFromClassesResponse' => 'Famoser\\MBOApiWrapper\\ClassService\\RemoveClientsFromClassesResponse',
        'RemoveClientsFromClassesResult' => 'Famoser\\MBOApiWrapper\\ClassService\\RemoveClientsFromClassesResult',
        'AddClientsToEnrollments' => 'Famoser\\MBOApiWrapper\\ClassService\\AddClientsToEnrollments',
        'AddClientsToEnrollmentsRequest' => 'Famoser\\MBOApiWrapper\\ClassService\\AddClientsToEnrollmentsRequest',
        'ArrayOfDateTime' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfDateTime',
        'AddClientsToEnrollmentsResponse' => 'Famoser\\MBOApiWrapper\\ClassService\\AddClientsToEnrollmentsResponse',
        'AddClientsToEnrollmentsResult' => 'Famoser\\MBOApiWrapper\\ClassService\\AddClientsToEnrollmentsResult',
        'RemoveFromWaitlist' => 'Famoser\\MBOApiWrapper\\ClassService\\RemoveFromWaitlist',
        'RemoveFromWaitlistRequest' => 'Famoser\\MBOApiWrapper\\ClassService\\RemoveFromWaitlistRequest',
        'RemoveFromWaitlistResponse' => 'Famoser\\MBOApiWrapper\\ClassService\\RemoveFromWaitlistResponse',
        'RemoveFromWaitlistResult' => 'Famoser\\MBOApiWrapper\\ClassService\\RemoveFromWaitlistResult',
        'GetSemesters' => 'Famoser\\MBOApiWrapper\\ClassService\\GetSemesters',
        'GetSemestersRequest' => 'Famoser\\MBOApiWrapper\\ClassService\\GetSemestersRequest',
        'GetSemestersResponse' => 'Famoser\\MBOApiWrapper\\ClassService\\GetSemestersResponse',
        'GetSemestersResult' => 'Famoser\\MBOApiWrapper\\ClassService\\GetSemestersResult',
        'ArrayOfSemester' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfSemester',
        'Semester' => 'Famoser\\MBOApiWrapper\\ClassService\\Semester',
        'GetCourses' => 'Famoser\\MBOApiWrapper\\ClassService\\GetCourses',
        'GetCoursesRequest' => 'Famoser\\MBOApiWrapper\\ClassService\\GetCoursesRequest',
        'GetCoursesResponse' => 'Famoser\\MBOApiWrapper\\ClassService\\GetCoursesResponse',
        'GetCoursesResult' => 'Famoser\\MBOApiWrapper\\ClassService\\GetCoursesResult',
        'ArrayOfCourse' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfCourse',
        'GetWaitlistEntries' => 'Famoser\\MBOApiWrapper\\ClassService\\GetWaitlistEntries',
        'GetWaitlistEntriesRequest' => 'Famoser\\MBOApiWrapper\\ClassService\\GetWaitlistEntriesRequest',
        'GetWaitlistEntriesResponse' => 'Famoser\\MBOApiWrapper\\ClassService\\GetWaitlistEntriesResponse',
        'GetWaitlistEntriesResult' => 'Famoser\\MBOApiWrapper\\ClassService\\GetWaitlistEntriesResult',
        'ArrayOfWaitlistEntry' => 'Famoser\\MBOApiWrapper\\ClassService\\ArrayOfWaitlistEntry',
        'WaitlistEntry' => 'Famoser\\MBOApiWrapper\\ClassService\\WaitlistEntry',
        'SubstituteClassTeacher' => 'Famoser\\MBOApiWrapper\\ClassService\\SubstituteClassTeacher',
        'SubstituteClassTeacherRequest' => 'Famoser\\MBOApiWrapper\\ClassService\\SubstituteClassTeacherRequest',
        'SubstituteClassTeacherResponse' => 'Famoser\\MBOApiWrapper\\ClassService\\SubstituteClassTeacherResponse',
        'SubstituteClassTeacherResult' => 'Famoser\\MBOApiWrapper\\ClassService\\SubstituteClassTeacherResult',
        'SubtituteClassTeacher' => 'Famoser\\MBOApiWrapper\\ClassService\\SubtituteClassTeacher',
        'SubtituteClassTeacherResponse' => 'Famoser\\MBOApiWrapper\\ClassService\\SubtituteClassTeacherResponse',
        'CancelSingleClass' => 'Famoser\\MBOApiWrapper\\ClassService\\CancelSingleClass',
        'CancelSingleClassRequest' => 'Famoser\\MBOApiWrapper\\ClassService\\CancelSingleClassRequest',
        'CancelSingleClassResponse' => 'Famoser\\MBOApiWrapper\\ClassService\\CancelSingleClassResponse',
        'CancelSingleClassResult' => 'Famoser\\MBOApiWrapper\\ClassService\\CancelSingleClassResult',
    );

    /**
     * @param array $options A array of config values
     * @param string $wsdl The wsdl file to use
     */
    public function __construct(array $options = array(), $wsdl = null)
    {
        foreach (self::$classmap as $key => $value) {
            if (!isset($options['classmap'][$key])) {
                $options['classmap'][$key] = $value;
            }
        }
        $options = array_merge(array(
            'features' => 1,
        ), $options);
        if (!$wsdl) {
            $wsdl = 'https://api.mindbodyonline.com/0_5/ClassService.asmx?WSDL';
        }
        parent::__construct($wsdl, $options);
    }

    /**
     * Gets a list of classes.
     *
     * @param GetClasses $parameters
     * @return GetClassesResponse
     */
    public function GetClasses(GetClasses $parameters)
    {
        return $this->__soapCall('GetClasses', array($parameters));
    }

    /**
     * Update a list of visits.
     *
     * @param UpdateClientVisits $parameters
     * @return UpdateClientVisitsResponse
     */
    public function UpdateClientVisits(UpdateClientVisits $parameters)
    {
        return $this->__soapCall('UpdateClientVisits', array($parameters));
    }

    /**
     * Gets a class with a list of clients.
     *
     * @param GetClassVisits $parameters
     * @return GetClassVisitsResponse
     */
    public function GetClassVisits(GetClassVisits $parameters)
    {
        return $this->__soapCall('GetClassVisits', array($parameters));
    }

    /**
     * Gets a list of class descriptions.
     *
     * @param GetClassDescriptions $parameters
     * @return GetClassDescriptionsResponse
     */
    public function GetClassDescriptions(GetClassDescriptions $parameters)
    {
        return $this->__soapCall('GetClassDescriptions', array($parameters));
    }

    /**
     * Gets a list of enrollments.
     *
     * @param GetEnrollments $parameters
     * @return GetEnrollmentsResponse
     */
    public function GetEnrollments(GetEnrollments $parameters)
    {
        return $this->__soapCall('GetEnrollments', array($parameters));
    }

    /**
     * Gets a list of class schedules.
     *
     * @param GetClassSchedules $parameters
     * @return GetClassSchedulesResponse
     */
    public function GetClassSchedules(GetClassSchedules $parameters)
    {
        return $this->__soapCall('GetClassSchedules', array($parameters));
    }

    /**
     * Adds clients to classes (signup).
     *
     * @param AddClientsToClasses $parameters
     * @return AddClientsToClassesResponse
     */
    public function AddClientsToClasses(AddClientsToClasses $parameters)
    {
        return $this->__soapCall('AddClientsToClasses', array($parameters));
    }

    /**
     * Removes clients from classes.
     *
     * @param RemoveClientsFromClasses $parameters
     * @return RemoveClientsFromClassesResponse
     */
    public function RemoveClientsFromClasses(RemoveClientsFromClasses $parameters)
    {
        return $this->__soapCall('RemoveClientsFromClasses', array($parameters));
    }

    /**
     * Adds clients to enrollments (signup).
     *
     * @param AddClientsToEnrollments $parameters
     * @return AddClientsToEnrollmentsResponse
     */
    public function AddClientsToEnrollments(AddClientsToEnrollments $parameters)
    {
        return $this->__soapCall('AddClientsToEnrollments', array($parameters));
    }

    /**
     * Removes client from enrollment waitlist
     *
     * @param RemoveFromWaitlist $parameters
     * @return RemoveFromWaitlistResponse
     */
    public function RemoveFromWaitlist(RemoveFromWaitlist $parameters)
    {
        return $this->__soapCall('RemoveFromWaitlist', array($parameters));
    }

    /**
     * Gets a list of semesters.
     *
     * @param GetSemesters $parameters
     * @return GetSemestersResponse
     */
    public function GetSemesters(GetSemesters $parameters)
    {
        return $this->__soapCall('GetSemesters', array($parameters));
    }

    /**
     * Gets a list of courses.
     *
     * @param GetCourses $parameters
     * @return GetCoursesResponse
     */
    public function GetCourses(GetCourses $parameters)
    {
        return $this->__soapCall('GetCourses', array($parameters));
    }

    /**
     * Get waitlist entries.
     *
     * @param GetWaitlistEntries $parameters
     * @return GetWaitlistEntriesResponse
     */
    public function GetWaitlistEntries(GetWaitlistEntries $parameters)
    {
        return $this->__soapCall('GetWaitlistEntries', array($parameters));
    }

    /**
     * Substitutes the teacher for a class.
     *
     * @param SubstituteClassTeacher $parameters
     * @return SubstituteClassTeacherResponse
     */
    public function SubstituteClassTeacher(SubstituteClassTeacher $parameters)
    {
        return $this->__soapCall('SubstituteClassTeacher', array($parameters));
    }

    /**
     * Substitutes the teacher for a class.
     *
     * @param SubtituteClassTeacher $parameters
     * @return SubtituteClassTeacherResponse
     */
    public function SubtituteClassTeacher(SubtituteClassTeacher $parameters)
    {
        return $this->__soapCall('SubtituteClassTeacher', array($parameters));
    }

    /**
     * Cancels a single class instance.
     *
     * @param CancelSingleClass $parameters
     * @return CancelSingleClassResponse
     */
    public function CancelSingleClass(CancelSingleClass $parameters)
    {
        return $this->__soapCall('CancelSingleClass', array($parameters));
    }

}
