import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import Select from '@/components/ui/Select'
import OtpInput from '@/components/shared/OtpInput'
import { HiOutlineUser } from 'react-icons/hi'
import { genders } from '@/app/common/components/gender-list/genders'
//icon import
import { BiCheckShield } from 'react-icons/bi'
//otp imports
import { DatePicker } from '@/components/ui'
//for upload
import Upload from '@/components/ui/Upload'

const SignUpForm = () => {
    const [submitting, setSubmitting] = useState(false)

    const onSubmit = (values) => {
        setSubmitting(true)
        setTimeout(() => {
            window.alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
        }, 400)
    }

    return (
        <Form className="w-xl" onSubmit={onSubmit}>
            <div className="flex flex-row gap-2">
                <FormItem asterisk label="Aadhar Id">
                    <Input
                        type="text"
                        prefix={<HiOutlineUser className="text-lg" />}
                        placeholder="e.g. 1234 1234 1234"
                        autoComplete="off"
                        className="w-[calc(60dvh)]"
                    />
                </FormItem>
                <Button variant="solid" type="button" className="mt-7">
                    send
                </Button>
            </div>
            {/* OTP field */}
            <div className="flex flex-col gap-2 justify-center items-center">
                <div>
                    <h6 className="mb-0">OTP Verification</h6>
                    <p>We have sent you One Time Password to your email.</p>
                </div>
                <div className="flex gap-2">
                    <FormItem>
                        <OtpInput
                            placeholder=""
                            inputClass="h-[58px]"
                            length={6}
                        />
                    </FormItem>
                    <Button variant="solid" className="h-14" type="button">
                        <BiCheckShield className="h-7 w-5" />
                    </Button>
                </div>
                <div className="text-center">
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
            <FormItem
                asterisk
                label="Select Your Working Locations"
                className="mt-2"
            >
                <div className="flex gap-2  justify-evenly ">
                    <Select placeholder="Select District" />
                    <Select placeholder="Select Office" />
                    <Select placeholder="Select Department" />
                </div>
            </FormItem>
            <FormItem asterisk label="Employee Id">
                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="e.g. 873524150909"
                        autoComplete="off"
                    />
                </div>
            </FormItem>
            <FormItem asterisk label="User name">
                <Input
                    type="text"
                    placeholder="e.g. John Doe"
                    autoComplete="off"
                />
            </FormItem>
            <FormItem asterisk label="Gender">
                <Select placeholder="Please Select gender" options={genders} />
            </FormItem>
            <FormItem asterisk label="DOB">
                <DatePicker type="date" />
            </FormItem>
            <FormItem asterisk label="Mobile Number">
                <Input type="text" placeholder="e.g. 9876645633" />
            </FormItem>
            <FormItem asterisk label="Email">
                <Input type="email" placeholder="e.g. john.doe@gmail.com" />
            </FormItem>
            <div className="flex flex-row w-full space-x-12">
                <FormItem asterisk label="State">
                    <Select placeholder="Select State " />
                </FormItem>
                <FormItem asterisk label="District">
                    <Select placeholder="Select District  " />
                </FormItem>
                <FormItem asterisk label="Office">
                    <Select placeholder="Select Office  " />
                </FormItem>
            </div>
            <FormItem asterisk label="Aadhar card: ">
                <Upload draggable />
            </FormItem>
            <FormItem asterisk label="Signature:">
                <Upload draggable />
            </FormItem>
            <FormItem asterisk label="GOV Employee Id Card:">
                <Upload draggable />
            </FormItem>

            <Button block variant="solid" type="submit" loading={submitting}>
                Submit
            </Button>
        </Form>
    )
}

export default SignUpForm
