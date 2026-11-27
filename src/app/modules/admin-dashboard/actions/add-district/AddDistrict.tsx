import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { ChangeEvent, MouseEvent } from 'react'
import { FormItem, Form } from '@/components/ui/Form'
import { Input, Notification, Select, toast } from '@/components/ui'
import { useNavigate } from 'react-router'
import { StateApis } from '@/app/@api/state-module/state.api'
import { DistrictApis } from '@/app/@api/district-module/district.api'
import { State } from '@/app/@api/state-module/state.types'
import { Controller, useForm } from 'react-hook-form'

const AddDistrict = () => {
    const [dialogIsOpen, setIsOpen] = useState(true)
    const navigate = useNavigate()

    const [states, setStates] = useState<State.Detail[]>([])

    const [selectedStateId, setSelectedStateId] = useState<string>()
    const [districtName, setDistrictName] = useState<string>('')

    const { control } = useForm({
        defaultValues: {
            stateId: '',
        },
    })

    // Fetch all states so the user can pick one from the dropdown
    const fetchStateData = async () => {
        try {
            const response = await StateApis.list(1, 1000)
            setStates(response.data || response || [])
        } catch (error) {
            alert('error from state page' + error)
        }
    }
    useEffect(() => {
        fetchStateData()
    }, [])

    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
        navigate('/app/admin/districts-page')
    }

    // Handles submitting the data to the server
    const handleAddDistrict = async () => {
        if (!selectedStateId) {
            alert('please select a state  for adding new District .')
            return
        }

        try {
            const res = await DistrictApis.create({
                name: districtName,
                stateId: selectedStateId,
            })
            if (res) {
                toast.push(
                    <Notification closable type="success" duration={3000}>
                        District Added successfully!
                    </Notification>,
                )
            }
            setIsOpen(false)
            navigate('/app/admin/districts-page')
        } catch (error) {
            alert('Failed to add district:' + error)
            navigate('/app/admin/districts-page')
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
                <h5 className="mb-4">Add New District</h5>

                <Form>
                    <FormItem asterisk label="Select State" className=" flex-1">
                        <Controller
                            name="stateId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Select State"
                                    options={states.map((item) => ({
                                        label: item.name,
                                        value: item._id,
                                    }))}
                                    onChange={(option) => {
                                        field.onChange(option?.value || '')
                                        setSelectedStateId(option?.value || '')
                                    }}
                                    value={states
                                        .map((dis) => ({
                                            label: dis.name,
                                            value: dis._id,
                                        }))
                                        .find(
                                            (dis) => dis.value === field.value,
                                        )}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem asterisk label="District Name">
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="e.g. Gandhinagar"
                            value={districtName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setDistrictName(e.target.value)
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
                    <Button variant="solid" onClick={handleAddDistrict}>
                        Add
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default AddDistrict
