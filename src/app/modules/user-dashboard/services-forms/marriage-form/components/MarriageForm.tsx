import SlotSelection from '@/app/common/components/slot-booking/SlotSelection'
import { OtpInput } from '@/components/shared'
import {
    Button,
    Card,
    DatePicker,
    FormItem,
    Input,
    Select,
    Upload,
} from '@/components/ui'
import { useState } from 'react'
import { BiCheckShield } from 'react-icons/bi'
import { HiOutlineUser } from 'react-icons/hi'
import { Form } from '@/components/ui/Form'
import { genders } from '@/app/common/components/gender-list/genders'

const marriagedocuments = [
    { value: 'BrideAadhar', label: 'Bride AadharCard' },
    { value: 'GroomAadhar', label: 'Groom AadharCard' },
    { value: 'BrideRationCard', label: 'Bride Ration Card' },
    { value: 'GroomRationCard', label: 'Groom Ration Card' },
    { value: 'WitnessAadharCard', label: 'Witness Aadhar Card' },
    { value: 'PriestAadharCard', label: 'Priest Aadhar Card' },
    { value: 'InvitationCard', label: 'Invitation Card' },
    { value: 'BridePhoto', label: 'Bride Photograph' },
    { value: 'GroomPhoto', label: 'Groom Photograph' },
]

