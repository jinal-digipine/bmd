import ActionLink from '@/components/shared/ActionLink'
import ResetPasswordForm from './components/ResetPasswordForm'

export const ResetPasswordBase = ({ signInUrl = '/sign-in' }) => {
    return (
        <div className="text-center flex flex-col gap-2 justify-center items-center h-[calc(100dvh)] bg-white">
            <div className="mb-6">
                <div>
                    <h2 className="mb-1">Set new password</h2>
                    <p className="font-semibold heading-text">
                        Your new password must different from previous password
                    </p>
                </div>
            </div>

            <ResetPasswordForm />

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

const ResetPassword = () => {
    return <ResetPasswordBase />
}

export default ResetPassword
