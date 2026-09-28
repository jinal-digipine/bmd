import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import PasswordInput from '@/components/shared/PasswordInput'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'

import { Auth } from '@/app/@api/auth/auth.types'
import { AuthApiService } from '@/app/@api/auth/authT.api'
import { useNavigate } from 'react-router'

type SignInFormSchema = {
    email: string
    password: string
}

const validationSchema: ZodType<SignInFormSchema> = z.object({
    email: z
        .string({ required_error: 'Please enter your email' })
        .min(3, { message: 'Please enter your email' }),
    password: z
        .string({ required_error: 'Please enter your password' })
        .min(8, { message: 'Please enter your password' }),
    role: z.string(),
})

const SignInForm = () => {
    const [isSubmitting] = useState<boolean>(false)
    const navigate = useNavigate()

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<SignInFormSchema>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = async (values: Auth.Apis.LoginPayload) => {
        try {
            const response = await AuthApiService.login(values)
            localStorage.setItem('user', JSON.stringify(response))
            localStorage.setItem('accessToken', response.accessToken)
            const role = response.user.role

            if (role === 'user') {
                navigate('/app/user-dashboard')
            } else if (role === 'clerk') {
                navigate('/app/clerk-dashboard')
            } else if (role === 'admin') {
                navigate('/app/admin-dashboard')
            } else {
                navigate('/landing')
            }
        } catch (error) {
            alert('Failed to Login! ' + error)
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                                placeholder="abc12@gmail.com"
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
                        rules={{ required: true }}
                        render={({ field }) => (
                            <PasswordInput
                                type="text"
                                placeholder="Password"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                >
                    Sign-In
                </Button>
            </Form>
        </div>
    )
}

export default SignInForm
