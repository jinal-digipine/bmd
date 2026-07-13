import { Button, Card, Select } from '@/components/ui'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import { AdaptiveCard, Container, DebouceInput } from '@/components/shared'
import { TbPencil, TbSearch, TbTrash } from 'react-icons/tb'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import { useState } from 'react'

const { Tr, Td, TBody, THead, Th } = Table

const ClerkPage = () => {
    const navigate = useNavigate()
    const [dialogIsOpen, setIsOpen] = useState(false)

    const onPaginationChange = (page: number) => {
        console.log('onPaginationChange', page)
    }
    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
    }

    const onDialogOk = (e: MouseEvent) => {
        setIsOpen(false)
    }

    const handleAdd = () => {
        navigate('/app/admin/action/clerk-signup')
    }
    return (
        <div>
            <Container>
                <AdaptiveCard>
                    <div className="grid grid-cols-4 grid-rows-1 gap-2">
                        <div className="col-span-1 col-start-1">
                            <div className="pt-4 pl-3">
                                <h2>Clerks</h2>
                                <p>View and Manage all clerks in system.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-10 grid-rows-1 gap-0.5 ">
                        <div className="col-span-3 flex justify-end items-end">
                            <DebouceInput
                                // ref={}
                                placeholder="Quick search..."
                                suffix={<TbSearch className="text-lg" />}
                                // onChange={(e) => onInputChange(e.target.value)}
                            />
                        </div>

                        <div className="col-span-2 col-start-9 flex justify-end items-center ">
                            <Button
                                type="button"
                                variant="solid"
                                className="mt-8 justify-self-end "
                                onClick={handleAdd}
                            >
                                <div className="flex flex-row">
                                    <FiPlus className="mr-2 mt-1" />
                                    Add Clerk
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
                                        <Th>Full Name</Th>
                                        <Th>Employee Id</Th>
                                        <Th>Office</Th>
                                        <Th>District</Th>
                                        <Th>Status</Th>
                                        <Th>Registered On</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </THead>
                                <TBody>
                                    <Tr>
                                        <Td>1</Td>
                                        <Td>Swar Patel</Td>
                                        <Td>C00/2024/0012</Td>
                                        <Td>Ahmedabad Municipal Corporation</Td>
                                        <Td>Ahmedabad</Td>
                                        <Td>active</Td>
                                        <Td>12 May 2024</Td>
                                        <Td>
                                            <div className="flex flex-row h-3  items-center">
                                                <Button
                                                    variant="plain"
                                                    onClick={() => openDialog()}
                                                >
                                                    <TbPencil className="h-5 w-5  " />
                                                </Button>

                                                <div>
                                                    <Dialog
                                                        isOpen={dialogIsOpen}
                                                        onClose={onDialogClose}
                                                        onRequestClose={
                                                            onDialogClose
                                                        }
                                                    >
                                                        <h5 className="mb-4">
                                                            Change Staus
                                                        </h5>
                                                        <Select placeholder="set status" />
                                                        <div className="text-right mt-6">
                                                            <Button
                                                                className="ltr:mr-2 rtl:ml-2"
                                                                variant="plain"
                                                                onClick={
                                                                    onDialogClose
                                                                }
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                variant="solid"
                                                                onClick={
                                                                    onDialogOk
                                                                }
                                                            >
                                                                Done
                                                            </Button>
                                                        </div>
                                                    </Dialog>
                                                </div>

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

export default ClerkPage
