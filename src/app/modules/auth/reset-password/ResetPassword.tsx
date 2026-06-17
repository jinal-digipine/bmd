import ActionLink from '@/components/shared/ActionLink'
import ResetPasswordForm from './components/ResetPasswordForm'
import Navigation from '../NavigationBar'
import useDarkMode from '@/utils/hooks/useDarkMode'
import { MODE_DARK, MODE_LIGHT } from '@/constants/theme.constant'

export const ResetPasswordBase = ({ signInUrl = '/sign-in' }) => {
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
