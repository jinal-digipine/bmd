import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import { FormItem, Form } from '@/components/ui/Form'
import { DatePicker, Input, Select } from '@/components/ui'
import { useNavigate } from 'react-router'

const AddHoliday = () => {
    const [dialogIsOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
        navigate('/app/admin/holidays-page')
    }

    const onDialogOk = (e: MouseEvent) => {
        console.log('onDialogOk', e)
        setIsOpen(false)
        navigate('/app/admin/holidays-page')
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
                <h5 className="mb-4">Add New Holiday</h5>

                <Form>
                    <FormItem asterisk label="Holiday Name">
                        <Input
                            type="text"
                            placeholder="e.g. Diwali"
                            autoComplete="off"
                        />
                    </FormItem>
                    <FormItem asterisk label="Description">
                        <Input
                            type="text"
                            placeholder="e.g. The Festival of Joy and FireCrackers."
                            autoComplete="off"
                        />
                    </FormItem>
                    <FormItem asterisk label="Date of Holiday">
                        <DatePicker placeholder="Pick a date" />
                    </FormItem>
                    <FormItem asterisk>
                        <Select placeholder="National Holidays" />
                    </FormItem>
                    <FormItem asterisk>
                        <Select placeholder="Office" />
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

export default AddHoliday
