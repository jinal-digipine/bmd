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
        path: 'user-dashboard',
        component: lazy(() => import('@/app/modules/user-dashboard')),
        authority: [],
    },
    {
        key: 'dashboard',
        path: 'clerk-dashboard',
        component: lazy(() => import('@/app/modules/clerk-dashboard')),
        authority: [],
    },
    {
        key: 'user.applications',
        path: 'user/applications',
        component: lazy(
            () =>
                import(
                    '@/app/modules/user-dashboard/components/MyApplications'
                ),
        ),
        authority: [],
    },
    {
        key: 'clerk.applications',
        path: 'clerk/applications',
        component: lazy(
            () =>
                import(
                    '@/app/modules/clerk-dashboard/components/RecievedApplications'
                ),
        ),
        authority: [],
    },
    {
        key: 'user.profile',
        path: 'user/profile',
        component: lazy(
            () => import('@/app/modules/user-dashboard/components/MyProfile'),
        ),
        authority: [],
    },
    {
        key: 'clerk.profile',
        path: 'clerk/profile',
        component: lazy(
            () => import('@/app/modules/clerk-dashboard/components/MyProfile'),
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
        key: 'action-forms-birth',
        path: 'clerk/action/forms/birth',
        component: lazy(
            () =>
                import(
                    '@/app/modules/clerk-dashboard/actions/edit-birth/BirthForm'
                ),
        ),
        authority: [],
    },
    {
        key: 'action-forms-marriage',
        path: 'clerk/action/forms/marriage',
        component: lazy(
            () =>
                import(
                    '@/app/modules/clerk-dashboard/actions/edit-marriage/MarriageForm'
                ),
        ),
        authority: [],
    },
    {
        key: 'action-forms-death',
        path: 'clerk/action/forms/death',
        component: lazy(
            () =>
                import(
                    '@/app/modules/clerk-dashboard/actions/edit-death/DeathForm'
                ),
        ),
        authority: [],
    },
    {
        key: 'action-view-birth',
        path: 'clerk/action/view/birth',
        component: lazy(
            () =>
                import(
                    '@/app/modules/clerk-dashboard/actions/view-birth/BirthApplication'
                ),
        ),
        authority: [],
    },
    {
        key: 'action-view-marriage',
        path: 'clerk/action/view/marriage',
        component: lazy(
            () =>
                import(
                    '@/app/modules/clerk-dashboard/actions/view-marriage/MarriageApplication'
                ),
        ),
        authority: [],
    },
    {
        key: 'action-view-death',
        path: 'clerk/action/view/death',
        component: lazy(
            () =>
                import(
                    '@/app/modules/clerk-dashboard/actions/view-death/DeathApplication'
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
