import SignUpForm from './components/SignUpForm'
import ActionLink from '@/components/shared/ActionLink'

export const SignUpBase = ({ signInUrl = '/sign-in' }) => {
    return (
        <div className="text-center flex flex-col gap-2 justify-center items-center h-[calc(100dvh)] bg-white py-4">
            <div className="mt-4">
                <h2 className="mb-1">Sign Up</h2>
            </div>
            <p className="font-semibold heading-text">
                Please fill the form to Sign-Up!
            </p>

            <SignUpForm />

            <div className="my-4 text-center">
                <span>Already have an account? </span>
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

const SignUp = () => {
    return <SignUpBase />
}

export default SignUp
