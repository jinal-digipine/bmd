import LoginForm from './components/SignInForm'
import ActionLink from '@/components/shared/ActionLink'

export const SignInBase = ({
    signUpUrl = '/sign-up',
    forgotPasswordUrl = '/forgot-password',
}) => {
    return (
        <div className="text-center flex flex-col gap-2 justify-center items-center h-[calc(100dvh)] bg-white">
            <div className="mb-4">
                <h2 className="mb-2">Sign-In Here!</h2>
                <p className="font-semibold heading-text">
                    Please enter your credentials to Sign-In!
                </p>
            </div>
            <LoginForm />

            <ActionLink
                to={forgotPasswordUrl}
                className="font-semibold heading-text mt-2 underline"
                themeColor={false}
            >
                Forgot password
            </ActionLink>

            <div className="mt-6">
                <span>{`Don't have an account yet?`} </span>
                <ActionLink
                    to={signUpUrl}
                    className="heading-text font-bold"
                    themeColor={false}
                >
                    Sign up
                </ActionLink>
            </div>
        </div>
    )
}

const SignIn = () => {
    return <SignInBase />
}

export default SignIn
