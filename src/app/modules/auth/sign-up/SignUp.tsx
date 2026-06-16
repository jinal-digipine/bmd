import SignUpForm from './components/SignUpForm'
import ActionLink from '@/components/shared/ActionLink'
import Navigation from '../NavigationBar'
import useDarkMode from '@/utils/hooks/useDarkMode'
import { MODE_DARK, MODE_LIGHT } from '@/constants/theme.constant'

export const SignUpBase = ({ signInUrl = '/sign-in' }) => {
    const [isDark, setMode] = useDarkMode()

    const mode = isDark ? MODE_DARK : MODE_LIGHT

    const toggleMode = () => {
        setMode(mode === MODE_LIGHT ? MODE_DARK : MODE_LIGHT)
    }

    return (
        <div className="h-150 w-120 overflow-auto mt-12 px-2">
            <Navigation toggleMode={toggleMode} mode={mode} />

            <div className="mb-8 ">
                <h2 className="mb-1">Sign Up</h2>
            </div>

            <SignUpForm />
            <div>
                <div className="mt-6 text-center">
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
        </div>
    )
}

const SignUp = () => {
    return <SignUpBase />
}

export default SignUp
