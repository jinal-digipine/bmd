import ActionLink from '@/components/shared/ActionLink'
import Navigation from '../NavigationBar'
import useDarkMode from '@/utils/hooks/useDarkMode'
import { MODE_DARK, MODE_LIGHT } from '@/constants/theme.constant'
import ForgotPasswordForm from './components/ForgotPasswordForm'

export const ForgotPasswordBase = ({ signInUrl = '/sign-in' }) => {
    const [isDark, setMode] = useDarkMode()

    const mode = isDark ? MODE_DARK : MODE_LIGHT

    const toggleMode = () => {
        setMode(mode === MODE_LIGHT ? MODE_DARK : MODE_LIGHT)
    }

    return (
        <div className=" w-120 overflow-auto mt-12 px-2">
            <Navigation toggleMode={toggleMode} mode={mode} />

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
