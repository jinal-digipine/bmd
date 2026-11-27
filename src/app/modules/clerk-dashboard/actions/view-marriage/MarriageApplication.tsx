import { Button, Card, Notification, toast } from '@/components/ui'
import Container from '../../components/HomeContainer'
import { ActionLink } from '@/components/shared'
import { useEffect, useState } from 'react'

import {
    ArrowLeft,
    CalendarDays,
    FileText,
    Mail,
    MapPin,
    Phone,
    User,
    Users,
    Venus,
    Mars,
} from 'lucide-react'
import { PiListHeartBold } from 'react-icons/pi'
import { Application } from '@/app/@api/application-module/application.types'
import { ApplicationApis } from '@/app/@api/application-module/application.api'

const goback = '/app/clerk/applications'

interface marriageApplicationProp {
    id: Application.Id
}
const MarriageApplication = ({ id }: marriageApplicationProp) => {
    // const id = '6a5fefcc587923759f99c68c' as Application.Id

    const [applicationData, setApplicationData] = useState<Application.Detail>()

    const fetchApplicationData = async () => {
        try {
            const res = await ApplicationApis.get(id)
            setApplicationData(res.data || res)
            console.log('the fetched data=', res)
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
                        <h3>Marriage Application Details</h3>
                        <p>
                            Review all submitted information and uploaded
                            documents before verifying the applicantion during
                            the online video verification process.
                        </p>
                    </div>

                    <ActionLink to={goback} themeColor={false}>
                        <Button variant="solid">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go back
                        </Button>
                    </ActionLink>
                </div>

                <div className="grid grid-cols-12 gap-5 mt-6">
                    {/* SECTION: Brides Information */}
                    <div className="col-span-8">
                        <Card className="bg-neutral-50 dark:bg-gray-600">
                            <div className="flex items-center gap-3 mb-6">
                                <Venus className="text-pink-600 h-10 w-10" />
                                <div>
                                    <h4>Bride Information</h4>
                                    <p>
                                        Bride details submitted while applying
                                        for marriage registration.
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                                <div className="flex">
                                    <FileText className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Bride AadharId
                                        </p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .brideAadharId.aadharNumber
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <User className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Bride Name
                                        </p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .brideAadharId.firstName
                                            }{' '}
                                            {
                                                applicationData?.serviceId
                                                    .brideAadharId.lastName
                                            }{' '}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Venus className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">Gender</p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .brideAadharId.gender
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
                                            {
                                                applicationData?.serviceId
                                                    .brideAadharId.dob
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Phone className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Bride Mobile
                                        </p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .brideAadharId.contact
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Mail className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Bride Email
                                        </p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .brideAadharId.email
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Users className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Mother&apos;s Name
                                        </p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .brideMotherName
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <Users className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Father&apos;s Name
                                        </p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .brideFatherName
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="col-span-2 flex">
                                    <MapPin className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Bride Address
                                        </p>
                                        <p>
                                            {
                                                applicationData?.serviceId
                                                    .brideAadharId.address
                                            }
                                            {', '}
                                            {
                                                applicationData?.serviceId
                                                    .brideAadharId.street
                                            }
                                            {', '}
                                            {
                                                applicationData?.serviceId
                                                    .brideAadharId.city
                                            }
                                            {', '}
                                            {
                                                applicationData?.serviceId
                                                    .brideAadharId.district
                                            }
                                            {', '}
                                            {
                                                applicationData?.serviceId
                                                    .brideAadharId.state
                                            }
                                            {'- '}
                                            {
                                                applicationData?.serviceId
                                                    .brideAadharId.pinCode
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* SECTION: applicants information */}
                    <div className="col-span-4">
                        <Card className="bg-neutral-50 dark:bg-gray-600 h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="text-violet-600 h-12 w-12" />
                                <div>
                                    <h4>Application Details</h4>
                                    <p>
                                        Submission information for this marriage
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
                                            }{' '}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex my-6">
                                    <User className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
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
                                            }{' '}
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

                {/* SECTION: Grooms Information */}
                <div className="mt-6">
                    <Card className="bg-neutral-50 dark:bg-gray-600">
                        <div className="flex items-center gap-3 mb-6">
                            <Mars className="text-blue-600 h-10 w-10" />
                            <div>
                                <h4>Groom Information</h4>
                                <p>
                                    Groom details submitted while applying for
                                    marriage registration.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                            <div className="flex">
                                <FileText className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Groom Aadhar
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .groomAadharId.aadharNumber
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <User className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Groom Name</p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .groomAadharId.firstName
                                        }{' '}
                                        {
                                            applicationData?.serviceId
                                                .groomAadharId.lastName
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <Mars className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Gender</p>
                                    <p>
                                        {applicationData?.serviceId.groomAadharId.gender
                                            .charAt(0)
                                            .toUpperCase()}
                                        {applicationData?.serviceId.groomAadharId.gender.slice(
                                            1,
                                        )}
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
                                                .groomAadharId.dob
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <Phone className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Groom Mobile
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .groomAadharId.contact
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <Mail className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Groom Email</p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .groomAadharId.email
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <Users className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Mother&apos;s Name
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .groomMotherName
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <Users className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Father&apos;s Name
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .groomFatherName
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-2 flex">
                                <MapPin className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Groom Address
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .groomAadharId.address
                                        }
                                        {', '}
                                        {
                                            applicationData?.serviceId
                                                .groomAadharId.street
                                        }
                                        {', '}
                                        {
                                            applicationData?.serviceId
                                                .groomAadharId.city
                                        }
                                        {', '}
                                        {
                                            applicationData?.serviceId
                                                .groomAadharId.district
                                        }
                                        {', '}
                                        {
                                            applicationData?.serviceId
                                                .groomAadharId.state
                                        }
                                        {'- '}
                                        {
                                            applicationData?.serviceId
                                                .groomAadharId.pinCode
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* SECTION: Marriage Information */}
                <div className="mt-6">
                    <Card className="bg-neutral-50 dark:bg-gray-600">
                        <div className="flex items-center gap-3 mb-6">
                            <PiListHeartBold className="text-purple-600 h-10 w-10" />
                            <div>
                                <h4>Marriage Information</h4>
                                <p>
                                    Marriage details submitted by the applicant.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                            <div className="flex">
                                <CalendarDays className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Date of Marriage
                                    </p>
                                    <p>
                                        {applicationData?.serviceId.marriageDate.slice(
                                            0,
                                            10,
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <MapPin className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Place Of Marriage
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .marriagePlace
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
                            <div className="flex">
                                <MapPin className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">District</p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .officeDepartmentId.officeId
                                                .districtId.name
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                {/* SECTION : witness Information */}
                <div className="mt-6">
                    <Card className="bg-neutral-50 dark:bg-gray-600">
                        <div className="flex items-center gap-3 mb-6">
                            <Users className="text-emerald-600 h-10 w-10" />
                            <div>
                                <h4>Witness Information</h4>
                                <p>Witness details submitted by aapplicant.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                            <div className="flex">
                                <FileText className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Witness Aadhar
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .witnessAadharId.aadharNumber
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <User className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Witness Name
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .witnessAadharId.firstName
                                        }{' '}
                                        {
                                            applicationData?.serviceId
                                                .witnessAadharId.lastName
                                        }{' '}
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <Phone className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Witness Mobile
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .witnessAadharId.contact
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <Mail className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Witness Email
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .witnessAadharId.email
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <Users className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Relation</p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .witnessRelation
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <Users className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Gender</p>
                                    <p>
                                        {applicationData?.serviceId.witnessAadharId.gender
                                            .charAt(0)
                                            .toUpperCase()}
                                        {applicationData?.serviceId.witnessAadharId.gender.slice(
                                            1,
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-2 flex">
                                <MapPin className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Witness Address
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .witnessAadharId.address
                                        }
                                        {', '}
                                        {
                                            applicationData?.serviceId
                                                .witnessAadharId.street
                                        }
                                        {', '}
                                        {
                                            applicationData?.serviceId
                                                .witnessAadharId.city
                                        }
                                        {', '}
                                        {
                                            applicationData?.serviceId
                                                .witnessAadharId.district
                                        }
                                        {', '}
                                        {
                                            applicationData?.serviceId
                                                .witnessAadharId.state
                                        }
                                        {'- '}
                                        {
                                            applicationData?.serviceId
                                                .witnessAadharId.pinCode
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* SECTION: Priest Information */}
                <div className="mt-6">
                    <Card className="bg-neutral-50 dark:bg-gray-600">
                        <div className="flex items-center gap-3 mb-6">
                            <User className="text-orange-600 h-10 w-10" />
                            <div>
                                <h4>Priest Information</h4>
                                <p>
                                    Priest details submitted by the applicant.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                            <div className="flex">
                                <FileText className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Priest Aadhar
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .brahmanAadharId.aadharNumber
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <User className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Priest Name</p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .brahmanAadharId.firstName
                                        }{' '}
                                        {
                                            applicationData?.serviceId
                                                .brahmanAadharId.lastName
                                        }{' '}
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <Phone className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Priest Mobile
                                    </p>
                                    <p>
                                        {
                                            applicationData?.serviceId
                                                .brahmanAadharId.contact
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                {/* SECTION: Upload Documents */}
                <div className="mt-6">
                    <Card className="bg-neutral-50 dark:bg-gray-600">
                        <div className="flex items-center gap-3">
                            <FileText className="text-red-600 h-10 w-10" />
                            <div>
                                <h4>Uploaded Documents</h4>
                                <p>
                                    Verify all uploaded documents before
                                    approving the marriage certificate
                                    application.
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
                                    <h5>Brides Aadhar Card</h5>
                                    <p>
                                        Uploaded by applicant for verification.
                                    </p>
                                </div>
                            </div>
                            <div className="border rounded-xl overflow-hidden mb-5">
                                <img
                                    src={
                                        applicationData?.serviceId
                                            .brideAadharCard
                                    }
                                    alt={'bride adhar card'}
                                    className="w-full object-contain max-h-[400px]"
                                />
                            </div>
                        </div>
                        <div className="col-span-1 col-start-2">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>Grooms Aadhar Card</h5>
                                    <p>
                                        Uploaded by applicant for verification.
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden mb-5">
                                <img
                                    src={
                                        applicationData?.serviceId
                                            .groomAadharCard
                                    }
                                    alt={'groom adhar card'}
                                    className="w-full object-contain max-h-[400px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3">
                        <div className="col-span-1 col-start-1">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>Bride Ration Card</h5>
                                    <p>
                                        Uploaded by applicant for verification.
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden mb-5">
                                <img
                                    src={
                                        applicationData?.serviceId
                                            .brideRationCard
                                    }
                                    alt={'bride ration card'}
                                    className="w-full object-contain max-h-[400px]"
                                />
                            </div>
                        </div>
                        <div className="col-span-1 col-start-2">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>Groom Ration Card</h5>
                                    <p>
                                        Uploaded by applicant for verification.
                                    </p>
                                </div>
                            </div>
                            <div className="border rounded-xl overflow-hidden mb-5">
                                <img
                                    src={
                                        applicationData?.serviceId
                                            .groomRationCard
                                    }
                                    alt={'groom ration card'}
                                    className="w-full object-contain max-h-[400px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3">
                        <div className="col-span-1 col-start-1">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>witness Aadhar Card</h5>
                                    <p>
                                        Uploaded by applicant for verification.
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden mb-5">
                                <img
                                    src={
                                        applicationData?.serviceId
                                            .witnessAadharCard
                                    }
                                    alt={'witness adhar card'}
                                    className="w-full object-contain max-h-[400px]"
                                />
                            </div>
                        </div>
                        <div className="col-span-1 col-start-2">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>Priest Aadhar Card</h5>
                                    <p>
                                        Uploaded by applicant for verification.
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden mb-5">
                                <img
                                    src={
                                        applicationData?.serviceId
                                            .brahmanAadharCard
                                    }
                                    alt={'barhman adhar card'}
                                    className="w-full object-contain max-h-[400px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 ">
                        <div className="col-span-1 col-start-1 ">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>Invitation Card</h5>
                                    <p>
                                        Uploaded by applicant for verification.
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden mb-5 max-h-[350px]">
                                <img
                                    src={
                                        applicationData?.serviceId
                                            .invitationCard
                                    }
                                    alt={'marrigae invitation card'}
                                    className="w-full object-contain  max-h-[400px]"
                                />
                            </div>
                        </div>
                        <div className="col-span-1 col-start-2">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>Bride Photograph</h5>
                                    <p>
                                        Uploaded by applicant for verification.
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden mb-5">
                                <img
                                    src={applicationData?.serviceId.bridePhoto}
                                    alt={'bride photograph'}
                                    className="w-full object-contain max-h-[400px] "
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 items-center justify-center">
                        <div className="col-span-1 col-start-1">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h5>Groom Photograph</h5>
                                    <p>
                                        Uploaded by applicant for verification.
                                    </p>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden mb-5">
                                <img
                                    src={applicationData?.serviceId.groomPhoto}
                                    alt={'groom photograph'}
                                    className="w-full object-contain max-h-[400px]"
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </Container>
        </main>
    )
}

export default MarriageApplication
