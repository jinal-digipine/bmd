import {
    Button,
    FormItem,
    Select,
    Card,
    DatePicker,
    Alert,
} from '@/components/ui'

const SlotSelection = () => {
    return (
        <Card className="mt-6 mb-5">
            <h4 className="mb-6">Select Verification Slot</h4>
            <Card>
                <h5 className="text-amber-700">Important Notice</h5>
                <p className="text-'${mode === MODE_LIGHT ? 'black' : 'white'}'  mt-3">
                    Please select your verification slot carefully. Once your
                    application is submitted, the selected slot cannot be
                    changed or rescheduled.
                </p>
                <p className="text-'${mode === MODE_LIGHT ? 'black' : 'white'}'  mt-3">
                    You must attend the online video verification meeting at the
                    selected date and time. Failure to join the meeting will
                    result in rejection of your application.
                </p>
                <p className="text-'${mode === MODE_LIGHT ? 'black' : 'white'}'  mt-3">
                    Certificate issuance is subject to successful verification
                    and approval by the assigned clerk.
                </p>
            </Card>
            <div className="grid grid-cols-4 grid-rows-1 gap-2 mt-4">
                <div className="col-span-2">
                    <FormItem asterisk label="Pick Verification Date & Time">
                        <DatePicker placeholder="Pick a date" />
                    </FormItem>
                </div>
                <div className="col-span-2 col-start-3 mt-7">
                    <Select placeholder="Pick a time slot" />
                </div>
            </div>
            <Alert showIcon>
                Slot can not be changed after submission. Missing it will result
                in application rejection.
            </Alert>

            <div className="mt-4 flex justify-center ">
                <Button variant="solid" type="submit">
                    Submit Application
                </Button>
            </div>
        </Card>
    )
}

export default SlotSelection
// loading={submitting}
