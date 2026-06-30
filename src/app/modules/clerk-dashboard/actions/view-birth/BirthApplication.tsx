import { Button, Card } from '@/components/ui'
import Container from '../../components/HomeContainer'
import { ActionLink } from '@/components/shared'
import adhar from '../../../../../assets/images/birthcard.png'
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

const goback = '/app/clerk/applications'

const BirthApplication = () => {
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
                                        <p>kia Patel</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <CalendarDays className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Date of Birth
                                        </p>
                                        <p>22/11/2022</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Clock3 className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Birth Time
                                        </p>
                                        <p>04:00 PM</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Weight className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Birth Weight
                                        </p>
                                        <p>2.8 kg</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Users className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">Gender</p>
                                        <p>Female</p>
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
                                        <p className="font-semibold">
                                            Place Of Birth
                                        </p>
                                        <p>civil hospital, Ahmedabad</p>
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
                                <div className="flex">
                                    <User className="mr-3 mt-6" />
                                    <div className="my-6">
                                        <p className="font-semibold ">
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
                                        <p>09/04/2022</p>
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
                                    <p>John Doe</p>
                                </div>
                            </div>
                            <div className="flex">
                                <User className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Father Name</p>
                                    <p>John Doe</p>
                                </div>
                            </div>
                            <div className="flex">
                                <FileText className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Mother Aadhar
                                    </p>
                                    <p>XXXX XXXX 1234</p>
                                </div>
                            </div>
                            <div className="flex">
                                <FileText className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Father Aadhar
                                    </p>
                                    <p>XXXX XXXX 1235</p>
                                </div>
                            </div>
                            <div className="flex">
                                <Phone className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Mother Mobile
                                    </p>
                                    <p>9873012877</p>
                                </div>
                            </div>
                            <div className="flex">
                                <Phone className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Father Mobile
                                    </p>
                                    <p>9873012877</p>
                                </div>
                            </div>
                            <div className="flex">
                                <Mail className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Mother Email
                                    </p>
                                    <p>john.doe@gamil.com</p>
                                </div>
                            </div>
                            <div className="flex">
                                <Mail className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Father Email
                                    </p>
                                    <p>john.doe@gmail.com</p>
                                </div>
                            </div>
                            <div className="col-span-2 flex">
                                <MapPin className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Permanent Address
                                    </p>
                                    <p>
                                        112,sahakr colony, Sector-25,
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

                <Card className="bg-neutral-50 dark:bg-gray-600 mt-5">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <h5>Mother AadharId</h5>

                                <p>Uploaded by applicant for verification</p>
                            </div>
                        </div>

                        <div className="border rounded-xl overflow-hidden  mb-5">
                            <img
                                src={adhar}
                                alt={adhar}
                                className="w-full object-contain max-h-[600px]"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <h5>Father Aadhar Id</h5>

                                <p>Uploaded by applicant for verification</p>
                            </div>
                        </div>

                        <div className="border rounded-xl overflow-hidden  mb-5">
                            <img
                                // src={adhar2}
                                alt={adhar}
                                className="w-full object-contain max-h-[600px]"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <h5>Ration card</h5>

                                <p>Uploaded by applicant for verification</p>
                            </div>
                        </div>

                        <div className="border rounded-xl overflow-hidden  mb-5">
                            <img
                                // src={adhar2}
                                alt={adhar}
                                className="w-full object-contain max-h-[600px]"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <h5>Medical Report</h5>

                                <p>Uploaded by applicant for verification</p>
                            </div>
                        </div>

                        <div className="border rounded-xl overflow-hidden  mb-5">
                            <img
                                // src={adhar2}
                                alt={adhar}
                                className="w-full object-contain max-h-[600px]"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <h5>Parents Marriage Certificate</h5>

                                <p>Uploaded by applicant for verification</p>
                            </div>
                        </div>

                        <div className="border rounded-xl overflow-hidden  mb-5">
                            <img
                                // src={adhar2}
                                alt={adhar}
                                className="w-full object-contain max-h-[600px]"
                            />
                        </div>
                    </div>
                </Card>
            </Container>
        </main>
    )
}

export default BirthApplication
