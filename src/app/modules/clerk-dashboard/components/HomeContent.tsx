import { Button, Card, Notification, toast } from '@/components/ui'
import { FiInbox } from 'react-icons/fi'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { RxCrossCircled } from 'react-icons/rx'
//for chart
import Chart from 'react-apexcharts'
import { COLOR_1 } from '@/constants/chart.constant'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { TotalCount } from '@/app/@api/clerk-dashboard/totals.types'
import { TotalApis } from '@/app/@api/clerk-dashboard/totals.api'
import { User } from '@/app/@api/user/user.types'
import { UserApis } from '@/app/@api/user/user.api'
import { HiOutlineInboxArrowDown } from 'react-icons/hi2'
import { FaChevronRight } from 'react-icons/fa'
import { useNavigate } from 'react-router'

const HomeContent = () => {
    const [counts, setCounts] = useState<TotalCount.Base>()
    const [clerk, setClerk] = useState<User.Detail>()
    const [monthwiseCount, setMonthWiseCount] = useState<number[]>([])
    const navigate = useNavigate()

    const handleGoApplications = () => {
        navigate('/app/clerk/applications')
    }
    const id = '6a5f7a456891b11a1ae72a29' as User.Id
    const fetchCountsValues = async (id: User.Id) => {
        try {
            const res = await TotalApis.list(id)
            setCounts(res)

            //for graph
            const monthRes = await TotalApis.getMonthlyCount(id, 2026)
            if (monthRes) {
                const ValArray = monthRes.map((item) => item.count)
                setMonthWiseCount(ValArray)
            }
        } catch {
            toast.push(
                <Notification closable type="danger" duration={3000}>
                    something went wrong!!
                </Notification>,
            )
        }
    }
    useEffect(() => {
        fetchCountsValues(id)
    }, [id])

    //------>fetching clerk specific detail
    const fetchClerkDetail = async (id: User.Id) => {
        try {
            const resp = await UserApis.get(id)
            setClerk(resp.data || resp)
        } catch {
            toast.push(
                <Notification closable type="danger" duration={3000}>
                    something went wrong!!
                </Notification>,
            )
        }
    }

    useEffect(() => {
        fetchClerkDetail(id)
    }, [id])

    const data = [
        {
            name: 'Total Applications',
            data: monthwiseCount,
        },
    ]
    return (
        <div>
            <Card>
                <h2 className="mb-3">Dashboard</h2>
                <p>
                    Welcome back,{' '}
                    <b className="text-black">
                        {clerk?.aadharId.firstName} {clerk?.aadharId.lastName}!
                    </b>{' '}
                    Here&apos;s an overview of your dashboard
                </p>
                <Card className="mt-6">
                    <div className="grid grid-cols-4 grid-rows-2 gap-3 ">
                        <div className="row-span-2">
                            <Card className="bg-blue-50 dark:bg-gray-600">
                                <div className="grid grid-cols-3 grid-rows-2 gap-2">
                                    <div className="row-span-2 flex justify-center items-center">
                                        <div className="flex justify-center items-center  h-16 w-16 bg-blue-100 dark:bg-gray-400 rounded-2xl  ">
                                            {' '}
                                            <FiInbox className="text-blue-700 dark:text-blue-600 h-8 w-8" />
                                        </div>
                                    </div>
                                    <div className="col-span-2 col-start-2">
                                        <h6>Applications Recieved</h6>
                                    </div>
                                    <div className="col-span-2 col-start-2 row-start-2">
                                        <h1>{counts?.totalApplications}</h1>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="row-span-2">
                            <Card className="bg-amber-50 dark:bg-gray-600">
                                <div className="grid grid-cols-3 grid-rows-2 gap-2">
                                    <div className="row-span-2 flex justify-center items-center">
                                        <div className="flex justify-center items-center  h-16 w-16 bg-amber-100 dark:bg-gray-400 rounded-2xl  ">
                                            {' '}
                                            <AiOutlineClockCircle className="text-amber-700 dark:text-amber-200 h-8 w-8" />
                                        </div>
                                    </div>
                                    <div className="col-span-2 col-start-2">
                                        <h6>Applications Pending</h6>
                                    </div>
                                    <div className="col-span-2 col-start-2 row-start-2">
                                        <h1>{counts?.pendingApplications}</h1>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="row-span-2">
                            <Card className="bg-green-50 dark:bg-gray-600">
                                <div className="grid grid-cols-3 grid-rows-2 gap-2">
                                    <div className="row-span-2 flex justify-center items-center">
                                        <div className="flex justify-center items-center  h-16 w-16 bg-green-100 dark:bg-gray-400 rounded-2xl  ">
                                            {' '}
                                            <IoMdCheckmarkCircleOutline className="text-green-700 dark:text-green-600 h-8 w-8" />
                                        </div>
                                    </div>
                                    <div className="col-span-2 col-start-2">
                                        <h6>Applications Approved</h6>
                                    </div>
                                    <div className="col-span-2 col-start-2 row-start-2">
                                        <h1>{counts?.approvedApplications}</h1>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="row-span-2">
                            <Card className="bg-red-50 dark:bg-gray-600">
                                <div className="grid grid-cols-3 grid-rows-2 gap-2">
                                    <div className="row-span-2 flex justify-center items-center">
                                        <div className="flex justify-center items-center  h-16 w-16 bg-red-100 dark:bg-gray-400 rounded-2xl  ">
                                            {' '}
                                            <RxCrossCircled className="text-red-700 dark:text-red-600 h-8 w-8" />
                                        </div>
                                    </div>
                                    <div className="col-span-2 col-start-2">
                                        <h6>Applications Rejected</h6>
                                    </div>
                                    <div className="col-span-2 col-start-2 row-start-2">
                                        <h1>{counts?.rejectedApplications}</h1>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Card className="dark:bg-gray-600">
                            <Chart
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
                                height={300}
                            />
                        </Card>
                    </div>

                    <Card className="mt-6 bg-sky-50 dark:bg-gray-600 py-4">
                        <div className="grid grid-cols-12  items-center">
                            {/* Left Side */}

                            <div className="col-span-7 flex gap-5 items-center">
                                <div>
                                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                        Current Assignment
                                    </span>

                                    <h3 className="mt-3">
                                        General Certificate Verification
                                    </h3>

                                    <p className="text-gray-900 dark:text-gray-300 mt-1">
                                        You are responsible for reviewing and
                                        verifying Birth, Marriage and Death
                                        certificate applications.
                                    </p>
                                    <Card className="bg-zinc-50 mt-5 ">
                                        <div className="flex gap-x-30 mt-0 text-sm">
                                            <div>
                                                <p className="text-gray-900">
                                                    Last Assigned
                                                </p>
                                                <p className="font-semibold text-gray-900">
                                                    {clerk?.lastAssignedAt
                                                        ? clerk.lastAssignedAt
                                                              .toLocaleString()
                                                              .slice(0, 10)
                                                        : '--'}
                                                </p>
                                            </div>
                                            <div className="border-l border-blue-200 pl-8">
                                                <p className="text-gray-900 ">
                                                    Last Updated At
                                                </p>
                                                <p className="font-semibold text-gray-900">
                                                    {clerk?.updatedAt.slice(
                                                        0,
                                                        10,
                                                    )}
                                                </p>
                                            </div>
                                            <div className="border-l border-blue-200 pl-8">
                                                <p className="text-gray-900">
                                                    Special Department
                                                </p>
                                                <p className="font-semibold text-gray-900">
                                                    {
                                                        clerk
                                                            ?.officeDepartmentId
                                                            ?.departmentId?.name
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>

                            <div className="col-span-5 border-l border-blue-200 dark:border-gray-500 pl-8">
                                {/* middle part */}
                                <div className="grid grid-cols-6 grid-rows-3 gap-y-4">
                                    <div className="col-span-3">
                                        <div className="flex flex-row space-x-5">
                                            <p className="text-gray-900 text-sm">
                                                Role{' : '}
                                            </p>
                                            <p className="font-semibold text-gray-700 pb-2">
                                                {clerk?.roleId?.name ??
                                                    'Verifier'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-span-3 col-start-1 row-start-2">
                                        <div className="flex flex-row space-x-5">
                                            <p className="text-gray-900 text-sm">
                                                Status{' : '}
                                            </p>

                                            <span
                                                className={`inline-flex px-3 pb-1 rounded-full text font-semibold text-gray-900 ${
                                                    clerk?.status === 'active'
                                                        ? 'bg-green-50 text-green-700'
                                                        : 'bg-red-50 text-red-700'
                                                }`}
                                            >
                                                {clerk?.status ?? '--'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-3 col-start-1 row-start-3">
                                        <div className="col-span-2 flex flex-row space-x-5">
                                            <div className=" flex flex-row space-x-5">
                                                <p className="text-gray-900 text-sm">
                                                    Last Login{'  : '}
                                                </p>
                                                <p className="font-semibold text-gray-700 pb-2">
                                                    {clerk?.lastLoginAt
                                                        ? clerk.lastLoginAt
                                                              .toLocaleString()
                                                              .slice(0, 10)
                                                        : '--'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* right side */}
                                    <div className="row-span-3 col-start-4 col-span-3 row-start-1 border-l border-blue-200 ">
                                        <div className="border rounded-2xl border-blue-200 ml-2 text-sm p-2 justify-items-center">
                                            <div className="flex justify-center items-center  h-14 w-14 rounded-2xl bg-blue-100 dark:bg-gray-500 py-3 mt-3 mb-3 ">
                                                <HiOutlineInboxArrowDown className="text-blue-700 dark:text-blue-600 h-10 w-10" />
                                            </div>
                                            <h5>View Applications</h5>
                                            <p className="mt-2">
                                                Go to applications to review,
                                            </p>
                                            <p>manage and take action</p>
                                            <Button
                                                type="button"
                                                variant="solid"
                                                className="w-full flex flex-row items-center justify-center my-3 "
                                                onClick={handleGoApplications}
                                            >
                                                Go To Applications
                                                <FaChevronRight className="size-4.5 pl-2 " />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Card>
            </Card>
        </div>
    )
}

export default HomeContent
