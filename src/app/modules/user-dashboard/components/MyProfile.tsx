import { Button, Card } from '@/components/ui'
import Container from './HomeContainer'
import {
    BadgeInfo,
    IdCard,
    LogOut,
    Mail,
    Phone,
    ShieldCheckIcon,
    User,
    LockKeyhole,
    User2Icon,
} from 'lucide-react'
import { ActionLink } from '@/components/shared'

const MyProfile = ({ logOutUrl = '/' }) => {
    return (
        <main>
            <div className="mb-16"></div>
            <Container className="mt-18 max-w-11xl px-10">
                <div className="">
                    <h2>My Profile</h2>
                    <p>View Your Personal Information</p>
                </div>
                <Card className="mt-4 px-6 bg-blue-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                    <div className="grid grid-cols-2 grid-rows-1 gap-4">
                        <div>
                            <div className="grid grid-cols-6 grid-rows-1 gap-4">
                                <div className="flex justify-center items-center h-18 w-18  rounded-full bg-blue-100  dark:bg-gray-500 ">
                                    <User2Icon
                                        className="justify-self-center font-thin h-14 w-14 "
                                        strokeWidth={1.5}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <h3 className=" pt-4">John Doe</h3>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-6 grid-rows-1 gap-4">
                                <div>
                                    <div className="flex justify-center items-center h-16 w-16 bg-blue-100 dark:bg-gray-500 rounded-2xl  ">
                                        {' '}
                                        <ShieldCheckIcon className="text-blue-700 dark:text-blue-800 h-8 w-8" />
                                    </div>
                                </div>
                                <div className="col-span-5">
                                    <h6>Aadhar Verified</h6>
                                    <p>
                                        Your identity has been verified using
                                        Aadhar.
                                    </p>
                                    <p>
                                        Profile details are fetched from UIDAI
                                        records.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="mt-4 px-6">
                    <div className="grid grid-cols-5 grid-rows-7 gap-4">
                        <div className="col-span-3">
                            <h3>Personal Information</h3>
                        </div>
                        <div className="row-start-2">
                            <div className="flex flex-row">
                                <div className="flex justify-center items-center h-6 w-6 bg-blue-100 dark:bg-gray-800 rounded-lg ">
                                    <User className="h-5 w-5" />
                                </div>

                                <p className="pl-3">Full Name</p>
                            </div>
                        </div>
                        <div className="col-start-1 row-start-3">
                            <div className="flex flex-row">
                                <div className="flex justify-center items-center h-6 w-6 bg-blue-100 dark:bg-gray-800 rounded-lg ">
                                    <Mail className="h-5 w-5 pr-1" />
                                </div>

                                <p className="pl-3">Email Adrress</p>
                            </div>
                        </div>
                        <div className="col-start-1 row-start-4">
                            <div className="flex flex-row">
                                <div className="flex justify-center items-center h-6 w-6 bg-blue-100 dark:bg-gray-800 rounded-lg ">
                                    <Phone className="h-4 w-5" />
                                </div>

                                <p className="pl-3">Mobile Number</p>
                            </div>
                        </div>
                        <div className="col-start-1 row-start-5">
                            <div className="flex flex-row">
                                <div className="flex justify-center items-center h-6 w-6 bg-blue-100 dark:bg-gray-800 rounded-lg ">
                                    <IdCard className="h-5 w-5" />
                                </div>

                                <p className="pl-3">Aadhar Number</p>
                            </div>
                        </div>
                        <div className="col-span-5 col-start-1 row-start-6">
                            <Card className="h-14 bg-blue-50 dark:bg-gray-700">
                                <div className="align-middle flex flex-row">
                                    <BadgeInfo className="text-blue-600" />
                                    <p className="pl-4">
                                        This information is securely fatched
                                        from your Aadhar and cannot be modified
                                        .
                                    </p>
                                </div>
                            </Card>
                        </div>
                        <div className="col-start-3 row-start-7">
                            <ActionLink to={logOutUrl} themeColor={false}>
                                <Button className="text-red-700 border-red-700 justify-items-center">
                                    <div className="flex flex-row">
                                        <LogOut />
                                        SignOut
                                    </div>
                                </Button>
                            </ActionLink>
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
            </Container>
        </main>
    )
}

export default MyProfile
