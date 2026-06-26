import Container from './HomeContainer'
import { HTMLMotionProps, motion } from 'framer-motion'
import classNames from 'classnames'
import { ActionLink } from '@/components/shared'
import { TbCircleCheck } from 'react-icons/tb'
import { MoveRight, Route } from 'lucide-react'
import { Button } from '@/components/ui'
import {
    PiBabyDuotone,
    PiFlowerTulipDuotone,
    PiHeartDuotone,
} from 'react-icons/pi'
import { LuFileCheck2 } from 'react-icons/lu'

type CardProps = HTMLMotionProps<'div'>

const Card = ({
    children,
    initial,
    animate,
    transition,
    className,
    viewport,
    whileInView,
}: CardProps) => {
    return (
        <motion.div
            initial={initial}
            animate={animate}
            transition={transition}
            whileInView={whileInView}
            className={classNames(
                'bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800 p-6',
                className,
            )}
            viewport={viewport}
        >
            {children}
        </motion.div>
    )
}
//
const Services = ({
    birthUrl = '/app/forms/birth',
    marriageUrl = '/app/forms/marriage',
    deathUrl = '/app/forms/death',
    myApplicationsUrl = '/app/applications',
}) => {
    return (
        <div id="features" className="relative z-20 pt-2 md:pt-2">
            <Container className="max-w-11xl mx-auto px-7 flex  flex-col mt-2  justify-between">
                <div className="relative z-20 py-4 md:py-2">
                    <h2 className="pt-4 pb-1   hover:text-blue-900 ">
                        Citizen Services
                    </h2>
                    <p className="px-2">Choose service to get started</p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                        <Card
                            className="
                            bg-gradient-to-b
                            from-green-50
                            to-white
                            to-80%
                            hover:border-blue-500
                            hover:bg-sky-50
                            dark:from-gray-700
                            dark:to-gray-800
                            dark:hover:bg-gray-600"
                        >
                            <div className="flex flex-col h-full gap-4">
                                <div className="col-span-1 row-span-3">
                                    <div className="flex justify-center items-center w-22 h-22 bg-green-50 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-100 ">
                                        <PiBabyDuotone className="h-16 w-16 text-green-700" />
                                    </div>
                                </div>
                                <div className="col-span-3 row-start-4">
                                    <h2>Birth Certificate</h2>
                                </div>
                                <div className="col-span-3 row-start-5">
                                    <p className="text-base">
                                        Secure your child&apos;s official
                                        identity and registration records.
                                    </p>
                                </div>

                                <div className="col-span-3 row-start-7">
                                    <div className="flex items-center gap-2">
                                        <TbCircleCheck className="text-2xl text-green-600" />
                                        <span>
                                            <p className="text-base">
                                                New Birth Registration
                                            </p>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-span-3 col-start-1 row-start-8">
                                    <div className="flex items-center gap-2">
                                        <TbCircleCheck className="text-2xl text-green-600" />
                                        <span>
                                            <p className="text-base">
                                                Flexible Verification
                                            </p>
                                        </span>
                                    </div>
                                </div>
                                <div className="row-span-3 col-start-5 row-start-9">
                                    <div className="flex justify-self-end align-bottom items-center  w-12 h-12 bg-green-50 dark:bg-gray-400 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-100 ">
                                        <ActionLink
                                            to={birthUrl}
                                            className="heading-text font-bold"
                                            themeColor={false}
                                        >
                                            <MoveRight className="h-6 w-6 text-green-700 justify-center align-middle ml-3" />
                                        </ActionLink>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Card
                            className="
                            bg-gradient-to-b
                            from-orange-50
                            to-white
                            to-80%
                            hover:border-blue-500
                            hover:bg-sky-50
                            dark:from-gray-700
                            dark:to-gray-800
                            dark:hover:bg-gray-600"
                        >
                            <div className="flex flex-col h-full gap-4">
                                <div className="col-span-1 row-span-3">
                                    <div className="flex justify-center items-center w-22 h-22 bg-orange-50  rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-100 ">
                                        <PiHeartDuotone className="h-16 w-16 text-orange-700" />
                                    </div>
                                </div>
                                <div className="col-span-3 row-start-4">
                                    <h2>Marriage Certificate</h2>
                                </div>
                                <div className="col-span-3 row-start-5">
                                    <p className="text-base">
                                        Register your marriage and obtain a
                                        legally recognized certificate.
                                    </p>
                                </div>

                                <div className="col-span-3 row-start-7">
                                    <div className="flex items-center gap-2">
                                        <TbCircleCheck className="text-2xl text-orange-700" />
                                        <span>
                                            <p className="text-base">
                                                New Marriage Registration
                                            </p>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-span-3 col-start-1 row-start-8">
                                    <div className="flex items-center gap-2">
                                        <TbCircleCheck className="text-2xl text-orange-700" />
                                        <span>
                                            <p className="text-base">
                                                Flexible Verification
                                            </p>
                                        </span>
                                    </div>
                                </div>
                                <div className="row-span-3 col-start-5 row-start-7">
                                    <div className="">
                                        <div className="flex justify-self-end align-bottom items-center  w-12 h-12 bg-orange-50 dark:bg-gray-400 dark:border-gray-700 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-100 ">
                                            <ActionLink
                                                to={marriageUrl}
                                                className="heading-text font-bold hover:text-orange-700"
                                                themeColor={false}
                                            >
                                                <MoveRight className="h-6 w-6 text-orange-700 ml-3" />
                                            </ActionLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Card
                            className="
                            bg-gradient-to-b
                            from-purple-50
                            to-white
                            to-80%
                            hover:border-blue-500
                            hover:bg-sky-50
                            dark:from-gray-700
                            dark:to-gray-800
                            dark:hover:bg-gray-600"
                        >
                            <div className="flex flex-col h-full gap-4">
                                <div className="col-span-1 row-span-3">
                                    <div className="flex justify-center items-center w-22 h-22 bg-purple-50 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-100 ">
                                        <PiFlowerTulipDuotone className="h-16 w-16 text-purple-700" />
                                    </div>
                                </div>
                                <div className="col-span-3 row-start-4">
                                    <h2>Death Certificate</h2>
                                </div>
                                <div className="col-span-3 row-start-5">
                                    <p className="text-base">
                                        Register a death record and obtain an
                                        officially recognized certificate.
                                    </p>
                                </div>

                                <div className="col-span-3 row-start-7">
                                    <div className="flex items-center gap-2">
                                        <TbCircleCheck className="text-2xl text-purple-600" />
                                        <span>
                                            <p className="text-base">
                                                New Death Registration
                                            </p>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-span-3 col-start-1 row-start-8">
                                    <div className="flex items-center gap-2">
                                        <TbCircleCheck className="text-2xl text-purple-600" />
                                        <span>
                                            <p className="text-base">
                                                Flexible Verification
                                            </p>
                                        </span>
                                    </div>
                                </div>
                                <div className="row-span-3 col-start-5 row-start-7">
                                    <div className="">
                                        <div className="flex justify-self-end align-bottom items-center  w-12 h-12 bg-purple-50 dark:bg-gray-400 dark:border-gray-700 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-100 ">
                                            <ActionLink
                                                to={deathUrl}
                                                className="heading-text font-bold hover:text-purple-700"
                                                themeColor={false}
                                            >
                                                <MoveRight className="h-6 w-6 text-purple-700 ml-3" />
                                            </ActionLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <Card className="mt-14 bg-blue-100">
                    <div className="grid grid-cols-20 grid-rows-1 gap-1">
                        <div className="pl-4">
                            <LuFileCheck2 className="w-14 h-16 text-blue-700" />
                        </div>
                        <div className="col-span-8 col-start-2">
                            <h5>Track My Application</h5>
                            <p className="text-sm">
                                Monitor your application status and stay updated
                                on every step of the process.
                            </p>
                        </div>
                        <div className="col-span-2 col-start-17 flex items-center ">
                            <div className="">
                                <ActionLink
                                    to={myApplicationsUrl}
                                    themeColor={false}
                                >
                                    <Button
                                        variant="solid"
                                        className="w-70 heading-text font-bold"
                                    >
                                        <div className="flex flex-row">
                                            <Route className="mx-4" />
                                            Track Applications
                                        </div>
                                    </Button>
                                </ActionLink>
                            </div>
                        </div>
                    </div>
                </Card>
            </Container>
        </div>
    )
}

export default Services
