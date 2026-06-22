import useDarkMode from '@/utils/hooks/useDarkMode'
import { MODE_DARK, MODE_LIGHT } from '@/constants/theme.constant'
import Navigation from '../../components/NavigationBar'
import DeathForm from './components/DeathForm'

export const DeathBase = () => {
    const [isDark, setMode] = useDarkMode()
    const mode = isDark ? MODE_DARK : MODE_LIGHT

    const toggleMode = () => {
        setMode(mode === MODE_LIGHT ? MODE_DARK : MODE_LIGHT)
    }

    return (
        <div className="mt-12 px-2 self-center">
            <Navigation toggleMode={toggleMode} mode={mode} />

            <DeathForm />
        </div>
    )
}

const Death = () => {
    return <DeathBase />
}
export default Death
