import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [
    ...authRoute,
    {
        key: 'landing',
        path: '/',
        component: lazy(() => import('@/app/modules/landing')),
        authority: [],
    },
]

export const protectedRoutes: Routes = [
    {
        key: 'dashboard',
        path: '',
        component: lazy(() => import('@/app/modules/user-dashboard')),
        authority: [],
    },
    {
        key: 'applications',
        path: 'applications',
        component: lazy(
            () =>
                import(
                    '@/app/modules/user-dashboard/components/MyApplications'
                ),
        ),
        authority: [],
    },
    {
        key: 'user.profile',
        path: 'profile',
        component: lazy(
            () => import('@/app/modules/user-dashboard/components/MyProfile'),
        ),
        authority: [],
    },
    {
        key: 'forms-birth',
        path: 'forms/birth',
        component: lazy(
            () =>
                import(
                    '@/app/modules/user-dashboard/services-forms/birth-form'
                ),
        ),
        authority: [],
    },
    {
        key: 'forms-marriage',
        path: 'forms/marriage',
        component: lazy(
            () =>
                import(
                    '@/app/modules/user-dashboard/services-forms/marriage-form'
                ),
        ),
        authority: [],
    },
    {
        key: 'forms-death',
        path: 'forms/death',
        component: lazy(
            () =>
                import(
                    '@/app/modules/user-dashboard/services-forms/death-form'
                ),
        ),
        authority: [],
    },

    ...othersRoute,
]
