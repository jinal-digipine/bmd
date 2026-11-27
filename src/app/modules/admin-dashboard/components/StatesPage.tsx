import { Button, Card, Notification, toast } from '@/components/ui'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import { AdaptiveCard, Container, DebouceInput } from '@/components/shared'
import { TbSearch, TbTrash } from 'react-icons/tb'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import { useCallback, useEffect, useState } from 'react'
import { StateApis } from '@/app/@api/state-module/state.api'
import { State } from '@/app/@api/state-module/state.types'

const { Tr, Td, TBody, THead, Th } = Table

const StatePage = () => {
    const navigate = useNavigate()
    const [states, setState] = useState<State.Detail[]>([])

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(5)
    const [totalItems, setTotalItems] = useState<number>(10)

    const [search, setSearch] = useState<string>('')

    const onPaginationChange = (page: number) => {
        setCurrentPage(page)
    }

    const fetchStateData = useCallback(
        async (page: number, limit: number, search: string) => {
            try {
                const response = await StateApis.list(page, limit, search)
                setState(response.data || response || [])
            } catch {
                toast.push(
                    <Notification closable type="danger" duration={3000}>
                        Failed to fetch states data!
                    </Notification>,
                )
                setState([])
            }
        },
        [],
    )
    useEffect(() => {
        fetchStateData(currentPage, pageSize, search)
    }, [currentPage, pageSize, search, fetchStateData])

    const handleDelete = async (id: State.Id) => {
        try {
            await StateApis.delete(id)
            fetchStateData(currentPage, pageSize, search)
            toast.push(
                <Notification closable type="success" duration={3000}>
                    State Deleted Sucessfully.
                </Notification>,
            )
        } catch {
            toast.push(
                <Notification closable type="danger" duration={3000}>
                    Failed to Delete State!
                </Notification>,
            )
        }
    }
    const handleAdd = () => {
        navigate(`/app/admin/action/add-state`)
    }
    function onInputChange(value: string): void {
        setSearch(value)
        setCurrentPage(1)
    }

    return (
        <div>
            <Container>
                <AdaptiveCard>
                    <div className="grid grid-cols-4 grid-rows-1 gap-2">
                        <div className="col-span-2 col-start-1">
                            <div className="pt-4 pl-3">
                                <h2>States</h2>
                                <p>View and Manage all the States in System.</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-10 grid-rows-1 gap-0.5 ">
                        <div className="col-span-3 flex justify-end items-end">
                            <DebouceInput
                                placeholder="Quick search..."
                                suffix={<TbSearch className="text-lg" />}
                                onChange={(e) => onInputChange(e.target.value)}
                            />
                        </div>
                        <div className="col-span-2 col-start-9 flex justify-end items-center">
                            <Button
                                type="button"
                                variant="solid"
                                className="mt-8 justify-self-end  "
                                onClick={handleAdd}
                            >
                                <div className="flex flex-row">
                                    <FiPlus className="mr-2 mt-1 " />
                                    Add State
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
                                        <Th>State Name</Th>
                                        <Th>Creation Date</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </THead>

                                <TBody>
                                    {states.map((state, index) => (
                                        <Tr key={state._id}>
                                            <Td>
                                                {(currentPage - 1) * pageSize +
                                                    index +
                                                    1}
                                            </Td>
                                            <Td>{state.name}</Td>
                                            <Td>
                                                {state.createdAt.slice(0, 10)}
                                            </Td>

                                            <Td>
                                                <div className="flex flex-row h-3  items-center">
                                                    <Button
                                                        variant="plain"
                                                        onClick={() =>
                                                            handleDelete(
                                                                state._id,
                                                            )
                                                        }
                                                    >
                                                        <TbTrash className="h-5  w-5 " />
                                                    </Button>
                                                </div>
                                            </Td>
                                        </Tr>
                                    ))}
                                </TBody>
                            </Table>
                            <div className="justify-self-end">
                                <Pagination
                                    currentPage={currentPage}
                                    pageSize={pageSize}
                                    total={totalItems}
                                    onChange={onPaginationChange}
                                />
                            </div>
                        </div>
                    </Card>
                </AdaptiveCard>
            </Container>
        </div>
    )
}

export default StatePage
