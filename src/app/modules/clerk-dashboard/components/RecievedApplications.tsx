import { Card, Notification, toast } from '@/components/ui'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import { IoCloseSharp } from 'react-icons/io5'
import {
    ActionLink,
    AdaptiveCard,
    Container,
    DebouceInput,
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
import { useCallback, useEffect, useState } from 'react'

import MarriageApplication from '../actions/view-marriage/MarriageApplication'
import DeathApplication from '../actions/view-death/DeathApplication'
import BirthApplication from '../actions/view-birth/BirthApplication'
import EditBirthForm from '../actions/edit-birth/BirthForm'
import EditMarriageForm from '../actions/edit-marriage/MarriageForm'
import EditDeathForm from '../actions/edit-death/DeathForm'
import { User } from '@/app/@api/user/user.types'
import { TotalApis } from '@/app/@api/clerk-dashboard/totals.api'
import { TotalCount } from '@/app/@api/clerk-dashboard/totals.types'

const { Tr, Td, TBody, THead, Th } = Table

const MyApplications = () => {
    const [applications, setApplications] = useState<Application.Detail[]>([])

    const [choosenViewService, setChoosenViewService] =
        useState<Application.Detail | null>(null)
    const [selectedEditService, setSelectedEditService] =
        useState<Application.Detail | null>(null)

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(5)
    const [selectedStatus, setSelectedStatus] = useState<string>('')
    const [search, setSearch] = useState<string>('')

    const [counts, setCounts] = useState<TotalCount.Base>()

    const onPaginationChange = (page: number) => {
        setCurrentPage(page)
    }
    const fetchApplicationData = useCallback(
        async (
            page: number,
            limit: number,
            searchVal: string,
            statusVal: string,
        ) => {
            try {
                const response = await ApplicationApis.list(
                    page,
                    limit,
                    searchVal,
                    statusVal,
                )
                setApplications(response.data || response)
            } catch {
                toast.push(
                    <Notification closable type="danger" duration={3000}>
                        Something Went Wrong!! Try Again..
                    </Notification>,
                )
            }
        },
        [],
    )

    useEffect(() => {
        fetchApplicationData(currentPage, pageSize, search, selectedStatus)
    }, [currentPage, pageSize, search, selectedStatus, fetchApplicationData])

    function onInputChange(value: string): void {
        setSearch(value)
        setCurrentPage(1)
    }

    const handleStatusFilter = (status: string) => {
        setSelectedStatus(status)
        setCurrentPage(1)
    }

    //------> handle the updating the application status to approved
    const handleApproveApplication = async (
        application: Application.Detail,
    ) => {
        try {
            await ApplicationApis.update(application._id, {
                status: Application.EStatus.ACCEPTED,
            })
            toast.push(
                <Notification closable type="success" duration={3000}>
                    This Application Approved Successfully.
                </Notification>,
            )
            // reload table for this val changes
            fetchApplicationData(currentPage, pageSize, search, selectedStatus)
        } catch {
            toast.push(
                <Notification closable type="danger" duration={3000}>
                    Failed to Approve This application.!
                </Notification>,
            )
        }
    }
    //------> handle the updating the application to rejected
    const handleRejectApplication = async (application: Application.Detail) => {
        try {
            await ApplicationApis.update(application._id, {
                status: Application.EStatus.REJECTED,
            })

            toast.push(
                <Notification closable type="success" duration={3000}>
                    This Application Rejected Successfully.
                </Notification>,
            )
            // reload table for this val changes
            fetchApplicationData(currentPage, pageSize, search, selectedStatus)
        } catch {
            toast.push(
                <Notification closable type="danger" duration={3000}>
                    Failed to Reject This Application!
                </Notification>,
            )
        }
    }

    //------> function to fetch dynamic count for applications clerk specifice
    const id = '6a5f7a456891b11a1ae72a29' as User.Id
    const fetchCountsValues = async (id: User.Id) => {
        try {
            const res = await TotalApis.list(id)
            setCounts(res)
        } catch {
            toast.push(
                <Notification closable type="danger" duration={3000}>
                    something went wrong while fetching counts!!
                </Notification>,
            )
        }
    }
    useEffect(() => {
        fetchCountsValues(id)
    }, [id])

    //------> for view forms based on type , dynamic rendering of view pages
    if (choosenViewService) {
        if (choosenViewService.serviceType === Application.EService.BIRTH) {
            return (
                <BirthApplication
                    id={choosenViewService._id as Application.Id}
                />
            )
        }
        if (choosenViewService.serviceType === Application.EService.MARRIAGE) {
            return (
                <MarriageApplication
                    id={choosenViewService._id as Application.Id}
                />
            )
        }
        if (choosenViewService.serviceType === Application.EService.DEATH) {
            return (
                <DeathApplication
                    id={choosenViewService._id as Application.Id}
                />
            )
        }
    }

    // //------> for edit forms based on type, for dynamic rendering the update pages of application
    if (selectedEditService) {
        if (selectedEditService.serviceType === Application.EService.BIRTH) {
            return (
                <EditBirthForm id={selectedEditService._id as Application.Id} />
            )
        }
        if (selectedEditService.serviceType === Application.EService.MARRIAGE) {
            return (
                <EditMarriageForm
                    id={selectedEditService._id as Application.Id}
                />
            )
        }
        if (selectedEditService.serviceType === Application.EService.DEATH) {
            return (
                <EditDeathForm id={selectedEditService._id as Application.Id} />
            )
        }
    }

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
                        <button
                            type="button"
                            className="border-2 rounded-lg h-10 hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out hover:scale-105 flex justify-center items-center"
                            onClick={() => handleStatusFilter('')}
                        >
                            <div className="flex flex-row">
                                <p>All</p>
                                <p className="ml-2">
                                    {counts?.totalApplications}
                                </p>
                            </div>
                        </button>
                        <button
                            type="button"
                            className="border-2 rounded-lg h-10 hover:text-yellow-600 hover:bg-yellow-50  transition duration-300 ease-in-out hover:scale-105 flex justify-center items-center"
                            onClick={() => handleStatusFilter('pending')}
                        >
                            <div className="flex flex-row">
                                <p>Pending</p>
                                <p className="ml-2">
                                    {counts?.pendingApplications}
                                </p>
                            </div>
                        </button>

                        <button
                            type="button"
                            className="border-2 rounded-lg h-10 hover:text-green-600 hover:bg-green-50 transition duration-300 ease-in-out hover:scale-105 flex justify-center items-center"
                            onClick={() => handleStatusFilter('approved')}
                        >
                            <div className="flex flex-row">
                                <p>Approved</p>
                                <p className="ml-2">
                                    {counts?.approvedApplications}
                                </p>
                            </div>
                        </button>
                        <button
                            type="button"
                            className="border-2 rounded-lg h-10 hover:text-red-600 hover:bg-red-50 transition duration-300 ease-in-out hover:scale-105 flex justify-center items-center"
                            onClick={() => handleStatusFilter('rejected')}
                        >
                            <div className="flex flex-row">
                                <p>Rejected</p>
                                <p className="ml-2">
                                    {counts?.rejectedApplications}
                                </p>
                            </div>
                        </button>

                        <div className=" col-span-3 col-start-8 flex justify-end items-end transition duration-300 ease-in-out hover:scale-101">
                            <DebouceInput
                                placeholder="Quick search..."
                                suffix={<TbSearch className="text-lg" />}
                                onChange={(e) => onInputChange(e.target.value)}
                            />
                        </div>
                    </div>

                    <Card className="my-4">
                        <div>
                            <Table>
                                <THead className="text-4xl">
                                    <Tr>
                                        <Th>Sr.No.</Th>
                                        <Th>Application No.</Th>
                                        <Th>Applicant Name</Th>
                                        <Th>Application Type</Th>
                                        <Th>Date Received</Th>
                                        <Th>Status</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </THead>
                                <TBody>
                                    {applications.map((application, index) => (
                                        <Tr key={application.applicationNumber}>
                                            <Td>{index + 1}</Td>
                                            <Td>
                                                {application.applicationNumber}
                                            </Td>
                                            <Td>
                                                {application.userId?.aadharId?.firstName
                                                    ?.charAt(0)
                                                    .toLocaleUpperCase()}
                                                {application.userId.aadharId?.firstName?.slice(
                                                    1,
                                                )}{' '}
                                                {
                                                    application.userId?.aadharId
                                                        ?.lastName
                                                }
                                            </Td>
                                            <Td>
                                                {application.serviceType
                                                    .charAt(0)
                                                    .toUpperCase()}
                                                {application.serviceType.slice(
                                                    1,
                                                )}
                                            </Td>
                                            <Td>
                                                {application.createdAt.slice(
                                                    0,
                                                    10,
                                                )}
                                            </Td>
                                            <Td>
                                                {application.status
                                                    .charAt(0)
                                                    .toUpperCase()}
                                                {application.status.slice(1)}
                                            </Td>
                                            <Td>
                                                <div className="flex flex-row">
                                                    <button
                                                        type="button"
                                                        className="mx-2"
                                                        onClick={() =>
                                                            setChoosenViewService(
                                                                application,
                                                            )
                                                        }
                                                    >
                                                        <TbEye className="h-5 w-5" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="mx-2"
                                                        onClick={() =>
                                                            setSelectedEditService(
                                                                application,
                                                            )
                                                        }
                                                    >
                                                        <TbPencil className="h-5 w-5 " />
                                                    </button>

                                                    <ActionLink
                                                        themeColor={false}
                                                        className=" mx-2"
                                                    >
                                                        <TbVideoFilled className="h-5 w-5 " />
                                                    </ActionLink>

                                                    <button
                                                        type="button"
                                                        className="mx-2 hover:text-green-700"
                                                        onClick={() =>
                                                            handleApproveApplication(
                                                                application,
                                                            )
                                                        }
                                                    >
                                                        <TbChecks className="h-5 w-5 " />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="mx-2 hover:text-red-700"
                                                        onClick={() => {
                                                            handleRejectApplication(
                                                                application,
                                                            )
                                                        }}
                                                    >
                                                        <IoCloseSharp className="h-5 w-5 " />
                                                    </button>
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
