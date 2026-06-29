import { Button, Card } from '@/components/ui'
import Container from '../../components/HomeContainer'
import { ActionLink } from '@/components/shared'
import adhar from './../../../../../assets/images/birthcard.png'
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

const goback = '/app/clerk/applications'

const DeathApplication = () => {
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
                                        <p>XXXX XXXX 1231</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <User className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Deceased Name
                                        </p>
                                        <p>John Doe</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <CalendarDays className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Date of Birth
                                        </p>
                                        <p>10/04/1972</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Users className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">Gender</p>
                                        <p>Male</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Users className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Mother Name
                                        </p>
                                        <p>John Doe</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Users className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Father Name
                                        </p>
                                        <p>John Doe</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <CalendarDays className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Date of Death
                                        </p>
                                        <p>22/06/2024</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <FileText className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Type of Death
                                        </p>
                                        <p>Natural</p>
                                    </div>
                                </div>
                                <div className=" flex">
                                    <MapPin className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Place of Death
                                        </p>
                                        <p>Civil Hospital, Ahmedabad</p>
                                    </div>
                                </div>
                                <div className=" flex">
                                    <MapPin className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Permanent Address
                                        </p>
                                        <p>
                                            114, sahakar colony, Sector-25,
                                            Gandhinagar.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <MapPin className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            District
                                        </p>
                                        <p>Ahmedabad</p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <MapPin className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">State</p>
                                        <p>Gujarat</p>
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
                                        <p>John Doe</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <CalendarDays className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Submission Date
                                        </p>
                                        <p>23/06/2024</p>
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
                                    <p>XXXX XXXX 9090</p>
                                </div>
                            </div>

                            <div className="flex">
                                <User className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Applicant Name
                                    </p>
                                    <p>John Doe</p>
                                </div>
                            </div>

                            <div className="flex">
                                <CalendarDays className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Date of Birth
                                    </p>
                                    <p>12/08/2001</p>
                                </div>
                            </div>

                            <div className="flex">
                                <Users className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Gender</p>
                                    <p>Male</p>
                                </div>
                            </div>

                            <div className="flex">
                                <Phone className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Mobile Number
                                    </p>
                                    <p>9876543210</p>
                                </div>
                            </div>

                            <div className="flex">
                                <Mail className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Email Address
                                    </p>
                                    <p>john.doe@gmail.com</p>
                                </div>
                            </div>

                            <div className="col-span-2 flex">
                                <MapPin className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Address</p>
                                    <p>
                                        114, sahakar colony, Sector-25,
                                        Gandhinagar.
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
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h5>Deceased Aadhar Card</h5>
                            <p>Uploaded by applicant for verification.</p>
                        </div>
                    </div>

                    <div className="border rounded-xl overflow-hidden mb-5">
                        <img
                            src={adhar}
                            alt={adhar}
                            className="w-full object-contain max-h-[900px]"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h5>Applicants Aadhar Card</h5>
                            <p>Uploaded by applicant for verification.</p>
                        </div>
                    </div>

                    <div className="border rounded-xl overflow-hidden mb-5">
                        <img
                            // src={adhar}
                            alt={adhar}
                            className="w-full object-contain max-h-[900px]"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h5>Deceased Ration Card</h5>
                            <p>Uploaded by applicant for verification.</p>
                        </div>
                    </div>

                    <div className="border rounded-xl overflow-hidden mb-5">
                        <img
                            // src={adhar}
                            alt={adhar}
                            className="w-full object-contain max-h-[900px]"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h5>Medical Report</h5>
                            <p>Uploaded by applicant for verification.</p>
                        </div>
                    </div>

                    <div className="border rounded-xl overflow-hidden mb-5">
                        <img
                            // src={adhar}
                            alt={adhar}
                            className="w-full object-contain max-h-[900px]"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h5>PM Report</h5>
                            <p>Uploaded by applicant for verification.</p>
                        </div>
                    </div>

                    <div className="border rounded-xl overflow-hidden mb-5">
                        <img
                            // src={adhar}
                            alt={adhar}
                            className="w-full object-contain max-h-[900px]"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h5>Deceased Photograph</h5>
                            <p>Uploaded by applicant for verification.</p>
                        </div>
                    </div>

                    <div className="border rounded-xl overflow-hidden mb-5">
                        <img
                            // src={adhar}
                            alt={adhar}
                            className="w-full object-contain max-h-[900px]"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h5>FIR</h5>
                            <p>Uploaded by applicant for verification.</p>
                        </div>
                    </div>

                    <div className="border rounded-xl overflow-hidden mb-5">
                        <img
                            // src={adhar}
                            alt={adhar}
                            className="w-full object-contain max-h-[900px]"
                        />
                    </div>
                </Card>
            </Container>
        </main>
    )
}

export default DeathApplication
