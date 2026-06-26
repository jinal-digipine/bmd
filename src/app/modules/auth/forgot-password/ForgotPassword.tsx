import ActionLink from '@/components/shared/ActionLink'

import ForgotPasswordForm from './components/ForgotPasswordForm'

export const ForgotPasswordBase = ({ signInUrl = '/sign-in' }) => {
    return (
        <div className="text-center flex flex-col gap-2 justify-center items-center h-[calc(100dvh)] bg-white">
            <div className="mb-6">
                <div>
                    <h2 className="mb-1">Forgot password</h2>
                    <p className="font-semibold heading-text">
                        Please enter your registered email to receive
                        verification code.
                    </p>
                </div>
            </div>

            <ForgotPasswordForm />

            <div className="mt-4 text-center">
                <span>Back to </span>
                <ActionLink
                    to={signInUrl}
                    className="heading-text font-bold"
                    themeColor={false}
                >
                    Sign in
                </ActionLink>
            </div>
        </div>
    )
}

const ForgotPassword = () => {
    return <ForgotPasswordBase />
}

export default ForgotPassword
