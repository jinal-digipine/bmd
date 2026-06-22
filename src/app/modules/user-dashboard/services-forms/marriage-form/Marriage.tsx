import Navigation from '@/app/modules/user-dashboard/components/NavigationBar'
import useDarkMode from '@/utils/hooks/useDarkMode'
import { MODE_DARK, MODE_LIGHT } from '@/constants/theme.constant'
import MarriageForm from './components/MarriageForm'

export const MarriageBase = () => {
    const [isDark, setMode] = useDarkMode()

    const mode = isDark ? MODE_DARK : MODE_LIGHT

    const toggleMode = () => {
        setMode(mode === MODE_LIGHT ? MODE_DARK : MODE_LIGHT)
    }
    // h-[360vh] overflow-visible w-280
    return (
        <div className=" mt-12 px-2 self-center">
            <Navigation toggleMode={toggleMode} mode={mode} />

            <MarriageForm />
        </div>
    )
}

const Marriage = () => {
    return <MarriageBase />
}

export default Marriage
