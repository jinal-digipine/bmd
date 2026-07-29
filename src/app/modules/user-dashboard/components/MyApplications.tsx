import { Card } from '@/components/ui'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import { useEffect, useState } from 'react'
import { Application } from '@/app/@api/application-module/application.types'
import { ApplicationApis } from '@/app/@api/application-module/application.api'
import { AdaptiveCard, Container } from '@/components/shared'

const { Tr, Td, TBody, THead, Th } = Table

function MyApplications() {
    const [applications, setApplications] = useState<Application.Detail[]>([])

    const onPaginationChange = (page: number) => {
        console.log('onPaginationChange', page)
    }
    const fetchApplicationData = async () => {
        try {
            const response = await ApplicationApis.list()
            setApplications(response.data)
        } catch {
            alert('error occured in user-application page')
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
                        <h2>My Applications</h2>
                        <p>View and track all your submitted applications</p>
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
                                    {applications.map((application, index) => (
                                        <Tr key={application._id}>
                                            <Td>{index}</Td>
                                            <Td>
                                                {application.applicationNumber}
                                            </Td>
                                            <Td>{application.serviceType}</Td>
                                            <Td>{application.createdAt}</Td>
                                            <Td>{application.status}</Td>
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
