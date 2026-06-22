import { Card } from '@/components/ui'
import building from '../../../../assets/images/building.png'
import { ShieldCheck, Globe, ListChecks, Headset } from 'lucide-react'

const HeroContent = () => {
    return (
        <Card className="bg-blue-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 backdrop-brightness-75  mt-30 mx-6 ">
            <div className="grid grid-cols-6 grid-rows-3 gap-1">
                <div className="col-span-4 row-span-2">
                    <div className="max-w-11xl mx-auto px-4 flex  flex-col mt-6  justify-between">
                        <div className="flex flex-col pt-2 md:pt-2 ">
                            <h2>Welcome to Your Dashboard!👋</h2>

                            <p className="mt-2 font-serif text-lg">
                                Access and Manage your Birth, Marriage and Death
                                Certificate
                            </p>
                            <p className=" font-serif text-lg">
                                services in one place.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row-start-3">
                    <Card className="dark:bg-gray-700">
                        <div className="grid grid-cols-7 grid-rows-4 gap-2">
                            <div className="col-span-2 row-span-4">
                                <ShieldCheck className="h-10 w-10 text-blue-700 dark:text-blue-500 justify-self-center" />
                            </div>
                            <div className="col-span-5 row-span-2 col-start-3">
                                <h6>Fast & Secure</h6>
                            </div>
                            <div className="col-span-5 row-span-2 col-start-3 row-start-3">
                                <p className="text-xs">
                                    Your data is protected
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="row-start-3">
                    <Card className="dark:bg-gray-700">
                        <div className="grid grid-cols-7 grid-rows-4 gap-2">
                            <div className="col-span-2 row-span-4">
                                <Globe className="h-10 w-10 text-blue-700 dark:text-blue-500 justify-self-center" />
                            </div>
                            <div className="col-span-5 row-span-2 col-start-3">
                                <h6>100% Online</h6>
                            </div>
                            <div className="col-span-5 row-span-2 col-start-3 row-start-3">
                                <p className="text-xs">Apply from anywhere</p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="row-start-3">
                    <Card className="dark:bg-gray-700">
                        <div className="grid grid-cols-7 grid-rows-4 gap-2">
                            <div className="col-span-2 row-span-4">
                                <ListChecks className="h-10 w-10 text-blue-700 dark:text-blue-500 justify-self-center" />
                            </div>
                            <div className="col-span-5 row-span-2 col-start-3">
                                <h6>Track Status</h6>
                            </div>
                            <div className="col-span-5 row-span-2 col-start-3 row-start-3">
                                <p className="text-xs">Real time updates</p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="row-start-3">
                    <Card className="dark:bg-gray-700">
                        <div className="grid grid-cols-7 grid-rows-4 gap-2">
                            <div className="col-span-2 row-span-4">
                                <Headset className="h-10 w-10 text-blue-700 dark:text-blue-500 justify-self-center" />
                            </div>
                            <div className="col-span-5 row-span-2 col-start-3">
                                <h6>24/7 Support</h6>
                            </div>
                            <div className="col-span-5 row-span-2 col-start-3 row-start-3">
                                <p className="text-xs">
                                    We&apos;re here to help
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-span-2 row-span-3 col-start-5">
                    <img
                        src={building}
                        alt="building"
                        className="w-100 h-70 fixed bottom-6 right-4  "
                    />
                </div>
            </div>
        </Card>
    )
}

export default HeroContent
