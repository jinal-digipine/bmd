import Container from './LandingContainer'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import birthImg from '../../../../assets/images/card_birth.png'
import marriageImg from '../../../../assets/images/card_marriage.png'
import deathImg from '../../../../assets/images/card_death.png'

import { TbPointFilled } from 'react-icons/tb'

const PointList = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex items-center gap-2">
            <TbPointFilled className="text-xl" />
            <span>{children}</span>
        </div>
    )
}
const Features = () => {
    return (
        <div id="features" className="relative z-20 py-10 md:py-40">
            <Container>
                <div className="relative z-20 py-4 md:py-2">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.3,
                            type: 'spring',
                            bounce: 0.1,
                        }}
                        viewport={{ once: true }}
                    >
                        <motion.h2 className="my-2 text-5xl">
                            BMD Services
                        </motion.h2>
                        <motion.p className="mx-auto max-w-[800px]">
                            Access essential civil registration services online
                            with ease. Apply and receive verified certificates
                            without the hassle of lengthy paperwork or office
                            visits.
                        </motion.p>
                    </motion.div>
                    <div className="mt-4">
                        <motion.div
                            className="bg-gray-200 dark:bg-gray-800 rounded-3xl py-12 px-10 lg:py-24 lg:px-16 overflow-hidden mb-10"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.3,
                                type: 'spring',
                                bounce: 0.4,
                            }}
                            viewport={{ once: true }}
                        >
                            <div className="grid lg:grid-cols-2 gap-8 lg:gap-4">
                                <div>
                                    <h3 className="text-4xl">
                                        Birth Certificate
                                    </h3>
                                    <p className="mt-6 max-w-[550px] text-lg">
                                        Simplify birth registration and
                                        certificate issuance through a secure
                                        and citizen-friendly digital platform.
                                        Apply, track, and manage birth records
                                        with ease while ensuring compliance with
                                        government regulations.
                                    </p>
                                    <div className="mt-12 flex flex-col gap-4">
                                        <PointList>
                                            Streamlined online application
                                            process for new birth registrations.
                                        </PointList>
                                        <PointList>
                                            Secure document submission and
                                            verification.
                                        </PointList>
                                        <PointList>
                                            Fast, transparent, and accurate
                                            certificate verification and
                                            issuance.
                                        </PointList>
                                    </div>
                                </div>
                                <div className="relative flex justify-center">
                                    <motion.div
                                        className="p-2 border border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-700 rounded-[32px] max-w-[300px] lg:absolute lg:top-[-50px]"
                                        whileHover={{ y: -20 }}
                                    >
                                        <div className="absolute inset-x-0 bottom-0 h-20 w-full bg-gradient-to-b from-transparent via-gray-100 to-gray-100 dark:via-zinc-800/70 dark:to-gray-800 scale-[1.1] pointer-events-none" />
                                        <div className="bg-white dark:bg-black dark:border-gray-700 border border-gray-200 rounded-[24px] overflow-hidden max-h-[450px]">
                                            <img
                                                src={birthImg}
                                                alt="birth"
                                                className="rounded-[24px]"
                                            />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <div className="mt-20">
                        <motion.div
                            className="bg-gray-200 dark:bg-gray-800 rounded-3xl py-12 px-10 lg:py-24 lg:px-16 overflow-hidden mb-10"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.3,
                                type: 'spring',
                                bounce: 0.1,
                            }}
                            viewport={{ once: true }}
                        >
                            <div className="grid lg:grid-cols-2 gap-8 lg:gap-4">
                                <div>
                                    <h3 className="text-4xl">
                                        Marriage Certificate
                                    </h3>
                                    <p className="mt-6 max-w-[550px] text-lg">
                                        Complete marriage registration and
                                        certificate issuance through a secure
                                        and convenient digital platform. Apply,
                                        track, and manage marriage records with
                                        confidence while ensuring compliance
                                        with government regulations.
                                    </p>
                                    <div className="mt-12 flex flex-col gap-4">
                                        <PointList>
                                            Streamlined online application
                                            process for marriage registration.
                                        </PointList>
                                        <PointList>
                                            Secure document submission and
                                            verification.
                                        </PointList>
                                        <PointList>
                                            Fast, transparent, and accurate
                                            certificate verification and
                                            issuance.
                                        </PointList>
                                    </div>
                                </div>
                                <div className="relative flex justify-center">
                                    <motion.div
                                        className="p-2 border border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-700 rounded-[32px] max-w-[300px] lg:absolute lg:top-[-50px]"
                                        whileHover={{ y: -20 }}
                                    >
                                        <div className="absolute inset-x-0 bottom-0 h-20 w-full bg-gradient-to-b from-transparent via-gray-100 to-gray-100 dark:via-zinc-800/70 dark:to-gray-800 scale-[1.1] pointer-events-none" />
                                        <div className="bg-white dark:bg-black dark:border-gray-700 border border-gray-200 rounded-[24px] overflow-hidden max-h-[450px]">
                                            <img
                                                src={marriageImg}
                                                alt="birth"
                                                className="rounded-[24px]"
                                            />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <div className="mt-20">
                        <motion.div
                            className="bg-gray-200 dark:bg-gray-800 rounded-3xl py-12 px-10 lg:py-24 lg:px-16 overflow-hidden mb-10"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.3,
                                type: 'spring',
                                bounce: 0.1,
                            }}
                            viewport={{ once: true }}
                        >
                            <div className="grid lg:grid-cols-2 gap-8 lg:gap-4">
                                <div>
                                    <h3 className="text-4xl">
                                        Death Certificate
                                    </h3>
                                    <p className="mt-6 max-w-[550px] text-lg">
                                        Manage death registration and
                                        certificate issuance through a secure
                                        and efficient digital platform. Apply,
                                        track, and access official death records
                                        with ease while ensuring compliance with
                                        government regulations.
                                    </p>
                                    <div className="mt-12 flex flex-col gap-4">
                                        <PointList>
                                            Streamlined online application
                                            process for death registration.
                                        </PointList>
                                        <PointList>
                                            Secure document submission and
                                            verification.
                                        </PointList>
                                        <PointList>
                                            Fast, transparent, and accurate
                                            certificate verification and
                                            issuance.
                                        </PointList>
                                    </div>
                                </div>
                                <div className="relative flex justify-center">
                                    <motion.div
                                        className="p-2 border border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-700 rounded-[32px] max-w-[300px] lg:absolute lg:top-[-50px]"
                                        whileHover={{ y: -20 }}
                                    >
                                        <div className="absolute inset-x-0 bottom-0 h-20 w-full bg-gradient-to-b from-transparent via-gray-100 to-gray-100 dark:via-zinc-800/70 dark:to-gray-800 scale-[1.1] pointer-events-none" />
                                        <div className="bg-white dark:bg-black dark:border-gray-700 border border-gray-200 rounded-[24px] overflow-hidden max-h-[450px]">
                                            <img
                                                src={deathImg}
                                                alt="birth"
                                                className="rounded-[24px]"
                                            />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Features
