import Navigation from '@/app/modules/user-dashboard/components/NavigationBar'
import useDarkMode from '@/utils/hooks/useDarkMode'
import { MODE_DARK, MODE_LIGHT } from '@/constants/theme.constant'
import BirthForm from './components/BirthForm'

export const BirthBase = () => {
    const [isDark, setMode] = useDarkMode()

    const mode = isDark ? MODE_DARK : MODE_LIGHT

    const toggleMode = () => {
        setMode(mode === MODE_LIGHT ? MODE_DARK : MODE_LIGHT)
    }
    return (
        <div className="mt-12 px-2 self-center">
            <Navigation toggleMode={toggleMode} mode={mode} />

            <BirthForm />
        </div>
    )
}

const Birth = () => {
    return <BirthBase />
}

export default Birth
