import { useState } from 'react'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import OtpInput from '@/components/shared/OtpInput'
import { HiOutlineUser, HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'
import type { MouseEvent } from 'react'

import { Auth } from '@/app/@api/auth/auth.types'
import { AuthApiService } from '@/app/@api/auth/authT.api'
import { useNavigate } from 'react-router'
import { BiCheckShield } from 'react-icons/bi'
import { Input, Notification, toast } from '@/components/ui'
import { Aadhar } from '@/app/@api/aadhar/aadhar.types'

type SignUpFormSchema = {
    aadharNumber: string
    otp: string
    password: string
    email: string
    verificationToken?: string
}

const validationSchema: ZodType<SignUpFormSchema> = z.object({
    aadharNumber: z
        .string()
        .min(12, { message: 'Too short.' })
        .max(12, { message: 'Too long' }),
    otp: z.string().min(6, { message: 'Please enter a valid OTP' }),
    email: z.string({ required_error: 'Please enter your email' }).min(4),
    password: z
        .string({ required_error: 'Password Required' })
        .min(8, { message: 'Password must contain at least 8 letters' }),
    verificationToken: z.string().optional(),
})

const SignUpFormNew = () => {
    const navigate = useNavigate()
    const [aadharData, setAadharData] = useState<Aadhar.Base | null>(null)
    const [pwInputType, setPwInputType] = useState('password')

    const {
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
        control,
    } = useForm<SignUpFormSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            aadharNumber: '',
            otp: '',
            email: '',
            password: '',
            verificationToken: '',
        },
    })

    const requestOtp = async () => {
        try {
            const resp = await AuthApiService.requestOtp({
                aadharNumber: getValues('aadharNumber'),
            })

            const verify =
                resp.data?.verificationToken || resp['verificationToken']

            if (verify) {
                setValue('verificationToken', verify)
            }
        } catch (err) {
            alert('error in req otp' + err)
        }
    }

    const verifyOtp = async () => {
        try {
            const response = await AuthApiService.verifyOtp({
                aadharNumber: getValues('aadharNumber'),
                otp: getValues('otp'),
            })

            const aadata =
                response.data?.aadharDetails || response['aadharDetails']

            if (aadata) {
                setAadharData(aadata)
            }
        } catch (error) {
            alert('error in req otp' + error)
        }
    }
    const onSubmit = async (values: SignUpFormSchema) => {
        if (!values.verificationToken) {
            alert('there is no verification token')
            return
        }

        try {
            const payloadofsignup: Auth.Apis.UserSignUpPayload = {
                aadharNumber: values.aadharNumber,
                verificationToken: values.verificationToken,
                email: values.email,
                password: values.password,
                role: 'user',
            }

            const res = await AuthApiService.signUpUser(payloadofsignup)
            if (res) {
                toast.push(
                    <Notification closable type="success" duration={3000}>
                        User Registerd Successfully.
                    </Notification>,
                )
            }
            navigate('/my/sign-in')
        } catch {
            toast.push(
                <Notification closable type="danger" duration={3000}>
                    Failed to Registerd User!
                </Notification>,
            )
        }
    }

    const onPasswordVisibleClick = (e: MouseEvent) => {
        e.preventDefault()
        setPwInputType(pwInputType === 'password' ? 'text' : 'password')
    }

    const inputIcon = (
        <span className="cursor-pointer" onClick={onPasswordVisibleClick}>
            {pwInputType === 'password' ? (
                <HiOutlineEyeOff />
            ) : (
                <HiOutlineEye />
            )}
        </span>
    )

    return (
        <div>
            <Form
                className="w-lg min-h-full overflow-visible"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex space-x-6 items-center justify-center">
                    <FormItem
                        asterisk
                        label="Aadhar Id"
                        invalid={Boolean(errors.aadharNumber)}
                        errorMessage={errors.aadharNumber?.message}
                    >
                        <Controller
                            name="aadharNumber"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    prefix={
                                        <HiOutlineUser className="text-lg" />
                                    }
                                    placeholder=" Enter Your Aadhar Id"
                                    autoComplete="off"
                                    className="w-[calc(54dvh)]"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <Button
                        type="button"
                        variant="solid"
                        className="h-[48px]"
                        onClick={requestOtp}
                    >
                        Send
                    </Button>
                </div>

                {/* OTP field */}
                <div>
                    <div className="mb-8">
                        <h5 className="mb-2">OTP Verification</h5>
                        <p className="font-semibold heading-text">
                            We have sent you One Time Password to your email.
                        </p>
                    </div>

                    <div className="flex space-x-8">
                        <FormItem
                            invalid={Boolean(errors.otp)}
                            errorMessage={errors.otp?.message}
                        >
                            <Controller
                                name="otp"
                                control={control}
                                render={({ field }) => (
                                    <OtpInput
                                        placeholder=""
                                        inputClass="h-[58px]"
                                        length={6}
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem>
                        <Button
                            block
                            variant="solid"
                            type="button"
                            className="h-[58px] flex items-center justify-center"
                            onClick={verifyOtp}
                        >
                            <BiCheckShield className="w-9 h-9" />
                        </Button>
                    </div>
                    <div className="mt-4 text-center">
                        <span className="font-semibold">
                            Didn&apos;t receive OTP?{' '}
                        </span>
                        <button
                            type="button"
                            className="heading-text font-bold underline"
                            onClick={requestOtp}
                        >
                            Resend OTP
                        </button>
                    </div>
                </div>
                {/* if data comes then only show this parts */}
                {aadharData && (
                    <div className=" space-y-4 ">
                        <div>
                            <p className="font-semibold  mb-1">User Name</p>
                            <p className="p-3  rounded-xl bg-gray-100 font-semibold text-black hover: cursor-not-allowed">
                                {`${aadharData.firstName} ${aadharData.middleName} ${aadharData.lastName}`.trim()}
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold mb-1">Mobile Number</p>
                            <p className="p-3  rounded-xl bg-gray-100 text-black font-semibold my-4 hover: cursor-not-allowed">
                                {aadharData.contact}
                            </p>
                        </div>
                    </div>
                )}

                <FormItem
                    asterisk
                    label="Email"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="email"
                                placeholder="e.g. john.doe@gmail.com"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    asterisk
                    label="Password"
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type={pwInputType}
                                suffix={inputIcon}
                                placeholder="Enter a strong password"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <Button block variant="solid" type="submit">
                    Sign-up
                </Button>
            </Form>
        </div>
    )
}

export default SignUpFormNew
