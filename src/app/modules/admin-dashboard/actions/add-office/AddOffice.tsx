import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import { FormItem, Form } from '@/components/ui/Form'
import { Input, Select } from '@/components/ui'
import { useNavigate } from 'react-router'

const AddState = () => {
    const [dialogIsOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()

    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
        navigate('/app/admin/offices-page')
    }

    const onDialogOk = (e: MouseEvent) => {
        setIsOpen(false)
        navigate('/app/admin/offices-page')
    }

    return (
        <div>
            <Dialog
                isOpen={dialogIsOpen}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Add New Office</h5>

                <Form>
                    <FormItem asterisk label="Select State">
                        <Select placeholder="select state to add office" />
                    </FormItem>
                    <FormItem asterisk label="Select District">
                        <Select placeholder="select district to add office" />
                    </FormItem>
                    <FormItem asterisk label="Office Name">
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="e.g. Nikol BMD office, Ahmedabad"
                        />
                    </FormItem>
                </Form>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={onDialogOk}>
                        Add
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default AddState
