import { Button, Card, DatePicker, FormItem, Input } from '@/components/ui'
import { useState } from 'react'
import { Form } from '@/components/ui/Form'
import { useNavigate } from 'react-router'

const MarriageForm = () => {
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
                <h2>Marriage Application</h2>

                <Form onSubmit={onSubmit}>
                    {/* SECTION: Marriage Information */}
                    <Card className="mt-4">
                        <h4 className="mb-6 ">Marriage Information</h4>

                        <div className="grid grid-cols-4 grid-rows-1 gap-2">
                            <div className="col-span-2">
                                <FormItem asterisk label="Date of Marriage">
                                    <DatePicker placeholder="Pick a date" />
                                </FormItem>
                            </div>
                            <div className="col-span-2">
                                <FormItem asterisk label="Place of Marriage">
                                    <Input placeholder="e.g. Nikol, Ahmedabad" />
                                </FormItem>
                            </div>
                        </div>
                        {/* SECTION: Parents Information */}
                        <h4 className="my-6 ">Parents Information</h4>
                        <div className="grid grid-cols-6 grid-rows-2 gap-2">
                            <div className="col-span-3 row-start-1">
                                <FormItem asterisk label="Bride's Mother Name">
                                    <Input
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        autoComplete="off"
                                    />
                                </FormItem>
                            </div>
                            <div className="col-span-3 col-start-4 row-start-1">
                                <FormItem asterisk label="Bride's Father Name">
                                    <Input
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        autoComplete="off"
                                    />
                                </FormItem>
                            </div>
                            <div className="col-span-3 row-start-2">
                                <FormItem asterisk label="Groom's Mother Name">
                                    <Input
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        autoComplete="off"
                                    />
                                </FormItem>
                            </div>
                            <div className="col-span-3 col-start-4 row-start-2">
                                <FormItem asterisk label="Groom's Father Name">
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

export default MarriageForm
