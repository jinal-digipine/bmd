import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import { FormItem, Form } from '@/components/ui/Form'
import { Input } from '@/components/ui'
import { useNavigate } from 'react-router'

const AddState = () => {
    const [dialogIsOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()

    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
        navigate('/app/admin/states-page')
    }

    const onDialogOk = (e: MouseEvent) => {
        setIsOpen(false)
        navigate('/app/admin/states-page')
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
                <h5 className="mb-4">Add New State</h5>

                <Form>
                    <FormItem asterisk label="State Name">
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="e.g. Himachal Pradesh"
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
