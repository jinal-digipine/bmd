import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { ChangeEvent, MouseEvent } from 'react'
import { FormItem, Form } from '@/components/ui/Form'
import { Input, Notification, toast } from '@/components/ui'
import { useNavigate } from 'react-router'
import { StateApis } from '@/app/@api/state-module/state.api'

const AddState = () => {
    const [dialogIsOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()
    const [stateName, setStateName] = useState('')

    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
        navigate('/app/admin/states-page')
    }

    const handleAdd = async () => {
        try {
            const res = await StateApis.create({
                name: stateName,
            })
            if (res) {
                toast.push(
                    <Notification closable type="success" duration={3000}>
                        State Added successfully!
                    </Notification>,
                )
            }

            setIsOpen(false)

            navigate('/app/admin/states-page')
        } catch (error) {
            alert(error)
            navigate('/app/admin/states-page')
        }
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
                            value={stateName}
                            type="text"
                            autoComplete="off"
                            placeholder="e.g. Himachal Pradesh"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setStateName(e.target.value)
                            }
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
                    <Button variant="solid" onClick={handleAdd}>
                        Add
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default AddState
