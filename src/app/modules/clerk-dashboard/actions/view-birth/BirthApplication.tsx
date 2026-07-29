import { Button, Card, Notification, toast } from '@/components/ui'
import Container from '../../components/HomeContainer'
import { ActionLink } from '@/components/shared'
import {
    Baby,
    CalendarDays,
    Clock3,
    FileText,
    Image,
    Mail,
    MapPin,
    Phone,
    User,
    Users,
    Weight,
    ArrowLeft,
} from 'lucide-react'
import { Application } from '@/app/@api/application-module/application.types'
import { useEffect, useState } from 'react'
import { ApplicationApis } from '@/app/@api/application-module/application.api'

const goback = '/app/clerk/applications'

interface birthApplicationProp {
    id: Application.Id
}

const BirthApplication = ({ id }: birthApplicationProp) => {
    // const id = '6a5fc8e48c67b6dc31dbf1c9' as Application.Id
    const [applicationData, setApplicationData] = useState<Application.Detail>()

    const fetchApplicationData = async () => {
        try {
            const res = await ApplicationApis.get(id)
            setApplicationData(res.data || res)
        } catch {
            toast.push(
                <Notification closable type="danger" duration={3000}>
                    Something went wrong while fetching Application data!!
                </Notification>,
            )
        }
    }

    useEffect(() => {
        fetchApplicationData()
    }, [id])

    return (
        <main>
            <Container className="max-w-full">
                <div className="flex justify-between items-end">
                    <div>
                        <h3>Birth Application Details</h3>
                        <p>
                            Review all submitted information and uploaded
                            documents before verifying the applicant during the
                            online video verification process.
                        </p>
                    </div>
                    <ActionLink to={goback} themeColor={false}>
                        <Button variant="solid">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>
                    </ActionLink>
                </div>
                {/* Baby's information */}
                <div className="grid grid-cols-12 gap-5 mt-6">
                    <div className="col-span-8">
                        <Card className="bg-neutral-50 dark:bg-gray-600">
                            <div className="flex items-center gap-3 mb-6">
                                <Baby className="text-blue-600 h-10 w-10" />
                                <div>
                                    <h4>Baby Information</h4>
                                    <p>
                                        Information entered while submitting the
                                        birth certificate application.
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2  gap-6">
                                <div className="flex">
                                    <User className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Baby Name
                                        </p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .babyName
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <CalendarDays className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Date of Birth
                                        </p>
                                        <p>
                                            {applicationData?.serviceId.birthDateAndTime.slice(
                                                0,
                                                10,
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Clock3 className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Birth Time
                                        </p>
                                        <p>
                                            {applicationData?.serviceId.birthDateAndTime.slice(
                                                11,
                                                19,
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Weight className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Birth Weight
                                        </p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .babyWeight
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Users className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">Gender</p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .babyGender
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <MapPin className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            District
                                        </p>
                                        <p>
                                            {
                                                applicationData
                                                    ?.officeDepartmentId
                                                    .officeId.districtId.name
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <MapPin className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Place Of Birth
                                        </p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .birthPlace
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <MapPin className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">State</p>
                                        <p>
                                            {
                                                applicationData
                                                    ?.officeDepartmentId
                                                    .officeId.districtId.stateId
                                                    .name
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/*SECTION: Application Details */}
                    <div className="col-span-4">
                        <Card className="bg-neutral-50 dark:bg-gray-600 h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="text-violet-600 h-10 w-10" />
                                <div>
                                    <h4>Application Details</h4>
                                    <p>
                                        Submission information for this birth
                                        certificate application.
                                    </p>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex my-4">
                                    <User className="mr-3 " />
                                    <div className="my-0">
                                        <p className="font-semibold ">
                                            Submitted By
                                        </p>

                                        <p>
                                            {
                                                applicationData?.userId.aadharId
                                                    .firstName
                                            }{' '}
                                            {
                                                applicationData?.userId.aadharId
                                                    .lastName
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex my-4">
                                    <User className="mr-3 " />
                                    <div className="my-0">
                                        <p className="font-semibold ">
                                            Assigned To
                                        </p>

                                        <p>
                                            {
                                                applicationData?.clerkId
                                                    .aadharId.firstName
                                            }{' '}
                                            {
                                                applicationData?.clerkId
                                                    .aadharId.lastName
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex my-4">
                                    <CalendarDays className="mr-3 " />

                                    <div>
                                        <p className="font-semibold">
                                            Submission Date
                                        </p>
                                        <p>
                                            {applicationData?.createdAt.slice(
                                                0,
                                                10,
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/*SECTION:  Parents Information */}
                <div className="mt-6">
                    <Card className="bg-neutral-50 dark:bg-gray-600">
                        <div className="flex items-center gap-3 mb-7">
                            <Users className="text-green-600 h-10 w-10" />
                            <div>
                                <h4>Parents Information</h4>
                                <p>
                                    Parent identity and contact details
                                    submitted by the applicant.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                            <div className="flex">
                                <User className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Mother Name</p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .motherAadharId.firstName
                                        }{' '}
                                        {
                                            applicationData?.serviceId
                                                .motherAadharId.lastName
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <User className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Father Name</p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .fatherAadharId.firstName
                                        }{' '}
                                        {
                                            applicationData?.serviceId
                                                .fatherAadharId.lastName
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <FileText className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Mother Aadhar
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .motherAadharId.aadharNumber
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <FileText className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Father Aadhar
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .fatherAadharId.aadharNumber
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <Phone className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Mother Mobile
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .motherAadharId.contact
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <Phone className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Father Mobile
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .fatherAadharId.contact
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <Mail className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Mother Email
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .motherAadharId.email
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <Mail className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Father Email
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .fatherAadharId.email
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-2 flex">
                                <MapPin className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Permanent Address
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .fatherAadharId.address
                                        }
                                        {', '}
                                        {
                                            applicationData?.serviceId
                                                .fatherAadharId.street
                                        }
                                        {', '}
                                        {
                                            applicationData?.serviceId
                                                .fatherAadharId.city
                                        }
                                        {', '}
                                        {
                                            applicationData?.serviceId
                                                .fatherAadharId.district
                                        }
                                        {', '}
                                        {
                                            applicationData?.serviceId
                                                .fatherAadharId.state
                                        }
                                        {'- '}
                                        {
                                            applicationData?.serviceId
                                                .fatherAadharId.pinCode
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                {/* SECTION: Uploaded Documents */}

                <div className="mt-6">
                    <Card className="bg-neutral-50 dark:bg-gray-600">
                        <div className="flex items-center gap-3 mb-2">
                            <Image className="text-orange-600 h-10 w-10 " />

                            <div>
                                <h4>Uploaded Documents</h4>

                                <p>
                                    Verify every uploaded document before
                                    approving the birth certificate application.
                                    Click on any document to view it in full
                                    size if required.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                <Card className="bg-neutral-50 dark:bg-gray-600 my-5">
                    <div className="grid grid-cols-2 gap-x-3">
                        <div className="col-span-1 col-start-1">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>Mother AadharId</h5>

                                    <p>
                                        Uploaded by applicant for verification
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden  mb-5">
                                <img
                                    src={
                                        applicationData?.serviceId
                                            .motherAadharCard
                                    }
                                    alt={"Mother's Aadhar Card Image"}
                                    className="w-full object-contain max-h-[400px]"
                                />
                            </div>
                        </div>
                        <div className="col-span-1 col-start-2">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>Father Aadhar Id</h5>

                                    <p>
                                        Uploaded by applicant for verification
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden  mb-5">
                                <img
                                    src={
                                        applicationData?.serviceId
                                            .fatherAadharCard
                                    }
                                    alt={"Father's Aadhar Card Image"}
                                    className="w-full object-contain max-h-[400px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3">
                        <div className="col-span-1 col-start-1">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>Ration card</h5>

                                    <p>
                                        Uploaded by applicant for verification
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden  mb-5">
                                <img
                                    src={applicationData?.serviceId.rationCard}
                                    alt={'Ration Card Image'}
                                    className="w-full object-contain max-h-[400px]"
                                />
                            </div>
                        </div>
                        <div className="col-span-1 col-start-2">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>Medical Report</h5>

                                    <p>
                                        Uploaded by applicant for verification
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden  mb-5">
                                <img
                                    src={
                                        applicationData?.serviceId
                                            .birthHospitalReport
                                    }
                                    alt={'Hospital Report of Baby Birth Image'}
                                    className="w-full object-contain max-h-[400px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 items-center justify-center">
                        <div className="col-span-1 col-start-1">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>Parents Marriage Certificate</h5>

                                    <p>
                                        Uploaded by applicant for verification
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden  mb-5">
                                <img
                                    src={
                                        applicationData?.serviceId
                                            .marriageCertificate
                                    }
                                    alt={
                                        "Marriage Certificate Image of Baby's Parents"
                                    }
                                    className="w-full object-contain max-h-[400px] "
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </Container>
        </main>
    )
}

export default BirthApplication
