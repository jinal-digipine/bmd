import Button from '@/components/ui/Button'
import { useState } from 'react'
import { FormItem, Form } from '@/components/ui/Form'
import PasswordInput from '@/components/shared/PasswordInput'

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
        <div className="w-xl">
            <Form onSubmit={onSubmit}>
                <FormItem asterisk label="Password">
                    <PasswordInput
                        autoComplete="off"
                        placeholder="Enter atleast 8-digit strong password"
                    />
                </FormItem>
                <FormItem asterisk label="Confirm Password">
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
