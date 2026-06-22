import { Button, FormItem, Input, Select, Upload, Card } from '@/components/ui'
import { useState } from 'react'
import { Form } from '@/components/ui/Form'
import { BiCheckShield } from 'react-icons/bi'
import { OtpInput } from '@/components/shared'
import { HiOutlineUser } from 'react-icons/hi'
import DateTimepicker from '@/components/ui/DatePicker/DateTimepicker'
import { genders } from '@/app/common/components/gender-list/genders'
import SlotSelection from '@/app/common/components/slot-booking/SlotSelection'

const birthdocuments = [
    { value: 'MotherAadhar', label: 'Mother AadharCard' },
    { value: 'FatherAadhar', label: 'Father AadharCard' },
    { value: 'RationCard', label: 'Ration Card' },
    { value: 'MedicalReport', label: 'Medical Card' },
    {
        value: 'ParentsMarriageCertificate',
        label: 'Parents Marriage Certificate',
    },
]

const BirthForm = () => {
    const [submitting, setSubmitting] = useState(false)

    const onSubmit = (values) => {
        setSubmitting(true)
        setTimeout(() => {
            window.alert(JSON.stringify(values))
            setSubmitting(false)
        }, 400)
    }
    return (
        <div className=" mt-12 px-2 ">
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
                                <DateTimepicker placeholder="pick a date and time" />
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
                        <div className="col-span-4 row-start-3">
                            <FormItem asterisk label="Place Of Birth">
                                <Input
                                    type="text"
                                    placeholder="e.g. Flat 101, Shree Residency, Sector 21, Gandhinagar, Gujarat"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-start-5 row-start-3">
                            <FormItem asterisk label="State">
                                <Select placeholder="Select State " />
                            </FormItem>
                        </div>
                        <div className="col-start-6 row-start-3">
                            <FormItem asterisk label="District">
                                <Select placeholder="Select District " />
                            </FormItem>
                        </div>
                    </div>
                </Card>
                {/* SECTION : parents information */}
                <Card className="mt-6">
                    <h4 className="mb-6">Parents Information</h4>
                    <div className="grid grid-cols-4 grid-rows-5 gap-2">
                        <div className="col-span-2">
                            <div className="flex gap-2 ">
                                <FormItem asterisk label="Mother Aadhar Id">
                                    <Input
                                        type="text"
                                        prefix={
                                            <HiOutlineUser className="text-lg" />
                                        }
                                        placeholder="e.g. 1234 1234 1234"
                                        autoComplete="off"
                                        className="w-108"
                                    />
                                </FormItem>
                                <Button
                                    variant="solid"
                                    type="button"
                                    className="mt-7"
                                >
                                    send
                                </Button>
                            </div>
                        </div>
                        <div className="col-span-2 col-start-3">
                            <div className="flex gap-2">
                                <FormItem asterisk label="Father Aadhar Id">
                                    <Input
                                        type="text"
                                        prefix={
                                            <HiOutlineUser className="text-lg" />
                                        }
                                        placeholder="e.g. 1234 1234 1234"
                                        autoComplete="off"
                                        className="w-108"
                                    />
                                </FormItem>
                                <Button
                                    variant="solid"
                                    type="button"
                                    className="mt-7"
                                >
                                    send
                                </Button>
                            </div>
                        </div>
                        {/* OTP field */}

                        <div className="col-span-2 row-start-2">
                            <h6 className="ml-6">OTP Verification</h6>
                            <p className="ml-6">
                                We have sent you One Time Password to your
                                email.
                            </p>
                            <div className="flex gap-2 justify-evenly">
                                <FormItem>
                                    <OtpInput
                                        placeholder=""
                                        inputClass="h-[54px]"
                                        length={6}
                                    />
                                </FormItem>
                                <Button
                                    variant="solid"
                                    className="h-14"
                                    type="button"
                                >
                                    <BiCheckShield className="h-7 w-5" />
                                </Button>
                            </div>
                            <div className=" text-center">
                                <span className="font-semibold">
                                    Didn&apos;t receive OTP?{' '}
                                </span>
                                <button
                                    className="heading-text font-bold underline"
                                    type="button"
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </div>
                        <div className="col-span-2 col-start-3 row-start-2">
                            {/* OTP field */}
                            <h6 className="ml-6">OTP Verification</h6>
                            <p className="ml-6">
                                We have sent you One Time Password to your
                                email.
                            </p>
                            <div className="flex gap-2 justify-evenly">
                                <FormItem>
                                    <OtpInput
                                        placeholder=""
                                        inputClass="h-[54px]"
                                        length={6}
                                    />
                                </FormItem>
                                <Button
                                    variant="solid"
                                    className="h-14"
                                    type="button"
                                >
                                    <BiCheckShield className="h-7 w-5" />
                                </Button>
                            </div>
                            <div className=" text-center">
                                <span className="font-semibold">
                                    Didn&apos;t receive OTP?{' '}
                                </span>
                                <button
                                    className="heading-text font-bold underline"
                                    type="button"
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </div>

                        {/* fields from aadharcard */}
                        <div className="col-span-2 row-start-3">
                            <FormItem asterisk label="Mother Name">
                                <Input
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 col-start-3 row-start-3">
                            <FormItem asterisk label="Father Name">
                                <Input
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 row-start-4">
                            <FormItem asterisk label="Mother Mobile Number">
                                <Input
                                    type="text"
                                    placeholder="e.g. 9876645633"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 col-start-3 row-start-4">
                            <FormItem asterisk label="Father Mobile Number">
                                <Input
                                    type="text"
                                    placeholder="e.g. 9876645633"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 row-start-5">
                            <FormItem asterisk label="Mother Email Id">
                                <Input
                                    type="email"
                                    placeholder="e.g. john.doe@example.com"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 col-start-3 row-start-5">
                            <FormItem asterisk label="Father Email Id">
                                <Input
                                    type="email"
                                    placeholder="e.g. john.doe@example.com"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-4 row-start-6">
                            <FormItem asterisk label="Perment Address">
                                <Input
                                    type="text"
                                    placeholder="e.g. Flat 101, Shree Residency, Sector 21, Gandhinagar, Gujarat"
                                />
                            </FormItem>
                        </div>
                    </div>
                </Card>
                {/* SECTION : upload documents */}
                <Card className="mt-6">
                    <h4 className="mb-6">Upload Documents</h4>

                    <FormItem asterisk label="Select & Upload">
                        <div className="grid grid-cols-5 grid-rows-1 gap-2">
                            <div className="col-span-4">
                                <Upload draggable />
                            </div>
                            <div className="col-start-5">
                                <Select
                                    placeholder="choose document"
                                    options={birthdocuments}
                                />
                            </div>
                        </div>
                    </FormItem>
                </Card>

                {/* SECTION : verification slot selection */}
                <SlotSelection />
            </Form>
        </div>
    )
}
export default BirthForm
