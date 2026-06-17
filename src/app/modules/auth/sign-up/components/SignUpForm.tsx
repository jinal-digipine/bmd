import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import OtpInput from '@/components/shared/OtpInput'
import { HiOutlineUser, HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'
// for password only
import type { MouseEvent } from 'react'
import { BiCheckShield } from 'react-icons/bi'

const SignUpForm = () => {
    //for password
    const [pwInputType, setPwInputType] = useState('password')
    const [submitting, setSubmitting] = useState(false)

    const onPasswordVisibleClick = (e: MouseEvent) => {
        e.preventDefault()
        setPwInputType(pwInputType === 'password' ? 'text' : 'password')
    }

    const inputIcon = (
        <span
            className="cursor-pointer"
            onClick={(e) => onPasswordVisibleClick(e)}
        >
            {pwInputType === 'password' ? (
                <HiOutlineEyeOff />
            ) : (
                <HiOutlineEye />
            )}
        </span>
    )

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
                <div className="md:flex  gap-2">
                    <FormItem asterisk label="Aadhar Id">
                        <Input
                            type="text"
                            prefix={<HiOutlineUser className="text-lg" />}
                            placeholder="e.g. 1234 1234 1234"
                            autoComplete="off"
                            className="w-93"
                        />
                    </FormItem>
                    <Button variant="solid" type="button" className="mt-7">
                        send
                    </Button>
                </div>
                {/* OTP field */}
                <div>
                    <div className="mb-8">
                        <h6 className="mb-2">OTP Verification</h6>
                        <p>We have sent you OTP to your email.</p>
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
                    <div className=" text-center">
                        <span className="font-semibold">
                            Din&apos;t receive OTP?{' '}
                        </span>
                        <button
                            className="heading-text font-bold underline"
                            type="button"
                        >
                            Resend OTP
                        </button>
                    </div>
                </div>

                <FormItem asterisk label="User name">
                    <Input
                        type="text"
                        placeholder="e.g. Jin Patel"
                        autoComplete="off"
                    />
                </FormItem>
                <FormItem asterisk label="Mobile Number">
                    <Input type="text" placeholder="e.g. 9876645633" />
                </FormItem>
                <FormItem asterisk label="Email">
                    <Input type="email" placeholder="e.g. jin21@gmail.com" />
                </FormItem>
                <FormItem asterisk label="Password">
                    <Input
                        type={pwInputType}
                        suffix={inputIcon}
                        placeholder="Enter atleast 8-digit strong password"
                    />
                </FormItem>
                <FormItem asterisk label="Confirm Password">
                    <Input
                        type={pwInputType}
                        suffix={inputIcon}
                        placeholder="Confirm Password"
                    />
                </FormItem>
                <Button
                    block
                    variant="solid"
                    type="submit"
                    loading={submitting}
                >
                    Create Account
                </Button>
            </Form>
        </div>
    )
}

export default SignUpForm
