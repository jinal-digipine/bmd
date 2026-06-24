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
    // {
    //     key: 'userHome',
    //     path: 'user-home',
    //     component: lazy(() => import('@/app/modules/user-dashboard')),
    //     authority: [],
    // },
    // {
    //     key: 'birthForm',
    //     path: 'user-home/birth-form',
    //     component: lazy(
    //         () =>
    //             import(
    //                 '@/app/modules/user-dashboard/services-forms/birth-form'
    //             ),
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'marriageForm',
    //     path: 'user-home/marriage-form',
    //     component: lazy(
    //         () =>
    //             import(
    //                 '@/app/modules/user-dashboard/services-forms/marriage-form'
    //             ),
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'deathForm',
    //     path: 'user-home/death-form',
    //     component: lazy(
    //         () =>
    //             import(
    //                 '@/app/modules/user-dashboard/services-forms/death-form'
    //             ),
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'myProfile',
    //     path: 'user-home/my-profile',
    //     component: lazy(
    //         () => import('@/app/modules/user-dashboard/components/MyProfile'),
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'myApplications',
    //     path: 'user-home/my-applications',
    //     component: lazy(
    //         () =>
    //             import(
    //                 '@/app/modules/user-dashboard/components/MyApplications'
    //             ),
    //     ),
    //     authority: [],
    // },
    // {
    //    ...UserDashboardLayout
    //     meta: {
    //         pageContainerType: 'gutter',
    //         header: {
    //             title: 'My tittle',
    //             description: 'Some description'
    //             contained: false,
    //             extraHeader: lazy(() => import('@/app/modules/user-dashboard/UserDashboardLayout')),
    //         },
    //         footer: false,
    //         layout: 'UserDashboardLayout',
    //     }
    // },
]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: 'home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },

    ...othersRoute,
]
