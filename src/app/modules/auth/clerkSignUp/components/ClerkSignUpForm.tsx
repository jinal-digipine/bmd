import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import Select from '@/components/ui/Select'
import OtpInput from '@/components/shared/OtpInput'
import { HiOutlineUser, HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'
// for password only
import type { MouseEvent } from 'react'
//icon import
import { BiCheckShield } from 'react-icons/bi'
//otp imports
import { DatePicker } from '@/components/ui'
//for upload
import Upload from '@/components/ui/Upload'

const genders = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
]
const districtOptions = [
    { value: 'Ahmedabad', label: 'Ahmedabad' },
    { value: 'Amreli', label: 'Amreli' },
    { value: 'Anand', label: 'Anand' },
    { value: 'Aravalli', label: 'Aravalli' },
    { value: 'Banaskantha', label: 'Banaskantha' },
    { value: 'Bharuch', label: 'Bharuch' },
    { value: 'Bhavnagar', label: 'Bhavnagar' },
    { value: 'Botad', label: 'Botad' },
    { value: 'Chhota Udaipur', label: 'Chhota Udaipur' },
    { value: 'Dahod', label: 'Dahod' },
]
const officeOptions = [
    { value: 'office1', label: 'office1' },
    { value: 'office2', label: 'office2' },
    { value: 'office3', label: 'office3' },
    { value: 'office4', label: 'office4' },
    { value: 'office5', label: 'office5' },
    { value: 'office6', label: 'office6' },
    { value: 'office7', label: 'office7' },
    { value: 'office8', label: 'office8' },
    { value: 'office9', label: 'office9' },
    { value: 'office10', label: 'office10' },
]
const departmentOptions = [
    { value: 'birth', label: 'Birth' },
    { value: 'merriage', label: 'Marriage' },
    { value: 'death', label: 'Death' },
]
const SignUpForm = () => {
    const [submitting, setSubmitting] = useState(false)

    //password visible-notvisible

    const onSubmit = (values) => {
        setSubmitting(true)
        setTimeout(() => {
            window.alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
        }, 400)
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <FormItem asterisk label="Aadhar Id">
                    <div className="flex gap-2">
                        <Input
                            type="text"
                            prefix={<HiOutlineUser className="text-lg" />}
                            placeholder="e.g. 1234 1234 1234"
                            autoComplete="off"
                        />

                        <Button variant="solid" type="button">
                            send
                        </Button>
                    </div>
                </FormItem>
                {/* OTP field */}
                <div>
                    <div className="mb-8">
                        <h6 className="mb-2">OTP Verification</h6>
                        <p className="font-semibold heading-text">
                            We have sent you One Time Password to your email.
                        </p>
                    </div>

                    <FormItem>
                        <div className="flex gap-2">
                            <OtpInput
                                placeholder=""
                                inputClass="h-[58px]"
                                length={6}
                            />
                            <Button
                                variant="solid"
                                className="h-14"
                                type="button"
                            >
                                <BiCheckShield className="h-7 w-5" />
                            </Button>
                        </div>
                    </FormItem>
                    <div className="mt-4 text-center">
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
                    <div className="flex gap-2 ">
                        <Select
                            placeholder="Select District"
                            options={districtOptions}
                        />
                        <Select
                            placeholder="Select Office"
                            options={officeOptions}
                        />
                        <Select
                            placeholder="Select Department"
                            options={departmentOptions}
                        />
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
                        placeholder="e.g. Jin Patel"
                        autoComplete="off"
                    />
                </FormItem>
                <FormItem asterisk label="Gender">
                    <Select placeholder="Please Select" options={genders} />
                </FormItem>
                <FormItem asterisk label="DOB">
                    <DatePicker type="date" />
                </FormItem>
                <FormItem asterisk label="Mobile Number">
                    <Input type="text" placeholder="e.g. 9876645633" />
                </FormItem>
                <FormItem asterisk label="Email">
                    <Input type="email" placeholder="e.g. jin21@gmail.com" />
                </FormItem>

                <FormItem asterisk label="Aadhar card: " className="flex-row ">
                    <Upload className="pl-20" />
                </FormItem>
                <FormItem asterisk label="Signature:" className="flex-row ">
                    <Upload className="pl-24" />
                </FormItem>
                <FormItem
                    asterisk
                    label="GOV Employee Id Card:"
                    className="flex-row "
                >
                    <Upload className="pl-3" />
                </FormItem>

                <Button
                    block
                    variant="solid"
                    type="submit"
                    loading={submitting}
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default SignUpForm
