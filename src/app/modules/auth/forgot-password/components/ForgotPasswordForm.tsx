import Button from '@/components/ui/Button'
import { useState } from 'react'
import { FormItem, Form } from '@/components/ui/Form'
import { Input, Notification, toast } from '@/components/ui'
import { useNavigate } from 'react-router'
import { AuthApiService } from '@/app/@api/auth/authT.api'
import { Auth } from '@/app/@api/auth/auth.types'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import { OtpInput } from '@/components/shared'

type ForgotPasswordFormSchema = {
    email: string
    otp: string
    resetToken?: string
}

const validationSchema: ZodType<ForgotPasswordFormSchema> = z.object({
    email: z
        .string({ required_error: 'Please enter your email' })
        .min(3, { message: 'Please enter your email' }),
    otp: z.string().min(6, { message: 'Please enter a valid OTP' }),
    resetToken: z.string().optional(),
})

const ForgotPasswordForm = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [resetToken, setResetToken] = useState('')

    const navigate = useNavigate()

    const sendOTP = async () => {
        const email = getValues('email')
        try {
            const res = await AuthApiService.forgotPassword({ email })

            if (res) {
                toast.push(
                    <Notification closable type="success" duration={3000}>
                        OTP sent successfully! Please check your email to verify
                        your account.
                    </Notification>,
                )
            }
        } catch {
            toast.push(
                <Notification closable type="danger" duration={3000}>
                    Something went wrong while sending the OTP. Please try
                    again.
                </Notification>,
            )
        }
    }

    const {
        handleSubmit,
        formState: { errors },
        control,
        getValues,
    } = useForm<ForgotPasswordFormSchema>({
        defaultValues: {
            email: '',
            otp: '',
            resetToken: '',
        },
        resolver: zodResolver(validationSchema),
    })
    const onSubmit = async (values: Auth.Apis.VerifyForgotPasswordPayload) => {
        setIsSubmitting(true)

        try {
            const response = await AuthApiService.verifyForgotPassword(values)

            const resetTokenVal = response['resetToken']

            setResetToken(resetTokenVal)

            navigate('/reset-password', {
                state: {
                    resetTokenVal,
                },
            })
        } catch {
            setIsSubmitting(false)
            alert('error occured in verifying the Email and OTP')
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div>
            <Form className="w-md" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-6 gap-x-2">
                    <div className="col-span-5 col-start-1">
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
                                        placeholder="john.doe@gmail.com"
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem>
                    </div>
                    <div className="col-start-6 mt-7">
                        <Button
                            block
                            variant="solid"
                            type="button"
                            className="flex items-center justify-center"
                            onClick={sendOTP}
                        >
                            Get OTP
                        </Button>
                    </div>
                </div>
                <FormItem
                    asterisk
                    label="Enter OTP"
                    invalid={Boolean(errors.otp)}
                    errorMessage={errors.otp?.message}
                >
                    <Controller
                        name="otp"
                        control={control}
                        render={({ field }) => (
                            <OtpInput
                                className="space-x-3"
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
                    type="submit"
                    loading={isSubmitting}
                >
                    Verify
                </Button>
            </Form>
        </div>
    )
}

export default ForgotPasswordForm
