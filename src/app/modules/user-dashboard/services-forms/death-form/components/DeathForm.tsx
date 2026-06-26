import { genders } from '@/app/common/components/gender-list/genders'
import SlotSelection from '@/app/common/components/slot-booking/SlotSelection'
import { OtpInput } from '@/components/shared'
import {
    Button,
    Card,
    DatePicker,
    Form,
    FormItem,
    Input,
    Select,
    Upload,
} from '@/components/ui'
import { useState } from 'react'
import { BiCheckShield } from 'react-icons/bi'
import { HiOutlineUser } from 'react-icons/hi'

const deathdocuments = [
    { value: 'DeceasedAadharCard', label: 'Deceased Aadhar Card' },
    { value: 'ApplicantAadharCard', label: 'Applicant Aadhar Card' },
    { value: 'DeceasedRationCard', label: 'Deceased Ration Card' },
    { value: 'MedicalReport', label: 'Medical Report' },
    { value: 'PMReport', label: 'PM Report' },
    { value: 'DeceasedPhoto', label: 'Deceased Photograph' },
    { value: 'FIR', label: 'FIR' },
]

const deathType = [
    { value: 'Natural', label: 'Natural' },
    { value: 'Un-natural', label: 'Unnatural' },
]

const DeathForm = () => {
    const [submitting, setSubmitting] = useState(false)

    const onSubmit = (values) => {
        setSubmitting(true)
        setTimeout(() => {
            window.alert(JSON.stringify(values))
            setSubmitting(false)
        }, 400)
    }
    return (
        <div className="max-w-6xl">
            <h2>Death Application</h2>
            <Form onSubmit={onSubmit}>
                {/* SECTION : Deceased's information  */}
                <Card className="mt-4">
                    <h4 className="mb-6 ">Deceased&apos;s Information</h4>
                    <div className="grid grid-cols-6 grid-rows-5 gap-2">
                        <div className="col-span-3">
                            <div className="flex gap-2">
                                <FormItem asterisk label="Deceased Aadhar Id">
                                    <Input
                                        type="text"
                                        prefix={
                                            <HiOutlineUser className="text-lg" />
                                        }
                                        placeholder="e.g. 1234 1234 1234"
                                        autoComplete="off"
                                        className="w-108 mt-4"
                                    />
                                </FormItem>
                                <Button
                                    variant="solid"
                                    type="button"
                                    className="mt-11"
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                        <div className="col-span-3 col-start-4">
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
                            <div className="text-center">
                                <span className="font-semibold">
                                    Didn&apos;t receive OTP?
                                </span>
                                <button
                                    className="heading-text font-bold underline"
                                    type="button"
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </div>
                        <div className="col-span-3 row-start-2">
                            <FormItem asterisk label="Deceased Name">
                                <Input
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 col-start-4 row-start-2">
                            <FormItem asterisk label="Date of Birth">
                                <DatePicker placeholder="Pick a date" />
                            </FormItem>
                        </div>
                        <div className="col-start-6 row-start-2">
                            <FormItem asterisk label="Gender">
                                <Select
                                    placeholder="Please Select"
                                    options={genders}
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 row-start-3">
                            <FormItem asterisk label="Place of Death">
                                <Input
                                    type="text"
                                    placeholder="e.g. Civil Hospital, Ahmedabad"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 col-start-3 row-start-3">
                            <FormItem asterisk label="Date of Death">
                                <DatePicker placeholder="Pick a date" />
                            </FormItem>
                        </div>
                        <div className="col-span-2 col-start-5 row-start-3">
                            <FormItem asterisk label="Type of Death">
                                <Select
                                    placeholder="Select Type"
                                    options={deathType}
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-3 row-start-4">
                            <FormItem asterisk label="Deceased Mother Name">
                                <Input
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-3 col-start-4 row-start-4">
                            <FormItem asterisk label="Deceased Father Name">
                                <Input
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-4 row-start-5">
                            <FormItem
                                asterisk
                                label="Deceased Permanent Address"
                            >
                                <Input
                                    type="text"
                                    placeholder="e.g. Flat 101, Shree Residency, Sector 21, Gandhinagar, Gujarat"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-start-5 row-start-5">
                            <FormItem asterisk label="State">
                                <Select placeholder="Select State" />
                            </FormItem>
                        </div>
                        <div className="col-start-6 row-start-5">
                            <FormItem asterisk label="District">
                                <Select placeholder="Select District" />
                            </FormItem>
                        </div>
                    </div>
                </Card>
                {/* SECTION : Applicant's information  */}
                <Card className="mt-4">
                    <h4 className="mb-6 ">Applicant&apos;s Information</h4>

                    <div className="grid grid-cols-6 grid-rows-3 gap-2">
                        <div className="col-span-3">
                            <div className="flex gap-2 ">
                                <FormItem
                                    asterisk
                                    label="Applicant's Aadhar Id"
                                >
                                    <Input
                                        type="text"
                                        prefix={
                                            <HiOutlineUser className="text-lg" />
                                        }
                                        placeholder="e.g. 1234 1234 1234"
                                        autoComplete="off"
                                        className="w-108 mt-4"
                                    />
                                </FormItem>
                                <Button
                                    variant="solid"
                                    type="button"
                                    className="mt-11"
                                >
                                    send
                                </Button>
                            </div>
                        </div>
                        <div className="col-span-3 col-start-4">
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
                        <div className="col-span-2 row-start-2">
                            <FormItem asterisk label="Name">
                                <Input
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>

                        <div className="col-span-2 col-start-3 row-start-2">
                            <FormItem asterisk label="Date of Birth">
                                <DatePicker placeholder="Pick a date" />
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
                        <div className="col-span-2 row-start-3">
                            <FormItem asterisk label="Mobile No.">
                                <Input
                                    type="text"
                                    placeholder="e.g. 9876645633"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 col-start-3 row-start-3">
                            <FormItem asterisk label="Email Id">
                                <Input
                                    type="email"
                                    placeholder="e.g. john.doe@example.com"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 col-start-5 row-start-3">
                            <FormItem asterisk label="Address">
                                <Input placeholder="e.g. Flat 101, Shree Residency, Sector 21, Gandhinagar, Gujarat" />
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
                                    options={deathdocuments}
                                />
                            </div>
                        </div>
                    </FormItem>
                </Card>
                {/* SECTION : Verification Slot Selection */}
                <SlotSelection />
            </Form>
        </div>
    )
}

export default DeathForm
