import { Card } from '@/components/ui'
import Container from './HomeContainer'
import { FileText } from 'lucide-react'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'

const { Tr, Td, TBody, THead, Th } = Table

function MyApplications() {
    const onPaginationChange = (page: number) => {
        console.log('onPaginationChange', page)
    }

    return (
        <div>
            <div className="mb-16"></div>
            <Container className="mt-18 max-w-11xl px-10">
                <div className="pt-14 pl-3">
                    <h2>My Applications</h2>
                    <p>View and track all your submitted applications</p>
                </div>
                <Card className="mt-6">
                    <div className="flex flex-row">
                        <div className="flex justify-center items-center h-12 w-12 bg-blue-100 dark:bg-gray-400 rounded-2xl ">
                            <FileText className="h-10 w-10  text-blue-800" />
                        </div>

                        <div className="pl-3">
                            <h3>Application List</h3>
                            <p>Track the status of all your applications</p>
                        </div>
                    </div>
                    <Card className="mt-6">
                        <div>
                            <Table>
                                <THead className="text-4xl">
                                    <Tr>
                                        <Th>Sr.No.</Th>
                                        <Th>Application No.</Th>
                                        <Th>Application Type</Th>
                                        <Th>Date</Th>
                                        <Th>Status</Th>
                                    </Tr>
                                </THead>
                                <TBody>
                                    <Tr>
                                        <Td>1</Td>
                                        <Td>BDM/2026/000201</Td>
                                        <Td>Birth</Td>
                                        <Td>20/04/2026</Td>
                                        <Td>Pending</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>2</Td>
                                        <Td>BDM/2026/000315</Td>
                                        <Td>Marriage</Td>
                                        <Td>02/03/2026</Td>
                                        <Td>Rejected</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>3</Td>
                                        <Td>BDM/2026/000201</Td>
                                        <Td>Birth</Td>
                                        <Td>20/04/2026</Td>
                                        <Td>Pending</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>4</Td>
                                        <Td>BDM/2026/000201</Td>
                                        <Td>Birth</Td>
                                        <Td>20/04/2026</Td>
                                        <Td>Pending</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>5</Td>
                                        <Td>BDM/2025/004011</Td>
                                        <Td>Death</Td>
                                        <Td>18/02/2025</Td>
                                        <Td>Aproved</Td>
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
