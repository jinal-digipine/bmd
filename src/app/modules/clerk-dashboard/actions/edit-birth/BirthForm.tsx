import { FormItem, Input, Select, Card, Button } from '@/components/ui'
import { useState } from 'react'
import { Form } from '@/components/ui/Form'

import DateTimepicker from '@/components/ui/DatePicker/DateTimepicker'
import { genders } from '@/app/common/components/gender-list/genders'
import { useNavigate } from 'react-router'

const BirthForm = () => {
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleCancel = () => {
        navigate('/app/clerk/applications')
    }
    const onSubmit = (values) => {
        setSubmitting(true)
        setTimeout(() => {
            window.alert(JSON.stringify(values))
            setSubmitting(false)
        }, 400)
    }
    return (
        <div className="flex  justify-center items-center px-4">
            <div className="w-full max-w-6xl mx-auto">
                <h2>Birth Application</h2>

                <Form onSubmit={onSubmit}>
                    {/* SECTION : baby's information  */}
                    <Card className="mt-4">
                        <h4 className="mb-6 ">Baby&apos;s Information</h4>
                        <div className="grid grid-cols-6 grid-rows-3 gap-2">
                            <div className="col-span-6">
                                <FormItem asterisk label="Baby Name">
                                    <Input
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        autoComplete="off"
                                    />
                                </FormItem>
                            </div>
                            <div className="col-span-2 row-start-2">
                                <FormItem asterisk label="Date & Time of Birth">
                                    <DateTimepicker placeholder="Pick a date and time" />
                                </FormItem>
                            </div>
                            <div className="col-span-2 col-start-3 row-start-2">
                                <FormItem asterisk label="Baby's Birth Weight">
                                    <Input
                                        type="number"
                                        placeholder="e.g. 3.4 (in kg) "
                                        autoComplete="off"
                                    />
                                </FormItem>
                            </div>
                            <div className="col-span-2 col-start-5 row-start-2">
                                <FormItem asterisk label="Gender">
                                    <Select
                                        placeholder="Please Select"
                                        options={genders}
                                    />
                                </FormItem>
                            </div>
                            <div className="col-span-6 row-start-3">
                                <FormItem asterisk label="Place Of Birth">
                                    <Input
                                        type="text"
                                        placeholder="e.g. Flat 101, Shree Residency, Sector 21, Gandhinagar, Gujarat"
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
export default BirthForm
