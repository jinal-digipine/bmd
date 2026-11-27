import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { ChangeEvent, MouseEvent } from 'react'
import { FormItem, Form } from '@/components/ui/Form'
import { Input, Notification, Select, toast } from '@/components/ui'
import { useNavigate } from 'react-router'
import { OfficeApis } from '@/app/@api/office-module/office.api'
import { DistrictApis } from '@/app/@api/district-module/district.api'
import { District } from '@/app/@api/district-module/district.types'
import { State } from '@/app/@api/state-module/state.types'
import { StateApis } from '@/app/@api/state-module/state.api'

const AddState = () => {
    const [dialogIsOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()
    const [officeName, setOfficeName] = useState('')
    const [district, setDistrict] = useState<District.Detail[]>([])
    const [states, setStates] = useState<State.Detail[]>([])
    const [selectedStateId, setSelectedStateId] = useState<string>()
    const [selectedDistrictId, setSelectedDistrictId] = useState<string>()

    //fetching states
    const fetchStateData = async () => {
        try {
            const response = await StateApis.list()
            setStates(response.data || response || [])
            console.log('func called', states)
        } catch (error) {
            console.log('error from state fetching', error)
        }
    }
    useEffect(() => {
        fetchStateData()
    }, [])

    //fetching district
    const fetchDistrictData = async () => {
        try {
            const response = await DistrictApis.list()
            setDistrict(response.data || response || [])
        } catch (error) {
            console.log('error from district fetching', error)
        }
    }
    useEffect(() => {
        fetchDistrictData()
    }, [])

    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
        navigate('/app/admin/offices-page')
    }

    const handleAddOffice = async () => {
        if (!selectedDistrictId) {
            alert('please select a district  for adding new office .')
            return
        }
        try {
            const res = await OfficeApis.create({
                name: officeName,
                districtId: selectedDistrictId,
            })
            if (res) {
                if (res) {
                    toast.push(
                        <Notification closable type="success" duration={3000}>
                            Office Added successfully!
                        </Notification>,
                    )
                }
            }
            setIsOpen(false)
            navigate('/app/admin/offices-page')
        } catch (err) {
            alert('Failed to add office:' + err)
            navigate('/app/admin/offices-page')
        }
    }
    //----------------set state
    const stateOptions = states.map((state) => ({
        label: state.name,
        value: state._id,
    }))

    const SelectedstateOption =
        stateOptions.find((opt) => opt.value === selectedStateId) || undefined

    // ----------------set district
    const districtOptions = district.map((state) => ({
        label: state.name,
        value: state._id,
    }))

    const SelectedDistrictOption =
        districtOptions.find((opt) => opt.value === selectedDistrictId) ||
        undefined

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
                        <Select
                            placeholder="select state to add office"
                            options={stateOptions}
                            value={SelectedstateOption}
                            onChange={(option) =>
                                setSelectedStateId(
                                    option?.value || option?.label || '',
                                )
                            }
                        />
                    </FormItem>
                    <FormItem asterisk label="Select District">
                        <Select
                            placeholder="select district to add office"
                            options={districtOptions}
                            value={SelectedDistrictOption}
                            onChange={(opt) =>
                                setSelectedDistrictId(
                                    opt?.value || opt?.label || '',
                                )
                            }
                        />
                    </FormItem>
                    <FormItem asterisk label="Office Name">
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="e.g. Nikol BMD office, Ahmedabad"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setOfficeName(e.target.value)
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
                    <Button variant="solid" onClick={handleAddOffice}>
                        Add
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default AddState
