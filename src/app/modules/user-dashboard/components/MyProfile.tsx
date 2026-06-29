import { Button, Card } from '@/components/ui'
import Container from './HomeContainer'
import {
    BadgeInfo,
    IdCard,
    LogOut,
    Mail,
    Phone,
    User,
    LockKeyhole,
} from 'lucide-react'
import { ActionLink } from '@/components/shared'
import { PiShieldCheckDuotone } from 'react-icons/pi'
import { HiUser } from 'react-icons/hi2'
import { TbCircleCheck } from 'react-icons/tb'

const logOutUrl = '/'

function MyProfile() {
    return (
        <main>
            <Container className="max-w-full">
                <div className="grid grid-cols-5 grid-rows-5 gap-4">
                    <div className="row-span-5">
                        <Card className="">
                            <div className="flex justify-center items-end mt-4">
                                <div className="flex justify-center items-center w-18 h-18 bg-blue-50 rounded-full  ">
                                    <HiUser className="h-12 w-12 text-blue-500 " />
                                </div>
                            </div>
                            <div className=" flex justify-center items-center mt-3 mb-1">
                                <h3 className="flex justify-center items-center">
                                    John Doe
                                </h3>
                            </div>
                            <div className="">
                                <div className="flex justify-center items-start mb-7">
                                    <p className="bg-green-50 text-green-600 font-semibold dark:bg-green-900 px-2 rounded-lg mb-2 flex flex-row">
                                        <TbCircleCheck className="text-lg " />
                                        Aadhar Verified
                                    </p>
                                </div>
                            </div>
                            <hr />

                            <div className="flex justify-center items-center my-7">
                                <div className="flex flex-row justify-center items-center bg-blue-50 rounded-4xl h-12 w-12 ">
                                    <PiShieldCheckDuotone className="h-8 w-8 text-blue-500" />
                                </div>
                            </div>
                            <div className=" flex flex-col justify-evenly items-center mb-8">
                                <p>Your identity has been verified</p>
                                <p>using Aadhar. Profile details are</p>
                                <p>fetched from UIDAI records.</p>
                            </div>
                            <div className="flex justify-center items-center">
                                <ActionLink
                                    to={logOutUrl}
                                    themeColor={false}
                                    className=" mb-1"
                                >
                                    <Button className="text-red-600  border-red-700  dark:text-red-500  justify-items-center">
                                        <div className="flex flex-row ">
                                            <LogOut />
                                            SignOut
                                        </div>
                                    </Button>
                                </ActionLink>
                            </div>
                        </Card>
                    </div>
                    <div className="col-span-4 row-span-5">
                        <h3>My Profile</h3>
                        <p>View Your Personal Information</p>
                        <Card className="mt-4 px-6">
                            <div className="grid grid-cols-5 grid-rows-7 gap-4">
                                <div className="col-span-3">
                                    <h4>Personal Information</h4>
                                </div>
                                <div className="row-start-2">
                                    <div className="flex flex-row">
                                        <div className="flex justify-center items-center h-6 w-6  rounded-lg ">
                                            <User className="h-5 w-5" />
                                        </div>

                                        <p className="pl-3">Full Name</p>
                                    </div>
                                </div>
                                <div className="col-start-1 row-start-3">
                                    <div className="flex flex-row">
                                        <div className="flex justify-center items-center h-6 w-6  rounded-lg ">
                                            <Mail className="h-5 w-5 pr-1" />
                                        </div>

                                        <p className="pl-3">Email Adrress</p>
                                    </div>
                                </div>
                                <div className="col-start-1 row-start-4">
                                    <div className="flex flex-row">
                                        <div className="flex justify-center items-center h-6 w-6  rounded-lg ">
                                            <Phone className="h-4 w-5" />
                                        </div>

                                        <p className="pl-3">Mobile Number</p>
                                    </div>
                                </div>
                                <div className="col-start-1 row-start-5">
                                    <div className="flex flex-row">
                                        <div className="flex justify-center items-center h-6 w-6  rounded-lg ">
                                            <IdCard className="h-5 w-5" />
                                        </div>

                                        <p className="pl-3">Aadhar Number</p>
                                    </div>
                                </div>
                                <div className="col-span-5 col-start-1 row-start-6">
                                    <Card className="h-10 bg-blue-50 dark:bg-gray-700 flex items-center justify-start">
                                        <div className="align-middle flex flex-row">
                                            <BadgeInfo className="text-blue-600" />
                                            <p className="pl-4">
                                                This information is securely
                                                fatched from your Aadhar and
                                                cannot be modified .
                                            </p>
                                        </div>
                                    </Card>
                                </div>
                                <div className="col-span-2 col-start-2 row-start-2">
                                    <p>: John Doe</p>
                                </div>
                                <div className="col-span-2 col-start-2 row-start-3">
                                    <p>: john.doe@gmail.com</p>
                                </div>
                                <div className="col-span-2 col-start-2 row-start-4">
                                    <p>: 9843678670</p>
                                </div>
                                <div className="col-span-2 col-start-2 row-start-5">
                                    <p>: XXXX XXXX 1234</p>
                                </div>
                                <div className="col-start-5 row-start-2">
                                    <div className="justify-self-end items-center h-7 w-7 pt-1 px-1 rounded-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed ">
                                        <LockKeyhole className="justify-self-end h-5 w-5" />
                                    </div>
                                </div>
                                <div className="col-start-5 row-start-3">
                                    <div className="justify-self-end items-center h-7 w-7 pt-1 px-1 rounded-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed ">
                                        <LockKeyhole className="justify-self-end h-5 w-5" />
                                    </div>
                                </div>
                                <div className="col-start-5 row-start-4">
                                    <div className="justify-self-end items-center h-7 w-7 pt-1 px-1 rounded-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed ">
                                        <LockKeyhole className="justify-self-end h-5 w-5" />
                                    </div>
                                </div>
                                <div className="col-start-5 row-start-5">
                                    <div className="justify-self-end items-center h-7 w-7 pt-1 px-1 rounded-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed ">
                                        <LockKeyhole className="justify-self-end h-5 w-5" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Container>
        </main>
    )
}

export default MyProfile
