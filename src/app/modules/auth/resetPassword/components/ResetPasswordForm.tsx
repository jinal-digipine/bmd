import Button from '@/components/ui/Button'
import { useState } from 'react'
import { FormItem, Form } from '@/components/ui/Form'
import PasswordInput from '@/components/shared/PasswordInput'
import { Input } from '@/components/ui'

const ResetPasswordForm = () => {
    const [submitting, setSubmitting] = useState(false)

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
                <FormItem label="Email">
                    <Input type="email" placeholder="e.g. jin21@gmail.com" />
                </FormItem>
                <FormItem label="Password">
                    <PasswordInput
                        autoComplete="off"
                        placeholder="Enter atleast 8-digit strong password"
                    />
                </FormItem>
                <FormItem label="Confirm Password">
                    <PasswordInput
                        autoComplete="off"
                        placeholder="Confirm Password"
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
