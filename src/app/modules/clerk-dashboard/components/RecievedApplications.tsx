import { Card } from '@/components/ui'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import { IoCloseSharp } from 'react-icons/io5'
import {
    ActionLink,
    AdaptiveCard,
    AutoComplete,
    Container,
} from '@/components/shared'
import {
    TbChecks,
    TbEye,
    TbPencil,
    TbSearch,
    TbVideoFilled,
} from 'react-icons/tb'
import { Application } from '@/app/@api/application-module/application.types'
import { ApplicationApis } from '@/app/@api/application-module/application.api'
import { useEffect, useState } from 'react'

const editB = '/app/clerk/action/forms/birth'
const editM = '/app/clerk/action/forms/marriage'
const editD = '/app/clerk/action/forms/death'
const viewB = '/app/clerk/action/view/birth'
const viewM = '/app/clerk/action/view/marriage'
const viewD = '/app/clerk/action/view/death'

const { Tr, Td, TBody, THead, Th } = Table

const MyApplications = () => {
    const [applications, setApplications] = useState<Application.Detail[]>([])

    const onPaginationChange = (page: number) => {
        console.log('onPaginationChange', page)
    }

    const fetchApplicationData = async () => {
        try {
            const response = await ApplicationApis.list()
            setApplications(response.data)
        } catch {
            console.log('error occured in clerk-application page')
            return []
        }
    }
    useEffect(() => {
        fetchApplicationData()
    })

    return (
        <div>
            <Container>
                <AdaptiveCard>
                    <div className="pt-4 pl-3">
                        <h2>Applications</h2>
                        <p>
                            Manage and verify all applications assigned to you.
                        </p>
                    </div>
                    <div className="grid grid-cols-10 grid-rows-1 gap-2 mt-8 ">
                        <div className=" border-2 rounded-lg h-10 hover:text-blue-600 flex justify-center items-center ">
                            <div className="flex flex-row">
                                <p>All</p>
                                <p className=" ml-2">128</p>
                            </div>
                        </div>
                        <div className="">
                            <div className=" border-2 rounded-lg h-10 hover:text-yellow-600 flex justify-center items-center">
                                <div className="flex flex-row">
                                    <p>Pending</p>
                                    <p className=" ml-2">67</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className=" border-2 rounded-lg h-10 hover:text-green-600 flex justify-center items-center">
                                <div className="flex flex-row">
                                    <p>Approved</p>
                                    <p className=" ml-2">43</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className=" border-2 rounded-lg h-10 hover:text-red-600 flex justify-center items-center">
                                <div className="flex flex-row">
                                    <p>Rejected</p>
                                    <p className=" ml-2">18</p>
                                </div>
                            </div>
                        </div>
                        <div className=" col-span-3 col-start-8 flex justify-end items-end ">
                            <AutoComplete
                                suffix={<TbSearch className="text-lg " />}
                                placeholder="Search by application no ... "
                                className="justify-items-start w-xs border border-neutral-300 rounded-xl"
                            />
                        </div>
                    </div>
                    {/* <hr className="my-4" /> */}
                    <Card className="my-4">
                        <div>
                            <Table>
                                <THead className="text-4xl">
                                    <Tr>
                                        <Th>Sr.No.</Th>
                                        <Th>Application No.</Th>
                                        <Th>Applicant Name</Th>
                                        <Th>Application Type</Th>
                                        <Th>Date Recieved</Th>
                                        <Th>Status</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </THead>
                                <TBody>
                                    {applications.map((application, index) => (
                                        <Tr key={application._id}>
                                            <Td>{index}</Td>
                                            <Td>
                                                {application.applicationNumber}
                                            </Td>
                                            <Td>
                                                {
                                                    application.userId.aadharId
                                                        .firstName
                                                }{' '}
                                                {
                                                    application.userId.aadharId
                                                        .lastName
                                                }
                                            </Td>
                                            <Td>{application.serviceType}</Td>
                                            <Td>{application.createdAt}</Td>
                                            <Td>{application.status}</Td>
                                            <Td>
                                                <div className="flex flex-row">
                                                    <ActionLink
                                                        to={viewB}
                                                        themeColor={false}
                                                        className=" mx-2"
                                                    >
                                                        <TbEye className="h-5 w-5 " />
                                                    </ActionLink>
                                                    <ActionLink
                                                        to={editB}
                                                        themeColor={false}
                                                        className=" mx-2"
                                                    >
                                                        <TbPencil className="h-5 w-5  " />
                                                    </ActionLink>

                                                    <ActionLink
                                                        // to={myApplicationsUrl}
                                                        themeColor={false}
                                                        className=" mx-2"
                                                    >
                                                        <TbVideoFilled className="h-5 w-5   " />
                                                    </ActionLink>
                                                    <ActionLink
                                                        // to={myApplicationsUrl}
                                                        themeColor={false}
                                                        className="  mx-2"
                                                    >
                                                        <TbChecks className="h-5  w-5  " />
                                                    </ActionLink>
                                                    <ActionLink
                                                        // to={myApplicationsUrl}
                                                        themeColor={false}
                                                        className=" mx-2"
                                                    >
                                                        <IoCloseSharp className="h-5 w-5 " />
                                                    </ActionLink>
                                                </div>
                                            </Td>
                                        </Tr>
                                    ))}
                                </TBody>
                            </Table>
                            <div className="justify-self-end">
                                <Pagination onChange={onPaginationChange} />
                            </div>
                        </div>
                    </Card>
                </AdaptiveCard>
            </Container>
        </div>
    )
}

export default MyApplications
