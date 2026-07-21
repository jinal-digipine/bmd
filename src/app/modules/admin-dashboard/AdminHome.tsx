import { TotalCount } from '@/app/@api/dashboard/total.types'
import { TotalCountsApis } from '@/app/@api/dashboard/totalcounts.api'
import { Chart, Container } from '@/components/shared'
import { Button, Card } from '@/components/ui'
import { COLOR_1, COLOR_2, COLOR_3, COLOR_5 } from '@/constants/chart.constant'
import { useEffect, useState } from 'react'
import { BsSignpost2 } from 'react-icons/bs'
import { FaChevronRight, FaSitemap, FaUsers, FaUserTie } from 'react-icons/fa'
import { HiOutlineXCircle } from 'react-icons/hi'
import {
    HiBuildingLibrary,
    HiOutlineCheckBadge,
    HiOutlineClock,
    HiOutlineDocumentText,
} from 'react-icons/hi2'
import { PiMapTrifoldDuotone } from 'react-icons/pi'
import { useNavigate } from 'react-router'

const AdminHome = () => {
    const [counts, setCounts] = useState<TotalCount.Base>()

    const fetchCountsValues = async () => {
        try {
            const res = await TotalCountsApis.list()
            setCounts(res)
            console.log('the api data of counts=>', res)
        } catch {
            console.log('Error occured in district module')
        }
    }
    useEffect(() => {
        fetchCountsValues()
    }, [])

    const data = [
        {
            name: 'Total Applications',
            data: [68, 41, 35, 62, 74, 49, 29, 75, 81, 86, 99, 79],
        },
    ]

    const navigate = useNavigate()

    const handleAddClerk = () => {
        navigate('/app/admin/action/clerk-signup')
    }
    const handleAddDistrict = () => {
        navigate('/app/admin/action/add-district')
    }
    const handleAddOffice = () => {
        navigate('/app/admin/action/add-office')
    }

    return (
        <div>
            <Container>
                <div>
                    <h2>Welcome to Admin Dashboard !</h2>
                    <p>Here&apos;s overview of your system.</p>
                </div>
                <div className="grid grid-cols-6 grid-rows-5 gap-4">
                    <div className="col-span-6">
                        <div className="grid grid-cols-6 grid-rows-2 gap-2 mt-6">
                            <div className="row-span-2 ">
                                <Card>
                                    <div className="grid grid-cols-3 grid-rows-2 gap-0">
                                        <div className="row-span-3">
                                            <div className="flex justify-center items-center mx-1 h-12 w-12 bg-blue-100 dark:bg-gray-400 rounded-xl  ">
                                                {' '}
                                                <FaUserTie className="text-blue-700 dark:text-blue-700 h-8 w-8" />
                                            </div>
                                        </div>
                                        <div className="col-span-2 col-start-2 ml-2">
                                            <p className="text-black  dark:text-gray-100">
                                                Total
                                            </p>
                                            <p className="text-black  dark:text-gray-100">
                                                Clerks
                                            </p>
                                        </div>
                                        <div className="col-span-2 col-start-2 row-start-2 ml-2">
                                            <h3>{counts?.totalClerks}</h3>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className="row-span-2">
                                <Card className="">
                                    <div className="grid grid-cols-3 grid-rows-2 gap-0">
                                        <div className="row-span-3">
                                            <div className="flex justify-center items-center mx-1 h-12 w-12 bg-green-100 dark:bg-gray-400 rounded-xl  ">
                                                {' '}
                                                <FaUsers className="text-green-700 dark:text-green-700 h-8 w-8" />
                                            </div>
                                        </div>
                                        <div className="col-span-2 col-start-2 ml-2">
                                            <p className="text-black  dark:text-gray-100">
                                                Total
                                            </p>
                                            <p className="text-black  dark:text-gray-100">
                                                Users
                                            </p>
                                        </div>
                                        <div className="col-span-2 col-start-2 row-start-2 ml-2">
                                            <h3>{counts?.totalUsers}</h3>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className="row-span-2">
                                <Card className="">
                                    <div className="grid grid-cols-3 grid-rows-2 gap-0">
                                        <div className="row-span-3">
                                            <div className="flex justify-center items-center mx-1 h-12 w-12 bg-purple-100 dark:bg-gray-400 rounded-xl  ">
                                                {' '}
                                                <PiMapTrifoldDuotone className="text-purple-700 dark:text-purple-600 h-8 w-8" />
                                            </div>
                                        </div>
                                        <div className="col-span-2 col-start-2 ml-2">
                                            <p className="text-black  dark:text-gray-100">
                                                Total
                                            </p>
                                            <p className="text-black  dark:text-gray-100">
                                                States
                                            </p>
                                        </div>
                                        <div className="col-span-2 col-start-2 row-start-2 ml-2">
                                            <h3>{counts?.totalStates}</h3>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className="row-span-2">
                                <Card>
                                    <div className="grid grid-cols-3 grid-rows-2 gap-0">
                                        <div className="row-span-3">
                                            <div className="flex justify-center items-center mx-1 h-12 w-12 bg-orange-100 dark:bg-gray-400 rounded-xl  ">
                                                {' '}
                                                <BsSignpost2 className="text-orange-700 dark:text-orange-600 h-8 w-8" />
                                            </div>
                                        </div>
                                        <div className="col-span-2 col-start-2 ml-2">
                                            <p className="text-black  dark:text-gray-100">
                                                Total
                                            </p>
                                            <p className="text-black  dark:text-gray-100">
                                                District
                                            </p>
                                        </div>
                                        <div className="col-span-2 col-start-2 row-start-2 ml-2">
                                            <h3>{counts?.totalDistricts}</h3>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className="row-span-2">
                                <Card className="">
                                    <div className="grid grid-cols-3 grid-rows-2 gap-0">
                                        <div className="row-span-3">
                                            <div className="flex justify-center items-center mx-1 h-12 w-12 bg-indigo-100 dark:bg-gray-400 rounded-xl  ">
                                                {' '}
                                                <HiBuildingLibrary className="text-indigo-500 dark:text-indigo-600 h-8 w-8" />
                                            </div>
                                        </div>
                                        <div className="col-span-2 col-start-2 ml-2">
                                            <p className="text-black  dark:text-gray-100">
                                                Total
                                            </p>
                                            <p className="text-black  dark:text-gray-100">
                                                Offices
                                            </p>
                                        </div>
                                        <div className="col-span-2 col-start-2 row-start-2 ml-2">
                                            <h3>{counts?.totalOffices}</h3>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className="row-span-2">
                                <Card className="">
                                    <div className="grid grid-cols-3 grid-rows-2 gap-0">
                                        <div className="row-span-3 ">
                                            <div className="flex justify-center items-center mx-1 h-12 w-12 bg-pink-100 dark:bg-gray-400 rounded-xl  ">
                                                {' '}
                                                <FaSitemap className="text-pink-900 dark:text-pink-600 h-8 w-8" />
                                            </div>
                                        </div>
                                        <div className="col-span-3 col-start-2 ml-2">
                                            <p className="text-black   dark:text-gray-100">
                                                Total
                                            </p>
                                            <p className="text-black   dark:text-gray-100">
                                                Departments
                                            </p>
                                        </div>
                                        <div className="col-span-3 col-start-2 row-start-2 ml-2">
                                            <h3>{counts?.totalDepartments}</h3>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 row-span-2 row-start-2">
                        <Card>
                            <h4 className="font-mono mb-2">
                                Application Trend
                            </h4>
                            <hr />
                            <Chart
                                className="mt-5"
                                options={{
                                    chart: {
                                        zoom: {
                                            enabled: true,
                                        },
                                    },
                                    colors: [COLOR_1],

                                    fill: {
                                        type: 'gradient',
                                        gradient: {
                                            shadeIntensity: 1,
                                            opacityFrom: 0.5,
                                            opacityTo: 0.9,
                                            stops: [0, 80, 100],
                                        },
                                    },
                                    dataLabels: {
                                        enabled: false,
                                    },
                                    stroke: {
                                        curve: 'smooth',
                                        width: 3,
                                    },
                                    labels: [
                                        'Jan',
                                        'Feb',
                                        'Mar',
                                        'Apr',
                                        'May',
                                        'Jun',
                                        'Jul',
                                        'Aug',
                                        'Sep',
                                        'Oct',
                                        'Nov',
                                        'Dec',
                                    ],
                                    xaxis: {
                                        type: 'category',
                                    },
                                    yaxis: {
                                        opposite: false,
                                    },
                                    legend: {
                                        horizontalAlign: 'left',
                                    },
                                }}
                                type="area"
                                series={data}
                                height={330}
                            />
                        </Card>
                    </div>
                    <div className="col-span-2 row-span-2 col-start-5 row-start-2">
                        <Card>
                            <h4 className="font-mono mb-2">
                                Applications by Status
                            </h4>
                            <hr />
                            <Chart
                                height={280}
                                series={[
                                    counts?.totalApplications,
                                    counts?.pendingApplications,
                                    counts?.approvedApplications,
                                    counts?.rejectedApplications,
                                ]}
                                customOptions={{
                                    colors: [
                                        COLOR_1,
                                        COLOR_5,
                                        COLOR_2,
                                        COLOR_3,
                                    ],
                                    labels: [
                                        'recieved',
                                        'pending',
                                        'approved',
                                        'rejected',
                                    ],
                                    plotOptions: {
                                        pie: {
                                            donut: {
                                                labels: {
                                                    show: true,

                                                    total: {
                                                        show: true,
                                                        showAlways: false,
                                                        label: '',
                                                        formatter: function () {
                                                            return ''
                                                        },
                                                    },
                                                },
                                                size: '75%',
                                            },
                                        },
                                    },
                                }}
                                type="donut"
                            />
                            <hr />
                            <div className="flex flex-row justify-evenly mt-4">
                                <p>-Recived {counts?.totalApplications}</p>
                                <p>-pending {counts?.pendingApplications}</p>
                            </div>
                            <div className="flex flex-row justify-evenly mt-4 mb-2">
                                <p>-Approved {counts?.approvedApplications}</p>
                                <p>-Rejected {counts?.rejectedApplications}</p>
                            </div>
                        </Card>
                    </div>
                    <div className="col-span-3 row-span-2 row-start-4">
                        <Card>
                            <h5 className="mb-2">Quick Actions</h5>
                            <hr />
                            <div className="grid  grid-rows-3 gap-1 mt-2">
                                <div className="row-start-1 bg-blue-50 dark:bg-gray-500 rounded-xl py-1">
                                    <div className="grid grid-cols-10 grid-rows-1 gap-4">
                                        <div>
                                            <div className="flex justify-center items-center mx-1.5 my-1.5 h-10 w-10 bg-blue-100 dark:bg-gray-400 rounded-xl  ">
                                                {' '}
                                                <FaUserTie className="text-blue-700 dark:text-blue-600 h-8 w-8" />
                                            </div>
                                        </div>
                                        <div className="col-span-8">
                                            <h6>Add New Clerk</h6>
                                            <p>Create a new clerk account</p>
                                        </div>
                                        <div className="col-start-10 flex items-center justify-center ">
                                            <Button
                                                type="button"
                                                variant="plain"
                                                onClick={handleAddClerk}
                                            >
                                                <FaChevronRight />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-start-2 bg-green-50 dark:bg-gray-500 rounded-xl py-1">
                                    <div className="grid grid-cols-10 grid-rows-1 gap-4">
                                        <div>
                                            <div className="flex justify-center items-center mx-1.5 my-1.5 h-10 w-10 bg-green-100 dark:bg-gray-400 rounded-xl">
                                                {' '}
                                                <BsSignpost2 className="text-green-700 dark:text-green-700 h-8 w-8" />
                                            </div>
                                        </div>
                                        <div className="col-span-8">
                                            <h6>Add District</h6>
                                            <p>Add new district</p>
                                        </div>
                                        <div className="col-start-10 flex items-center justify-center ">
                                            <Button
                                                type="button"
                                                variant="plain"
                                                onClick={handleAddDistrict}
                                            >
                                                <FaChevronRight />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-start-3 bg-purple-50 dark:bg-gray-500 rounded-xl py-1">
                                    <div className="grid grid-cols-10 grid-rows-1 gap-4">
                                        <div>
                                            <div className="flex justify-center items-center mx-1.5 my-1.5 h-10 w-10 bg-purple-100 dark:bg-gray-400 rounded-xl">
                                                {' '}
                                                <HiBuildingLibrary className="text-purple-700 dark:text-purple-600 h-8 w-8" />
                                            </div>
                                        </div>
                                        <div className="col-span-8">
                                            <h6>Add Office</h6>
                                            <p>Add new office</p>
                                        </div>
                                        <div className="col-start-10 flex items-center justify-center ">
                                            <Button
                                                type="button"
                                                variant="plain"
                                                onClick={handleAddOffice}
                                            >
                                                <FaChevronRight />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-span-3 row-span-2 col-start-4 row-start-4">
                        <Card>
                            <h5 className="mb-2">System Overview</h5>
                            <hr />

                            <div className="grid grid-cols-10 grid-rows-1 gap-4  items-center">
                                <div>
                                    <div>
                                        <div className="flex justify-center items-center mx-1.5 my-1.5 h-9 w-9 bg-blue-100 dark:bg-gray-400 rounded-xl  ">
                                            {' '}
                                            <HiOutlineDocumentText className="text-blue-700 dark:text-blue-600 h-8 w-8" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-8 ">
                                    Total Applications
                                </div>
                                <div className="col-start-10 ">
                                    {counts?.totalApplications}
                                </div>
                            </div>
                            <hr />
                            <div className="grid grid-cols-10 grid-rows-1 gap-4  items-center">
                                <div>
                                    <div>
                                        <div className="flex justify-center items-center mx-1.5 my-1.5 h-9 w-9 bg-green-100 dark:bg-gray-400 rounded-xl  ">
                                            {' '}
                                            <HiOutlineCheckBadge className="text-green-700 dark:text-green-700 h-8 w-8" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-8 ">
                                    Approved Applications
                                </div>
                                <div className="col-start-10 ">
                                    {counts?.approvedApplications}
                                </div>
                            </div>
                            <hr />
                            <div className="grid grid-cols-10 grid-rows-1 gap-4  items-center   ">
                                <div>
                                    <div>
                                        <div className="flex justify-center items-center mx-1.5 my-1.5 h-9 w-9 bg-amber-100 dark:bg-gray-400 rounded-xl  ">
                                            {' '}
                                            <HiOutlineClock className="text-amber-700 dark:text-amber-700 h-8 w-8" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-8">
                                    Pending Applications
                                </div>
                                <div className="col-start-10">
                                    {' '}
                                    {counts?.pendingApplications}
                                </div>
                            </div>
                            <hr />
                            <div className="grid grid-cols-10 grid-rows-1 gap-4  items-center">
                                <div>
                                    <div>
                                        <div className="flex justify-center items-center mx-1.5 my-1.5 h-9 w-9 bg-red-100 dark:bg-gray-400 rounded-xl  ">
                                            {' '}
                                            <HiOutlineXCircle className="text-red-700 dark:text-red-600 h-8 w-8" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-8">
                                    Rejected Applications
                                </div>
                                <div className="col-start-10">
                                    {counts?.rejectedApplications}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default AdminHome