const MarriageForm = () => {
    const [submitting, setSubmitting] = useState(false)

    const onSubmit = (values) => {
        setSubmitting(true)
        setTimeout(() => {
            window.alert(JSON.stringify(values))
            setSubmitting(false)
        }, 400)
    }

    return (
        <div className="mt-12 px-2">
            <div className="grid grid-cols-5 grid-rows-1 gap-4">
                <div className="col-span-3">
                    <h2>Marriage Application</h2>
                </div>
            </div>

            <Form onSubmit={onSubmit}>
                {/* SECTION : Bride's information  */}
                <Card className="mt-4">
                    <h4 className="mb-6 ">Bride&apos;s Information</h4>
                    <div className="grid grid-cols-6 grid-rows-4 gap-2">
                        <div className="col-span-3">
                            <div className="flex gap-2">
                                <FormItem asterisk label="Bride Aadhar Id">
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
                            <FormItem asterisk label="Bride Name">
                                <Input
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-1 col-start-3   row-start-2">
                            <FormItem asterisk label="Gender">
                                <Select
                                    placeholder="Please Select"
                                    options={genders}
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-3 col-start-4 row-start-2">
                            <FormItem asterisk label="Bride's Address">
                                <Input
                                    type="text"
                                    placeholder="e.g. Flat 101, Shree Residency, Sector 21, Gandhinagar, Gujarat"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 row-start-3">
                            <FormItem asterisk label="Bride Email Id">
                                <Input
                                    type="email"
                                    placeholder="e.g. john.doe@example.com"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 col-start-3 row-start-3">
                            <FormItem asterisk label="Bride Mobile Number">
                                <Input
                                    type="text"
                                    placeholder="e.g. 9876645633"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 col-start-5 row-start-3">
                            <FormItem asterisk label="Date of Birth">
                                <DatePicker placeholder="Pick a date" />
                            </FormItem>
                        </div>
                        <div className="col-span-3 row-start-4">
                            <FormItem asterisk label="Bride's Mother Name">
                                <Input
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-3 col-start-4 row-start-4">
                            <FormItem asterisk label="Bride's Father Name">
                                <Input
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                    </div>
                </Card>
                {/* SECTION : Groom's information  */}
                <Card className="mt-4">
                    <h4 className="mb-6 ">Groom&apos;s Information</h4>
                    <div className="grid grid-cols-6 grid-rows-4 gap-2">
                        <div className="col-span-3">
                            <div className="flex gap-2">
                                <FormItem asterisk label="Groom Aadhar Id">
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
                        <div className="col-span-2 row-start-2">
                            <FormItem asterisk label="Groom Name">
                                <Input
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-1 col-start-3 row-start-2">
                            <FormItem asterisk label="Gender">
                                <Select
                                    placeholder="Please Select"
                                    options={genders}
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-3 col-start-4 row-start-2">
                            <FormItem asterisk label="Groom's Address">
                                <Input
                                    type="text"
                                    placeholder="e.g. Flat 101, Shree Residency, Sector 21, Gandhinagar, Gujarat"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 row-start-3">
                            <FormItem asterisk label="Groom Email Id">
                                <Input
                                    type="email"
                                    placeholder="e.g. john.doe@example.com"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 col-start-3 row-start-3">
                            <FormItem asterisk label="Groom Mobile Number">
                                <Input
                                    type="text"
                                    placeholder="e.g. 9876645633"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 col-start-5 row-start-3">
                            <FormItem asterisk label="Date of Birth">
                                <DatePicker placeholder="Pick a date" />
                            </FormItem>
                        </div>
                        <div className="col-span-3 row-start-4">
                            <FormItem asterisk label="Groom's Mother Name">
                                <Input
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-3 col-start-4 row-start-4">
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
                {/* SECTION: Marriage Information */}
                <Card className="mt-4">
                    <h4 className="mb-6 ">Marriage Information</h4>

                    <div className="grid grid-cols-4 grid-rows-1 gap-2">
                        <div>
                            <FormItem asterisk label="Date of Marriage">
                                <DatePicker placeholder="Pick a date" />
                            </FormItem>
                        </div>
                        <div className="col-span-1">
                            <FormItem asterisk label="Place of Marriage">
                                <Input placeholder="e.g. Nikol, Ahmedabad" />
                            </FormItem>
                        </div>
                        <div className="col-start-3">
                            <FormItem asterisk label="State">
                                <Select placeholder="state" />
                            </FormItem>
                        </div>
                        <div className="col-start-4">
                            <FormItem asterisk label="District">
                                <Select placeholder="District" />
                            </FormItem>
                        </div>
                    </div>
                </Card>
                {/* SECTION : Witness's information  */}
                <Card className="mt-4">
                    <h4 className="mb-6 ">Witness&apos;s Information</h4>

                    <div className="grid grid-cols-6 grid-rows-3 gap-2">
                        <div className="col-span-3">
                            <div className="flex gap-2 ">
                                <FormItem asterisk label=" Witness Aadhar Id">
                                    <Input
                                        type="text"
                                        prefix={
                                            <HiOutlineUser className="text-lg" />
                                        }
                                        placeholder="e.g. 1234 1234 1234"
                                        autoComplete="off"
                                        className="w-107 mt-4"
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
                            <FormItem asterisk label="Witness Name">
                                <Input
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 col-start-3 row-start-2">
                            <FormItem asterisk label="Witness Mobile No">
                                <Input
                                    type="text"
                                    placeholder="e.g. 9876645633"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 col-start-5 row-start-2">
                            <FormItem asterisk label="Witness Relation ">
                                <Input
                                    type="text"
                                    placeholder="e.g. cousin"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 row-start-3">
                            <FormItem asterisk label="Witness Email Id">
                                <Input
                                    type="email"
                                    placeholder="e.g. john.doe@example.com"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 col-start-3 row-start-3">
                            <FormItem asterisk label="Gender">
                                <Select
                                    placeholder="choose Gender"
                                    options={genders}
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 col-start-5 row-start-3">
                            <FormItem asterisk label="Witness's Address">
                                <Input
                                    type="text"
                                    placeholder="e.g. Flat 101, Shree Residency, Sector 21, Gandhinagar, Gujarat"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                    </div>
                </Card>
                {/* SECTION : Priest's information  */}
                <Card className="mt-4">
                    <h4 className="mb-6 ">Priest&apos;s Information</h4>

                    <div className="grid grid-cols-6 grid-rows-2 gap-2">
                        <div className="col-span-3">
                            <div className="flex gap-2 ">
                                <FormItem
                                    asterisk
                                    label="Priest's Witness Aadhar Id"
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
                        <div className="col-span-3 row-start-2">
                            <FormItem asterisk label="Priest's Name">
                                <Input
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    autoComplete="off"
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-3 col-start-4 row-start-2">
                            <FormItem asterisk label=" Priest's Mobile No">
                                <Input
                                    type="text"
                                    placeholder="e.g. 9876645633"
                                />
                            </FormItem>
                        </div>
                    </div>
                </Card>
                {/* SECTION : Upload Documents  */}
                <Card className="mt-4">
                    <h4 className="mb-6 ">Upload Documents</h4>
                    <FormItem asterisk label="Select & Upload">
                        <div className="grid grid-cols-5 grid-rows-1 gap-4">
                            <div className="col-span-4">
                                <Upload draggable />
                            </div>
                            <div className="col-start-5">
                                <Select
                                    placeholder="choose document"
                                    options={marriagedocuments}
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

export default MarriageForm
