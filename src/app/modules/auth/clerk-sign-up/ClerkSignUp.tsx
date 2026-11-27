import SignUpForm from './components/ClerkSignUpForm'

export const SignUpBase = () => {
    return (
        <div className="text-center flex flex-col gap-2 justify-center items-center bg-white">
            <h2 className="mb-1">Create Clerk</h2>
            <p className="font-semibold heading-text">
                Please fill the form to create a Clerk!
            </p>

            <SignUpForm />
        </div>
    )
}

const SignUp = () => {
    return <SignUpBase />
}

export default SignUp
