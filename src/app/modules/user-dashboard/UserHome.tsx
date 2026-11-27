import Services from './components/Services'
import useDarkMode from '@/utils/hooks/useDarkMode'
import { MODE_DARK, MODE_LIGHT } from '@/constants/theme.constant'
import { useThemeStore } from '@/store/themeStore'
import HeroContent from './components/HeroContent'

const UserHome = () => {
    const [isDark, setMode] = useDarkMode()

    const mode = isDark ? MODE_DARK : MODE_LIGHT

    const schema = useThemeStore((state) => state.themeSchema)
    const setSchema = useThemeStore((state) => state.setSchema)

    return (
        <main className=" px-4 lg:px-0 text-base">
            <div className="relative">
                <HeroContent mode={mode} />
                <Services
                    mode={mode}
                    schema={schema}
                    setSchema={setSchema}
                    onModeChange={(value) => setMode(value ? 'dark' : 'light')}
                />
            </div>
        </main>
    )
}

export default UserHome
