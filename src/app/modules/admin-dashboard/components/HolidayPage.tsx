import { Button, Card } from '@/components/ui'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import { AdaptiveCard, Container } from '@/components/shared'
import { TbTrash } from 'react-icons/tb'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router'

const { Tr, Td, TBody, THead, Th } = Table

const HolidayPage = () => {
    const navigate = useNavigate()

    const onPaginationChange = (page: number) => {
        console.log('onPaginationChange', page)
    }

    const handleAdd = () => {
        navigate('/app/admin/action/add-holiday')
    }

    return (
        <div>
            <Container>
                <AdaptiveCard>
                    <div className="grid grid-cols-4 grid-rows-1 gap-2">
                        <div className="col-span-2 col-start-1">
                            <div className="pt-4 pl-3">
                                <h2>Holidays</h2>
                                <p>View and Manage all the Holidays.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-10 grid-rows-1 gap-0.5 ">
                        <div className="col-span-2 col-start-9 flex justify-end items-center">
                            <Button
                                type="button"
                                variant="solid"
                                className="mt-8 justify-self-end "
                                onClick={handleAdd}
                            >
                                <div className="flex flex-row">
                                    <FiPlus className="mr-2 mt-1" />
                                    Add Holiday
                                </div>
                            </Button>
                        </div>
                    </div>

                    <Card className="mt-6">
                        <div>
                            <Table>
                                <THead className="text-4xl">
                                    <Tr>
                                        <Th>Sr.No.</Th>
                                        <Th>Holiday Name</Th>
                                        <Th>Description</Th>
                                        <Th>Date</Th>
                                        <Th>Year</Th>
                                        <Th>National Holiday</Th>
                                        <Th>Office Name</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </THead>
                                <TBody>
                                    <Tr>
                                        <Td>1</Td>
                                        <Td>Diwali</Td>
                                        <Td>
                                            The Festival of Love and Rangolis.
                                        </Td>
                                        <Td>08/11/2026</Td>
                                        <Td>2026</Td>
                                        <Td>Yes</Td>
                                        <Td>Gandhinagar</Td>
                                        <Td className="">
                                            <div className="flex flex-row h-4  items-center">
                                                <Button variant="plain">
                                                    <TbTrash className="h-5 w-5 " />
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

export default HolidayPage
