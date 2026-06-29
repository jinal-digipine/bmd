import {
    Button,
    Card,
    DatePicker,
    Form,
    FormItem,
    Input,
    Select,
} from '@/components/ui'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const deathType = [
    { value: 'Natural', label: 'Natural' },
    { value: 'Un-natural', label: 'Unnatural' },
]

const DeathForm = () => {
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    const onSubmit = (values) => {
        setSubmitting(true)
        setTimeout(() => {
            window.alert(JSON.stringify(values))
            setSubmitting(false)
        }, 400)
    }
    const handleCancel = () => {
        navigate('/app/clerk/applications')
    }

    return (
        <div className="flex  justify-center items-center px-4">
            <div className="w-full max-w-6xl mx-auto">
                <h2>Death Application</h2>
                <Form onSubmit={onSubmit}>
                    {/* SECTION : Deceased's information  */}
                    <Card className="mt-4">
                        <h4 className="mb-6 ">Deceased&apos;s Information</h4>
                        <div className="grid grid-cols-6 grid-rows-2 gap-2">
                            <div className="col-span-2 row-start-1">
                                <FormItem asterisk label="Place of Death">
                                    <Input
                                        type="text"
                                        placeholder="e.g. Civil Hospital, Ahmedabad"
                                        autoComplete="off"
                                    />
                                </FormItem>
                            </div>
                            <div className="col-span-2 col-start-3 row-start-1">
                                <FormItem asterisk label="Date of Death">
                                    <DatePicker placeholder="Pick a date" />
                                </FormItem>
                            </div>
                            <div className="col-span-2 col-start-5 row-start-1">
                                <FormItem asterisk label="Type of Death">
                                    <Select
                                        placeholder="Select Type"
                                        options={deathType}
                                    />
                                </FormItem>
                            </div>
                            <div className="col-span-3 row-start-2">
                                <FormItem asterisk label="Deceased Mother Name">
                                    <Input
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        autoComplete="off"
                                    />
                                </FormItem>
                            </div>
                            <div className="col-span-3 col-start-4 row-start-2">
                                <FormItem asterisk label="Deceased Father Name">
                                    <Input
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        autoComplete="off"
                                    />
                                </FormItem>
                            </div>
                        </div>
                    </Card>
                    <div className="mt-2 grid grid-col-2 grid-row-1">
                        <div className="col-start-1 ml-2">
                            <Button variant="solid" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                        <div className="col-start-2  flex justify-end mr-2">
                            <Button variant="solid">Update</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default DeathForm
