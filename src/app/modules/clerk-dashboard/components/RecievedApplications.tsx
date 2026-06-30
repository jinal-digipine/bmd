import { Card } from '@/components/ui'
import Container from './HomeContainer'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import { IoCloseSharp } from 'react-icons/io5'
import { ActionLink, AutoComplete } from '@/components/shared'
import {
    TbChecks,
    TbEye,
    TbPencil,
    TbSearch,
    TbVideoFilled,
} from 'react-icons/tb'

const editB = '/app/clerk/action/forms/birth'
const editM = '/app/clerk/action/forms/marriage'
const editD = '/app/clerk/action/forms/death'
const viewB = '/app/clerk/action/view/birth'
const viewM = '/app/clerk/action/view/marriage'
const viewD = '/app/clerk/action/view/death'

const { Tr, Td, TBody, THead, Th } = Table

const MyApplications = () => {
    const onPaginationChange = (page: number) => {
        console.log('onPaginationChange', page)
    }

    return (
        <div>
            <Container className="max-w-full">
                <h2>Applications</h2>
                <p>Manage and verify all applications assigned to you.</p>

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

                <Card className="mt-4">
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
                                    <Tr>
                                        <Td>1</Td>
                                        <Td>BDM/2026/000202</Td>
                                        <Td>Harsh Pandya</Td>
                                        <Td>Birth</Td>
                                        <Td>20/04/2026</Td>
                                        <Td>Approved</Td>
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
                                    <Tr>
                                        <Td>2</Td>
                                        <Td>BDM/2026/000201</Td>
                                        <Td>Aarav sharma</Td>
                                        <Td>Marriage</Td>
                                        <Td>02/03/2026</Td>
                                        <Td>Rejected</Td>
                                        <Td>
                                            <div className="flex flex-row">
                                                <ActionLink
                                                    to={viewM}
                                                    themeColor={false}
                                                    className=" mx-2"
                                                >
                                                    <TbEye className="h-5 w-5 " />
                                                </ActionLink>
                                                <ActionLink
                                                    to={editM}
                                                    themeColor={false}
                                                    className="mx-2"
                                                >
                                                    <TbPencil className="h-5 w-5  " />
                                                </ActionLink>

                                                <ActionLink
                                                    themeColor={false}
                                                    className="mx-2"
                                                >
                                                    <TbVideoFilled className="h-5 w-5   " />
                                                </ActionLink>
                                                <ActionLink
                                                    themeColor={false}
                                                    className="mx-2"
                                                >
                                                    <TbChecks className="h-5  w-5  " />{' '}
                                                </ActionLink>
                                                <ActionLink
                                                    themeColor={false}
                                                    className="mx-2"
                                                >
                                                    <IoCloseSharp className="h-5 w-5 " />
                                                </ActionLink>
                                            </div>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>3</Td>
                                        <Td>BDM/2026/000200</Td>
                                        <Td>Meera Trivedi</Td>
                                        <Td>Death</Td>
                                        <Td>20/04/2026</Td>
                                        <Td>Pending</Td>
                                        <Td>
                                            <div className="flex flex-row">
                                                <ActionLink
                                                    to={viewD}
                                                    themeColor={false}
                                                    className="mx-2"
                                                >
                                                    <TbEye className="h-5 w-5 " />
                                                </ActionLink>
                                                <ActionLink
                                                    to={editD}
                                                    themeColor={false}
                                                    className="mx-2"
                                                >
                                                    <TbPencil className="h-5 w-5  " />
                                                </ActionLink>

                                                <ActionLink
                                                    themeColor={false}
                                                    className="mx-2"
                                                >
                                                    <TbVideoFilled className="h-5 w-5   " />
                                                </ActionLink>
                                                <ActionLink
                                                    themeColor={false}
                                                    className="mx-2"
                                                >
                                                    <TbChecks className="h-5  w-5  " />{' '}
                                                </ActionLink>
                                                <ActionLink
                                                    themeColor={false}
                                                    className="mx-2"
                                                >
                                                    <IoCloseSharp className="h-5 w-5 " />
                                                </ActionLink>
                                            </div>
                                        </Td>
                                    </Tr>
                                </TBody>
                            </Table>
                            <div className="justify-self-end">
                                <Pagination onChange={onPaginationChange} />
                            </div>
                        </div>
                    </Card>
                </Card>
            </Container>
        </div>
    )
}

export default MyApplications
