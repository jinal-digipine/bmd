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
    Venus,
    Mars,
} from 'lucide-react'
import { PiListHeartBold } from 'react-icons/pi'

const goback = '/app/clerk/applications'

const MarriageApplication = () => {
    return (
        <main>
            <Container className="max-w-full">
                <div className="flex justify-between items-end">
                    <div>
                        <h3>Marriage Application Details</h3>
                        <p>
                            Review all submitted information and uploaded
                            documents before verifying the applicant during the
                            online video verification process.
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
                                            Bride Aadhar
                                        </p>
                                        <p>XXXX XXXX 1234</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <User className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Bride Name
                                        </p>
                                        <p>John Doe</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Venus className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">Gender</p>
                                        <p>Female</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <CalendarDays className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Date of Birth
                                        </p>
                                        <p>15/08/2000</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Phone className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Bride Mobile
                                        </p>
                                        <p>9876543210</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Mail className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Bride Email
                                        </p>
                                        <p>john.doe@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Users className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Mother&apos;s Name
                                        </p>
                                        <p>John Doe</p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <Users className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Father&apos;s Name
                                        </p>
                                        <p>John Doe</p>
                                    </div>
                                </div>
                                <div className="col-span-2 flex">
                                    <MapPin className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Bride Address
                                        </p>
                                        <p>
                                            115,sahakar colony, Sector-25,
                                            Gandhinagar.
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
                                        <p>John Doe</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <CalendarDays className="mr-3 mt-1" />
                                    <div>
                                        <p className="font-semibold">
                                            Submission Date
                                        </p>
                                        <p>22/06/2026</p>
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
                                    <p>XXXX XXXX 1235</p>
                                </div>
                            </div>
                            <div className="flex">
                                <User className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Groom Name</p>
                                    <p>John Doe</p>
                                </div>
                            </div>
                            <div className="flex">
                                <Mars className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Gender</p>
                                    <p>Male</p>
                                </div>
                            </div>
                            <div className="flex">
                                <CalendarDays className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Date of Birth
                                    </p>
                                    <p>18/09/2002</p>
                                </div>
                            </div>
                            <div className="flex">
                                <Phone className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Groom Mobile
                                    </p>
                                    <p>9876543211</p>
                                </div>
                            </div>
                            <div className="flex">
                                <Mail className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Groom Email</p>
                                    <p>john.doe@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex">
                                <Users className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Mother&apos;s Name
                                    </p>
                                    <p>John Doe</p>
                                </div>
                            </div>
                            <div className="flex">
                                <Users className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Father&apos;s Name
                                    </p>
                                    <p>John Doe</p>
                                </div>
                            </div>
                            <div className="col-span-2 flex">
                                <MapPin className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Groom Address
                                    </p>
                                    <p>
                                        114, sahakar colony, Sector-25,
                                        Gandhinagar. Gujarat
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
                                    <p>20/06/2026</p>
                                </div>
                            </div>
                            <div className="flex">
                                <MapPin className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Place Of Marriage
                                    </p>
                                    <p>Nikol, Ahmedabad.</p>
                                </div>
                            </div>
                            <div className="flex">
                                <MapPin className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">State</p>
                                    <p>Gujarat</p>
                                </div>
                            </div>
                            <div className="flex">
                                <MapPin className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">District</p>
                                    <p>Ahmedabad</p>
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
                                    <p>XXXX XXXX 4444</p>
                                </div>
                            </div>
                            <div className="flex">
                                <User className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Witness Name
                                    </p>
                                    <p>John Doe</p>
                                </div>
                            </div>
                            <div className="flex">
                                <Phone className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Witness Mobile
                                    </p>
                                    <p>9876543200</p>
                                </div>
                            </div>
                            <div className="flex">
                                <Mail className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Witness Email
                                    </p>
                                    <p>john.doe@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex">
                                <Users className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Relation</p>
                                    <p>Cousin</p>
                                </div>
                            </div>
                            <div className="flex">
                                <Users className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Gender</p>
                                    <p>Male</p>
                                </div>
                            </div>
                            <div className="col-span-2 flex">
                                <MapPin className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Witness Address
                                    </p>
                                    <p>
                                        114,sahakr colony, Sector-25,
                                        Gandhinagar.
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
                                    <p>XXXX XXXX 1111</p>
                                </div>
                            </div>
                            <div className="flex">
                                <User className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">Priest Name</p>
                                    <p>John Doe</p>
                                </div>
                            </div>
                            <div className="flex">
                                <Phone className="mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold">
                                        Priest Mobile
                                    </p>
                                    <p>9876543222</p>
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
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h5>Brides Aadhar Card</h5>
                            <p>Uploaded by applicant for verification.</p>
                        </div>
                    </div>
                    <div className="border rounded-xl overflow-hidden mb-5">
                        <img
                            src={adhar}
                            alt={'adhar'}
                            className="w-full object-contain max-h-[600px]"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h5>Grooms Aadhar Card</h5>
                            <p>Uploaded by applicant for verification.</p>
                        </div>
                    </div>

                    <div className="border rounded-xl overflow-hidden mb-5">
                        <img
                            // src={adhar}
                            alt={'adhar'}
                            className="w-full object-contain max-h-[600px]"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h5>Bride Ration Card</h5>
                            <p>Uploaded by applicant for verification.</p>
                        </div>
                    </div>

                    <div className="border rounded-xl overflow-hidden mb-5">
                        <img
                            // src={adhar}
                            alt={'adhar'}
                            className="w-full object-contain max-h-[600px]"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h5>Groom Ration Card</h5>
                            <p>Uploaded by applicant for verification.</p>
                        </div>
                    </div>
                    <div className="border rounded-xl overflow-hidden mb-5">
                        <img
                            // src={adhar}
                            alt={'adhar'}
                            className="w-full object-contain max-h-[600px]"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h5>witness Aadhar Card</h5>
                            <p>Uploaded by applicant for verification.</p>
                        </div>
                    </div>

                    <div className="border rounded-xl overflow-hidden mb-5">
                        <img
                            // src={adhar}
                            alt={'adhar'}
                            className="w-full object-contain max-h-[600px]"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h5>Priest Aadhar Card</h5>
                            <p>Uploaded by applicant for verification.</p>
                        </div>
                    </div>

                    <div className="border rounded-xl overflow-hidden mb-5">
                        <img
                            // src={adhar}
                            alt={'adhar'}
                            className="w-full object-contain max-h-[600px]"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h5>Invitation Card</h5>
                            <p>Uploaded by applicant for verification.</p>
                        </div>
                    </div>

                    <div className="border rounded-xl overflow-hidden mb-5">
                        <img
                            // src={adhar}
                            alt={'adhar'}
                            className="w-full object-contain max-h-[600px]"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h5>Bride Photograph</h5>
                            <p>Uploaded by applicant for verification.</p>
                        </div>
                    </div>

                    <div className="border rounded-xl overflow-hidden mb-5">
                        <img
                            // src={adhar}
                            alt={'adhar'}
                            className="w-full object-contain max-h-[600px]"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h5>Groom Photograph</h5>
                            <p>Uploaded by applicant for verification.</p>
                        </div>
                    </div>

                    <div className="border rounded-xl overflow-hidden mb-5">
                        <img
                            // src={adhar}
                            alt={'adhar'}
                            className="w-full object-contain max-h-[600px]"
                        />
                    </div>
                </Card>
            </Container>
        </main>
    )
}

export default MarriageApplication
