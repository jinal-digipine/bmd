import Button from '@/components/ui/Button'
import { useState } from 'react'
import { FormItem, Form } from '@/components/ui/Form'
import { Input } from '@/components/ui'
import { useNavigate } from 'react-router'

const ForgotPasswordForm = () => {
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleSubmitClick = () => {
        navigate('/reset-password')
    }
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
                <FormItem asterisk label="Email">
                    <Input type="email" placeholder="e.g. jin21@gmail.com" />
                </FormItem>

                <Button
                    block
                    variant="solid"
                    type="submit"
                    loading={submitting}
                    onClick={handleSubmitClick}
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default ForgotPasswordForm
