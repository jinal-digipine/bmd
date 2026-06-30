import { Button, Card } from '@/components/ui'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import { AdaptiveCard, Container, DebouceInput } from '@/components/shared'
import { TbSearch, TbTrash } from 'react-icons/tb'

const { Tr, Td, TBody, THead, Th } = Table

const UsersPage = () => {
    const onPaginationChange = (page: number) => {
        console.log('onPaginationChange', page)
    }

    return (
        <div>
            <Container>
                <AdaptiveCard>
                    <div className="grid grid-cols-4 grid-rows-1 gap-2">
                        <div className="col-span-1 col-start-1">
                            <div className="pt-4 pl-3">
                                <h2>Users</h2>
                                <p>View and Manage all users in system.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-10 grid-rows-1 gap-0.5 ">
                        <div className="col-span-3 flex justify-end items-end mt-8">
                            <DebouceInput
                                // ref={}
                                placeholder="Quick search..."
                                suffix={<TbSearch className="text-lg" />}
                                // onChange={(e) => onInputChange(e.target.value)}
                            />
                        </div>
                    </div>

                    <Card className="mt-6">
                        <div>
                            <Table>
                                <THead className="text-4xl">
                                    <Tr>
                                        <Th>Sr.No.</Th>
                                        <Th>Full Name</Th>
                                        <Th>Email Address</Th>
                                        <Th>Mobile Number</Th>
                                        <Th>Aadhar Number</Th>
                                        <Th>Registered On</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </THead>
                                <TBody>
                                    <Tr>
                                        <Td>1</Td>
                                        <Td>John Doe</Td>
                                        <Td>John.doe@gmail.com</Td>
                                        <Td>9843678670</Td>
                                        <Td>XXXX XXXX 1234</Td>
                                        <Td>18 May 2024</Td>
                                        <Td>
                                            <div className="flex flex-row h-3  items-center">
                                                <Button variant="plain">
                                                    <TbTrash className="h-5  w-5 " />
                                                </Button>
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
                </AdaptiveCard>
            </Container>
        </div>
    )
}

export default UsersPage
