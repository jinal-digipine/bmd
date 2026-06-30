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
        console.log('onDialogClose', e)
        setIsOpen(false)
        navigate('/app/admin/districts-page')
    }

    const onDialogOk = (e: MouseEvent) => {
        console.log('onDialogOk', e)
        setIsOpen(false)
        navigate('/app/admin/districts-page')
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
                <h5 className="mb-4">Add New District</h5>

                <Form>
                    <FormItem asterisk label="Select State">
                        <Select placeholder="select state to add district" />
                    </FormItem>
                    <FormItem asterisk label="District Name">
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="e.g. Gandhinagar"
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
