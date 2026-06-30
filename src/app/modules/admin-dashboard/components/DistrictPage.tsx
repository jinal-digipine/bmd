import { Button, Card } from '@/components/ui'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import { AdaptiveCard, Container, DebouceInput } from '@/components/shared'
import { TbSearch, TbTrash } from 'react-icons/tb'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router'

const { Tr, Td, TBody, THead, Th } = Table

const DistrictPage = () => {
    const navigate = useNavigate()

    const onPaginationChange = (page: number) => {
        console.log('onPaginationChange', page)
    }

    const handleAdd = () => {
        navigate('/app/admin/action/add-district')
    }

    return (
        <div>
            <Container>
                <AdaptiveCard>
                    <div className="grid grid-cols-4 grid-rows-1 gap-2">
                        <div className="col-span-2 col-start-1">
                            <div className="pt-4 pl-3">
                                <h2>Districts</h2>
                                <p>
                                    View and Manage all the District in Gujarat.
                                </p>
                            </div>
                        </div>
                    </div>
                    <Card className="mt-6">
                        <div className="grid grid-cols-5 grid-rows-1 gap-4">
                            <div>
                                <p>State Name</p> <h6>Gujarat</h6>
                            </div>
                            <div>
                                <p>Total Districts</p>
                                <h6>33</h6>
                            </div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </Card>

                    <div className="grid grid-cols-10 grid-rows-1 gap-0.5 ">
                        <div className="col-span-3 flex justify-end items-end">
                            <DebouceInput
                                // ref={}
                                placeholder="Quick search..."
                                suffix={<TbSearch className="text-lg" />}
                                // onChange={(e) => onInputChange(e.target.value)}
                            />
                        </div>
                        <div className="col-span-2 col-start-9 flex justify-end items-center">
                            <Button
                                type="button"
                                variant="solid"
                                className="mt-8 justify-self-end "
                                onClick={handleAdd}
                            >
                                <div className="flex flex-row">
                                    <FiPlus className="mr-2 mt-1" />
                                    Add District
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
                                        <Th>District Name</Th>
                                        <Th>State</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </THead>
                                <TBody>
                                    <Tr>
                                        <Td>1</Td>
                                        <Td>Ahmedabad</Td>

                                        <Td>Gujarat</Td>
                                        <Td className="">
                                            <div className="flex flex-row h-4  items-center">
                                                <Button variant="plain">
                                                    <TbTrash className="h-5 w-5 " />
                                                </Button>
                                            </div>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>2</Td>
                                        <Td>Anand</Td>
                                        <Td>Gujarat</Td>

                                        <Td className="">
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

export default DistrictPage
