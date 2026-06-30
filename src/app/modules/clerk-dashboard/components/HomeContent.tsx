import { Card } from '@/components/ui'
import { FiInbox } from 'react-icons/fi'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { RxCrossCircled } from 'react-icons/rx'
//for chart
import Chart from 'react-apexcharts'
import { COLOR_1 } from '@/constants/chart.constant'
import { FaUserTag } from 'react-icons/fa'
import { AiOutlineClockCircle } from 'react-icons/ai'

const HomeContent = () => {
    const data = [
        {
            name: 'Applications Received',
            data: [68, 41, 35, 62, 74, 49, 29, 75, 81, 86, 99, 79],
        },
    ]
    return (
        <div>
            <Card>
                <h2>Dashboard</h2>
                <p>
                    Welcome back, Swar Patel! Here&apos;s an overview of your
                    dashboard
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
                                        <h1>128</h1>
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
                                        <h1>85</h1>
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
                                        <h1>25</h1>
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
                                        <h1>18</h1>
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
                    <Card className="mt-6 bg-blue-50 dark:bg-gray-600 py-4">
                        <div className="grid grid-cols-12 grid-rows-2 gap-4">
                            <div className="row-span-2 col-span-1">
                                <div className="flex justify-center items-center h-20 w-20 bg-blue-100 dark:bg-gray-400 rounded-2xl   ">
                                    {' '}
                                    <FaUserTag className="text-blue-700 dark:text-blue-600 h-14 w-14 ml-2" />
                                </div>
                            </div>
                            <div className="col-span-7 col-start-2 row-span-2 ">
                                <p>You are assigned for </p>
                                <h3>General Certificate Verification</h3>
                                <p>
                                    You will recieve and verify Birth, Marriage,
                                    Death applications.
                                </p>
                            </div>
                        </div>
                    </Card>
                </Card>
            </Card>
        </div>
    )
}

export default HomeContent
