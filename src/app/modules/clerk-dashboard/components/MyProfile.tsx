import { Button, Card, Notification, toast } from '@/components/ui'
import Container from './HomeContainer'
import { IdCard, LogOut, Mail, Phone, User2 } from 'lucide-react'
import { FaUserTag, FaVenusMars } from 'react-icons/fa'
import { GrLocation } from 'react-icons/gr'
import { PiBagDuotone } from 'react-icons/pi'
import { ActionLink } from '@/components/shared'
import { LuCalendarDays } from 'react-icons/lu'
import { useEffect, useState } from 'react'
import { User } from '@/app/@api/user/user.types'
import { UserApis } from '@/app/@api/user/user.api'

const logOutUrl = '/'
const MyProfile = () => {
    const [user, setUser] = useState<User.Detail>()

    const fetchUserData = async () => {
        try {
            const UserId = '6a51686cf7cc73300ae7e99a' as User.Id

            const response = await UserApis.get(UserId)
            setUser(response.data || response || [])
        } catch (err: any) {
            toast.push(
                <Notification closable type="danger" duration={3000}>
                    {err.message || 'Something went wrong!!'}
                </Notification>,
            )
            return []
        }
    }
    useEffect(() => {
        fetchUserData()
    }, [])
    return (
        <main>
            <div className="mb-1"></div>
            <Container className=" max-w-full  mb-1">
                <div className="grid grid-cols-12 grid-rows-1 gap-4">
                    <div className="col-span-7">
                        <h3>My Profile</h3>
                        <p>
                            View and manage your profile and work information.
                        </p>
                    </div>
                    <div className="col-start-12 flex items-end justify-end">
                        <ActionLink
                            to={logOutUrl}
                            themeColor={false}
                            className=" mt-0"
                        >
                            <Button className="text-red-600  border-red-700  dark:text-red-500  justify-items-center">
                                <div className="flex flex-row ">
                                    <LogOut />
                                    SignOut
                                </div>
                            </Button>
                        </ActionLink>
                    </div>
                </div>

                <div className="grid grid-cols-6 grid-rows-4 gap-4 mt-6">
                    <div className="col-span-3 row-span-4">
                        <Card className="bg-neutral-50 dark:bg-gray-600 pb-0">
                            <div className="grid grid-cols-5 grid-rows-5 gap-2 ">
                                <div className="col-span-5">
                                    <div className="grid grid-cols-13 grid-rows-2 gap-0.5 mb-2">
                                        <div className="row-span-2 col-span-1 col-start-1">
                                            <div className="flex  h-12 w-12  rounded-2xl  ">
                                                <FaUserTag className="text-blue-700 dark:text-blue-500 h-9 w-9 ml-0 mt-1" />
                                            </div>
                                        </div>
                                        <div className="col-span-12 row-span-2  ">
                                            <h4>Personal Details</h4>
                                            <p>
                                                Your identity information as per
                                                you Aadhar. This cannot be
                                                changed.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-5 row-span-4 row-start-2 mb-4 ml-8">
                                    <div className="grid grid-cols-5 grid-rows-6 gap-4 ">
                                        <div className="col-span-2 my-2">
                                            <div className="flex flex-row">
                                                <User2 className="h-5 w-5" />

                                                <p className="pl-3 text-black  dark:text-gray-100">
                                                    Full Name
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-span-3 col-start-3 my-2">
                                            <p>
                                                : {user?.aadharId.firstName}{' '}
                                                {user?.aadharId.middleName}{' '}
                                                {user?.aadharId.lastName}
                                            </p>
                                        </div>
                                        <div className="col-span-2 row-start-2 my-2">
                                            <div className="flex flex-row">
                                                <Mail className="h-5 w-5 pr-1" />

                                                <p className="pl-3 text-black  dark:text-gray-100">
                                                    Email Adrress
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-span-3 col-start-3 row-start-2 my-2">
                                            <p>: {`${user?.aadharId.email}`}</p>
                                        </div>
                                        <div className="col-span-2 row-start-3 my-2">
                                            <div className="flex flex-row">
                                                <Phone className="h-4 w-5" />

                                                <p className="pl-3 text-black  dark:text-gray-100">
                                                    Mobile Number
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-span-3 col-start-3 row-start-3 my-2">
                                            <p>
                                                : {'+91'}{' '}
                                                {`${user?.aadharId.contact}`}
                                            </p>
                                        </div>
                                        <div className="col-span-2 row-start-4 my-2">
                                            <div className="flex flex-row">
                                                <IdCard className="h-5 w-5" />

                                                <p className="pl-3 text-black  dark:text-gray-100">
                                                    Aadhar Number
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-span-3 col-start-3 row-start-4 my-2">
                                            <p>
                                                :{' '}
                                                {`${user?.aadharId.aadharNumber}`}
                                            </p>
                                        </div>
                                        <div className="col-span-2 row-start-5 my-2">
                                            <div className="flex flex-row">
                                                <LuCalendarDays className="h-5 w-5" />

                                                <p className="pl-3 text-black  dark:text-gray-100">
                                                    Date of Birth
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-span-3 col-start-3 row-start-5 my-2">
                                            <p>
                                                : {'  '}
                                                {`${user?.aadharId.dob}`}
                                            </p>
                                        </div>
                                        <div className="col-span-2 row-start-6 my-2">
                                            <div className="flex flex-row">
                                                <FaVenusMars className="h-5 w-5" />
                                                <p className="pl-3 text-black  dark:text-gray-100">
                                                    Gender
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-span-3 col-start-3 row-start-6 my-2">
                                            <p>
                                                : {`${user?.aadharId.gender}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-span-3 row-span-1 col-start-4">
                        <Card className="bg-neutral-50 dark:bg-gray-600 pb-3">
                            <div className="grid grid-cols-6 grid-rows-2 gap-2 ">
                                <div className="col-span-6 ">
                                    <div className="grid grid-cols-13 grid-rows-2 gap-1 mb-2">
                                        <div className="row-span-2 col-span-1 col-start-1">
                                            <div className="flex  h-12 w-12">
                                                <PiBagDuotone className="text-purple-700 dark:text-purple-500 h-9 w-9 ml-0 mt-1" />
                                            </div>
                                        </div>
                                        <div className="col-span-12 row-span-2  ">
                                            <h4>Role & Assignment</h4>
                                            <p>
                                                Your role and service assignment
                                                details
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2 row-start-2 pt-4">
                                    <p className="text-black  dark:text-gray-100 ">
                                        Designation
                                    </p>
                                    <p className="">{`${user?.roleId.name}`}</p>
                                </div>
                                <div className="col-span-2 row-start-2 col-start-3 pt-4">
                                    <p className="text-black  dark:text-gray-100 ">
                                        Employee Id
                                    </p>
                                    <p className="">{`${user?.employeeId}`}</p>
                                </div>
                                <div className="col-span-2 row-start-2 col-start-5 pt-4">
                                    <p className="text-black  dark:text-gray-100  ">
                                        Access Level
                                    </p>
                                    <p className="">General Clerk</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-span-3 row-span-2 col-start-4 row-start-2 mt-3">
                        <Card className="bg-neutral-50 dark:bg-gray-600">
                            <div className="grid grid-cols-5 grid-rows-3 gap-0.5">
                                <div className="col-span-5">
                                    <div className="grid grid-cols-13 grid-rows-2 gap-0.5">
                                        <div className="row-span-2 col-span-1 col-start-1">
                                            <div className="flex  h-12 w-12  rounded-2xl  ">
                                                <GrLocation className="text-green-700 dark:text-green-500 h-9 w-9 ml-0 mt-1" />
                                            </div>
                                        </div>
                                        <div className="col-span-12 row-span-2  ">
                                            <h4>Work Location Details</h4>
                                            <p>
                                                Your office and location
                                                information
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-5 row-span-2 row-start-2">
                                    <div className="grid grid-cols-5 grid-rows-4 gap-1 mt-3 ">
                                        <div className="mb-1 text-black  dark:text-gray-100">
                                            State
                                            <hr />
                                        </div>
                                        <div className="col-span-4 mb-1">
                                            :{' '}
                                            {`${user?.officeDepartmentId.officeId?.districtId.stateId.name}`}
                                            <hr />
                                        </div>

                                        <div className="row-start-2 text-black  dark:text-gray-100">
                                            District
                                            <hr />
                                        </div>
                                        <div className="col-span-4 row-start-2">
                                            :{' '}
                                            {`${user?.officeDepartmentId.officeId?.districtId.name}`}
                                            <hr />
                                        </div>
                                        <div className="row-start-3 text-black  dark:text-gray-100">
                                            Office
                                            <hr />
                                        </div>
                                        <div className="col-span-4 row-start-3">
                                            :{' '}
                                            {`${user?.officeDepartmentId.officeId?.name}`}
                                            <hr />
                                        </div>
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
