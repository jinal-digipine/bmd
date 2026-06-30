import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const authRoute: Routes = [
    {
        key: 'signIn',
        path: `/sign-in`,
        component: lazy(() => import('@/app/modules/auth/sign-in')),
        authority: [],
    },
    {
        key: 'signUp',
        path: `/sign-up`,
        component: lazy(() => import('@/app/modules/auth/sign-up')),
        authority: [],
    },
    // clerk page testing purpose only
    // {
    //     key: 'signUp',
    //     path: `/clerk-sign-up`,
    //     component: lazy(() => import('@/app/modules/auth/clerk-sign-up')),
    //     authority: [],
    // },

    {
        key: 'resetPassword',
        path: `/reset-password`,
        component: lazy(() => import('@/app/modules/auth/reset-password')),
        authority: [],
    },

    {
        key: 'forgotPassword',
        path: `/forgot-password`,
        component: lazy(() => import('@/app/modules/auth/forgot-password')),
        authority: [],
    },
]

export default authRoute
