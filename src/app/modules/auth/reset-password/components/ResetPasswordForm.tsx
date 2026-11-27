import Button from '@/components/ui/Button'
import { useState } from 'react'
import { FormItem, Form } from '@/components/ui/Form'
import PasswordInput from '@/components/shared/PasswordInput'
import { useLocation, useNavigate } from 'react-router'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import { AuthApiService } from '@/app/@api/auth/authT.api'
import { Notification, toast } from '@/components/ui'

type ResetPasswordFormSchema = {
    password: string
    confirmPassword: string
}
const validationSchema: ZodType<ResetPasswordFormSchema> = z
    .object({
        password: z
            .string()
            .min(8, { message: 'password length must be 8 characters' }),
        confirmPassword: z
            .string()
            .min(8, { message: 'password must be 8 character long' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Your passwords do not match',
        path: ['confirmPassword'],
    })
const ResetPasswordForm = () => {
    const [submitting, setSubmitting] = useState(false)
    const location = useLocation()
    const resetToken = location.state?.resetTokenVal //contains the resetToken val
    const navigate = useNavigate()

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<ResetPasswordFormSchema>({
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
        resolver: zodResolver(validationSchema),
    })
    const onSubmit = async (values: ResetPasswordFormSchema) => {
        setSubmitting(true)

        try {
            const res = await AuthApiService.resetPassword({
                resetToken,
                password: values.password,
                confirmPassword: values.confirmPassword,
            })
            if (res) {
                toast.push(
                    <Notification closable type="success" duration={3000}>
                        Password Changed successfully😉
                    </Notification>,
                )
                setSubmitting(false)
                navigate('/sign-in')
            } else {
                toast.push(
                    <Notification closable type="danger" duration={3000}>
                        Failed to Change Password 🫩
                    </Notification>,
                )
                setSubmitting(false)
                navigate('/forgot-password')
            }
        } catch (err) {
            alert('error ocuured in submiting resetPasswordForm :' + err)
        }
    }
    return (
        <div className="w-md">
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                            <PasswordInput
                                {...field}
                                autoComplete="off"
                                placeholder="Enter atleast 8-digit strong password"
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    asterisk
                    label="Confirm Password"
                    invalid={Boolean(errors.confirmPassword)}
                    errorMessage={errors.confirmPassword?.message}
                >
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                            <PasswordInput
                                {...field}
                                autoComplete="off"
                                placeholder="Confirm Password"
                            />
                        )}
                    />
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

export default ResetPasswordForm
