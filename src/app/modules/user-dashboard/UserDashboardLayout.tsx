import NavigationBar from './components/NavigationBar'
import HomeFooter from './components/HomeFooter'
import useDarkMode from '@/utils/hooks/useDarkMode'
import { MODE_DARK, MODE_LIGHT } from '@/constants/theme.constant'
import { Outlet } from 'react-router'

const UserDashboardLayout = () => {
    const [isDark, setMode] = useDarkMode()

    const mode = isDark ? MODE_DARK : MODE_LIGHT
    const toggleMode = () => {
        setMode(mode === MODE_LIGHT ? MODE_DARK : MODE_LIGHT)
    }

    return (
        <div>
            <NavigationBar toggleMode={toggleMode} mode={mode} />
            <Outlet />
            <HomeFooter mode={mode} />
        </div>
    )
}

export default UserDashboardLayout
