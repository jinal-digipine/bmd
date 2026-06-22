import LoginForm from './components/SignInForm'
import ActionLink from '@/components/shared/ActionLink'
import Navigation from '../NavigationBar'
import useDarkMode from '@/utils/hooks/useDarkMode'
import { MODE_DARK, MODE_LIGHT } from '@/constants/theme.constant'

export const SignInBase = ({
    signUpUrl = '/sign-up',
    forgotPasswordUrl = '/forgot-password',
}) => {
    const [isDark, setMode] = useDarkMode()

    const mode = isDark ? MODE_DARK : MODE_LIGHT

    const toggleMode = () => {
        setMode(mode === MODE_LIGHT ? MODE_DARK : MODE_LIGHT)
    }
    return (
        <div className=" w-120 overflow-auto">
            <Navigation toggleMode={toggleMode} mode={mode} />

            <div className="mb-10">
                <h2 className="mb-2">Sign-In Here!</h2>
                <p className="font-semibold heading-text">
                    Please enter your credentials to Sign-In!
                </p>
            </div>
            <LoginForm />

            {
                <div className="mb-7 mt-2">
                    <ActionLink
                        to={forgotPasswordUrl}
                        className="font-semibold heading-text mt-2 underline"
                        themeColor={false}
                    >
                        Forgot password
                    </ActionLink>
                </div>
            }
            <div>
                <div className="mt-6 text-center">
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
        </div>
    )
}

const SignIn = () => {
    return <SignInBase />
}

export default SignIn
