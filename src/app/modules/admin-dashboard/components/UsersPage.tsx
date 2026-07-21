import { Button, Card, Notification, toast } from '@/components/ui'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import { AdaptiveCard, Container, DebouceInput } from '@/components/shared'
import { TbSearch, TbTrash } from 'react-icons/tb'
import { UserApis } from '@/app/@api/user/user.api'
import { useCallback, useEffect, useState } from 'react'
import { User } from '@/app/@api/user/user.types'
import { UserListApis } from '@/app/@api/user/usersList.api'

const { Tr, Td, TBody, THead, Th } = Table

const UsersPage = () => {
    const [users, setUsers] = useState<User.Detail[]>([])

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(5)
    const [totalItems, setTotalItems] = useState<number>(10)
    const [search, setSearch] = useState<string>('')

    const onPaginationChange = (page: number) => {
        setCurrentPage(page)
    }
    const fetchUserData = useCallback(
        async (page: number, limit: number, search: string) => {
            try {
                const response = await UserListApis.list(page, limit, search)
                setUsers(response.data)
            } catch {
                toast.push(
                    <Notification closable type="danger" duration={3000}>
                        Failed to fetch users data!
                    </Notification>,
                )
            }
        },
        [],
    )
    useEffect(() => {
        fetchUserData(currentPage, pageSize, search)
    }, [currentPage, pageSize, search, fetchUserData])

    const handleDelete = (id: User.Id) => {
        try {
            UserApis.delete(id)
            fetchUserData(currentPage, pageSize, search)
            toast.push(
                <Notification closable type="success" duration={3000}>
                    User Deleted Sucessfully.
                </Notification>,
            )
        } catch {
            toast.push(
                <Notification closable type="danger" duration={3000}>
                    Failed to Delete User!
                </Notification>,
            )
        }
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
                                onChange={(e) => onInputChange(e.target.value)}
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
                                    {users.map((user, index) => (
                                        <Tr key={user._id}>
                                            <Td>{index + 1}</Td>

                                            <Td>
                                                {user.aadharId.firstName}{' '}
                                                {user.aadharId.lastName}
                                            </Td>

                                            <Td>{user.email}</Td>

                                            <Td>
                                                {'+91'} {user.aadharId.contact}
                                            </Td>

                                            <Td>
                                                {user.aadharId.aadharNumber}
                                            </Td>

                                            <Td>
                                                {user.createdAt.slice(0, 10)}
                                            </Td>

                                            <Td>
                                                <Button
                                                    variant="plain"
                                                    onClick={() =>
                                                        handleDelete(user._id)
                                                    }
                                                >
                                                    <TbTrash className="h-5 w-5" />
                                                </Button>
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

export default UsersPage
