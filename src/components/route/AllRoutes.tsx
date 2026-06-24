import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import AuthorityGuard from './AuthorityGuard'
import AppRoute from './AppRoute'
import PageContainer from '@/components/template/PageContainer'
import { protectedRoutes, publicRoutes } from '@/configs/routes.config'
import appConfig from '@/configs/app.config'
import { useAuth } from '@/auth'
import { Routes, Route, Navigate } from 'react-router'
import type { LayoutType } from '@/@types/theme'
import UserDashboardLayout from '@/app/modules/user-dashboard/UserDashboardLayout'
import UserHome from '@/app/modules/user-dashboard'
import MyProfile from '@/app/modules/user-dashboard/components/MyProfile'
import Birth from '@/app/modules/user-dashboard/services-forms/birth-form'
import Marriage from '@/app/modules/user-dashboard/services-forms/marriage-form'
import Death from '@/app/modules/user-dashboard/services-forms/death-form'
import MyApplications from '@/app/modules/user-dashboard/components/MyApplications'

interface ViewsProps {
    pageContainerType?: 'default' | 'gutterless' | 'contained'
    layout?: LayoutType
}

type AllRoutesProps = ViewsProps

const { authenticatedEntryPath } = appConfig

const AllRoutes = (props: AllRoutesProps) => {
    const { user } = useAuth()

    return (
        <Routes>
            <Route path="/app" element={<ProtectedRoute />}>
                <Route
                    path="/app"
                    element={<Navigate replace to={authenticatedEntryPath} />}
                />
                {protectedRoutes.map((route, index) => (
                    <Route
                        key={route.key + index}
                        path={route.path}
                        element={
                            <AuthorityGuard
                                userAuthority={user.authority}
                                authority={route.authority}
                            >
                                <PageContainer {...props} {...route.meta}>
                                    <AppRoute
                                        routeKey={route.key}
                                        component={route.component}
                                        {...route.meta}
                                    />
                                </PageContainer>
                            </AuthorityGuard>
                        }
                    />
                ))}
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
            <Route path="/" element={<PublicRoute />}>
                {publicRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <AppRoute
                                routeKey={route.key}
                                component={route.component}
                                {...route.meta}
                            />
                        }
                    />
                ))}
            </Route>

            <Route path="user-home">
                <Route element={<UserDashboardLayout />}>
                    <Route index element={<UserHome />} />
                    <Route path="my-profile" element={<MyProfile />} />
                    <Route
                        path="my-applications"
                        element={<MyApplications />}
                    />
                    <Route path="birth-form" element={<Birth />} />
                    <Route path="marriage-form" element={<Marriage />} />
                    <Route path="death-form" element={<Death />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AllRoutes
