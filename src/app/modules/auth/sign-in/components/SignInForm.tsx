import Input from '@/components/ui/Input'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import PasswordInput from '@/components/shared/PasswordInput'

const SignInForm = () => {
    const [submitting, setSubmitting] = useState(false)

    const onSubmit = (values) => {
        setSubmitting(true)
        setTimeout(() => {
            window.alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
        }, 400)
    }
    return (
        <Form onSubmit={onSubmit}>
            <FormItem asterisk label="Email">
                <Input type="email" placeholder="e.g. jin21@gmail.com" />
            </FormItem>
            <FormItem asterisk label="Password">
                <PasswordInput type="text" placeholder="Enter Your Password" />
            </FormItem>
            <Button block variant="solid" type="submit" loading={submitting}>
                Sign In
            </Button>
        </Form>
    )
}

export default SignInForm
