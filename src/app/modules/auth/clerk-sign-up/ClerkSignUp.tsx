import SignUpForm from './components/ClerkSignUpForm'
import Navigation from '../NavigationBar'
import useDarkMode from '@/utils/hooks/useDarkMode'
import { MODE_DARK, MODE_LIGHT } from '@/constants/theme.constant'
import ActionLink from '@/components/shared/ActionLink'

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
                <h2 className="mb-1">Create Clerk</h2>
            </div>

            <SignUpForm />
        </div>
    )
}

const SignUp = () => {
    return <SignUpBase />
}

export default SignUp
