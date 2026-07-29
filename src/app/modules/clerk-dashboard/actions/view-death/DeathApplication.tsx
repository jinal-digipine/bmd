import { Button, Card, Notification, toast } from '@/components/ui'
import Container from '../../components/HomeContainer'
import { ActionLink } from '@/components/shared'
import {
    ArrowLeft,
    CalendarDays,
    FileText,
    Mail,
    MapPin,
    Phone,
    User,
    Users,
} from 'lucide-react'
import { PiBedBold } from 'react-icons/pi'
import { Application } from '@/app/@api/application-module/application.types'
import { ApplicationApis } from '@/app/@api/application-module/application.api'
import { useEffect, useState } from 'react'

const goback = '/app/clerk/applications'

interface deathAplicationProp {
    id: Application.Id
}

const DeathApplication = ({ id }: deathAplicationProp) => {
    // const id = '6a5fe9c8a378c4e900f537d8' as Application.Id

    const [applicationData, setApplicationData] = useState<Application.Detail>()

    //function to fetch data based on id
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
                        <h3>Death Application Details</h3>
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

                <div className="grid grid-cols-12 gap-5 mt-6">
                    <div className="col-span-8">
                        <Card className="bg-neutral-50 dark:bg-gray-600">
                            <div className="flex items-center gap-3 mb-6">
                                <PiBedBold className="text-gray-700 h-9 w-9" />
                                <div>
                                    <h4>Deceased Information</h4>
                                    <p>
                                        Details of the deceased submitted while
                                        applying for the death certificate.
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                                <div className="flex">
                                    <FileText className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Deceased Aadhar
                                        </p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .deceasedAadharId
                                                    .aadharNumber
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <User className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Deceased Name
                                        </p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .deceasedAadharId.firstName
                                            }{' '}
                                            {
                                                applicationData?.serviceId
                                                    .deceasedAadharId.lastName
                                            }{' '}
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
                                            {
                                                applicationData?.serviceId
                                                    .deceasedAadharId.dob
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
                                                    .deceasedAadharId.gender
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Users className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Mother Name
                                        </p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .deceasedMotherName
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Users className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Father Name
                                        </p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .deceasedFatherName
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <CalendarDays className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Date of Death
                                        </p>
                                        <p>
                                            {applicationData?.serviceId.dateAndTimeOfDeath.slice(
                                                0,
                                                10,
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <FileText className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Type of Death
                                        </p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .deathType
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className=" flex">
                                    <MapPin className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Place of Death
                                        </p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .placeOfDeath
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className=" flex">
                                    <MapPin className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Permanent Address
                                        </p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .deceasedAadharId.address
                                            }
                                            {', '}
                                            {
                                                applicationData?.serviceId
                                                    .deceasedAadharId.street
                                            }
                                            {', '}
                                            {
                                                applicationData?.serviceId
                                                    .deceasedAadharId.city
                                            }
                                            {', '}
                                            {
                                                applicationData?.serviceId
                                                    .deceasedAadharId.district
                                            }
                                            {', '}
                                            {
                                                applicationData?.serviceId
                                                    .deceasedAadharId.state
                                            }
                                            {'- '}
                                            {
                                                applicationData?.serviceId
                                                    .deceasedAadharId.pinCode
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
                                                applicationData?.serviceId
                                                    .officeDepartmentId.officeId
                                                    .districtId.name
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
                                                applicationData?.serviceId
                                                    .officeDepartmentId.officeId
                                                    .districtId.stateId.name
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    {/* SECTION:Application information */}
                    <div className="col-span-4">
                        <Card className="bg-neutral-50 dark:bg-gray-600 h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="text-violet-600 h-10 w-10" />
                                <div>
                                    <h4>Application Details</h4>
                                    <p>
                                        Submission information for this death
                                        certificate application.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="flex my-6">
                                    <User className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
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
                                <div className="flex my-6">
                                    <User className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Submitted By
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
                                <div className="flex">
                                    <CalendarDays className="mr-3 mt-1" />
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
                {/* SECTION: Applicants Information */}
                <div className="mt-6">
                    <Card className="bg-neutral-50 dark:bg-gray-600">
                        <div className="flex items-center gap-3 mb-6">
                            <User className="text-blue-600 h-9 w-9" />
                            <div>
                                <h4>Applicant Information</h4>
                                <p>
                                    Applicant details submitted for the death
                                    certificate application.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                            <div className="flex">
                                <FileText className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Applicant Aadhar
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .applicantAadharId.aadharNumber
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="flex">
                                <User className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Applicant Name
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .applicantAadharId.firstName
                                        }{' '}
                                        {
                                            applicationData?.serviceId
                                                .applicantAadharId.lastName
                                        }{' '}
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
                                        {
                                            applicationData?.serviceId
                                                .applicantAadharId.dob
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
                                                .applicantAadharId.gender
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="flex">
                                <Phone className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Mobile Number
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .applicantAadharId.contact
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="flex">
                                <Mail className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Email Address
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .applicantAadharId.email
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="col-span-2 flex">
                                <MapPin className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Address</p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .applicantAadharId.address
                                        }
                                        {', '}
                                        {
                                            applicationData?.serviceId
                                                .applicantAadharId.street
                                        }
                                        {', '}
                                        {
                                            applicationData?.serviceId
                                                .applicantAadharId.city
                                        }
                                        {', '}
                                        {
                                            applicationData?.serviceId
                                                .applicantAadharId.district
                                        }
                                        {', '}
                                        {
                                            applicationData?.serviceId
                                                .applicantAadharId.state
                                        }
                                        {'- '}
                                        {
                                            applicationData?.serviceId
                                                .applicantAadharId.pinCode
                                        }{' '}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                {/* SECTION: Uploaded Documents */}
                <div className="mt-6">
                    <Card className="bg-neutral-50 dark:bg-gray-600">
                        <div className="flex items-center gap-3">
                            <FileText className="text-red-600 h-10 w-10" />
                            <div>
                                <h4>Uploaded Documents</h4>
                                <p>
                                    Verify the uploaded document before
                                    approving the death certificate application.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                <Card className="bg-neutral-50 dark:bg-gray-600 mt-5">
                    <div className="grid grid-cols-2 gap-x-3">
                        <div className="col-span-1 col-start-1">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>Deceased Aadhar Card</h5>
                                    <p>
                                        Uploaded by applicant for verification.
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden mb-5">
                                <img
                                    src={
                                        applicationData?.serviceId
                                            ?.deceasedAadharCard
                                    }
                                    alt={'doc'}
                                    className="w-full object-contain max-h-[400px]"
                                />
                            </div>
                        </div>
                        <div className="col-span-1 col-start-2">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>Applicants Aadhar Card</h5>
                                    <p>
                                        Uploaded by applicant for verification.
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden mb-5">
                                <img
                                    src={
                                        applicationData?.serviceId
                                            .applicantAadharCard
                                    }
                                    alt={'doc'}
                                    className="w-full object-contain max-h-[400px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3">
                        <div className="col-span-1 col-start-1">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>Deceased Ration Card</h5>
                                    <p>
                                        Uploaded by applicant for verification.
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden mb-5">
                                <img
                                    src={
                                        applicationData?.serviceId
                                            .deceasedRationCard
                                    }
                                    alt={'doc'}
                                    className="w-full object-contain max-h-[400px]"
                                />
                            </div>
                        </div>
                        <div className="col-span-1 col-start-2">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>Medical Report</h5>
                                    <p>
                                        Uploaded by applicant for verification.
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden mb-5">
                                <img
                                    src={
                                        applicationData?.serviceId
                                            .deceasedMedicalCertificate
                                    }
                                    alt={'doc'}
                                    className="w-full object-contain max-h-[400px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3">
                        <div className="col-span-1 col-start-1">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>PM Report</h5>
                                    <p>
                                        Uploaded by applicant for verification.
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden mb-5">
                                <img
                                    src={applicationData?.serviceId.pmReport}
                                    alt={'doc'}
                                    className="w-full object-contain max-h-[400px]"
                                />
                            </div>
                        </div>
                        <div className="col-span-1 col-start-2">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>Deceased Photograph</h5>
                                    <p>
                                        Uploaded by applicant for verification.
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden mb-5">
                                <img
                                    src={
                                        applicationData?.serviceId.deceasedPhoto
                                    }
                                    alt={'doc'}
                                    className="w-full object-contain max-h-[400px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 ">
                        <div className="col-span-1 col-start-1">
                            <div className="flex justify-between items-center mb-2 ">
                                <div>
                                    <h5>FIR</h5>
                                    <p>
                                        Uploaded by applicant for verification.
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden mb-5">
                                <img
                                    src={applicationData?.serviceId.fir}
                                    alt={'doc'}
                                    className="w-full object-contain max-h-[450px]"
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </Container>
        </main>
    )
}

export default DeathApplication
