import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const authRoute: Routes = [
    {
        key: 'signIn',
        path: `/sign-in`,
        component: lazy(() => import('@/app/modules/auth/login')),
        authority: [],
    },
    {
        key: 'signUp',
        path: `/sign-up`,
        component: lazy(() => import('@/app/modules/auth/signUp')),
        authority: [],
    },
    // clerk page testing purpose only
    // {
    //     key: 'signUp',
    //     path: `/sign-up`,
    //     component: lazy(() => import('@/app/modules/auth/clerkSignUp')),
    //     authority: [],
    // },

    {
        key: 'resetPassword',
        path: `/reset-password`,
        component: lazy(() => import('@/app/modules/auth/resetPassword')),
        authority: [],
    },
]

export default authRoute
