import { Auth } from './auth.types'
import api from '../api'

export const AuthApiService = {
    async login(
        data: Auth.Apis.LoginPayload,
    ): Promise<Auth.Apis.LoginResponse> {
        const response = await api.post<Auth.Apis.LoginResponse>(
            `auth/login`,
            data,
        )
        return response.data
    },
    async signUpUser(
        data: Auth.Apis.UserSignUpPayload,
    ): Promise<Auth.Apis.SignUpResponse> {
        const response = await api.post<Auth.Apis.SignUpResponse>(
            'auth/register',
            data,
        )

        return response.data
    },

    async signUpClerk(
        data: Auth.Apis.ClerkSignUpPayload,
    ): Promise<Auth.Apis.SignUpResponse> {
        const response = await api.post<Auth.Apis.SignUpResponse>(
            'clerk/create',
            data,
        )

        return response.data
    },
    async requestOtp(
        data: Auth.Apis.RequestOtpPayload,
    ): Promise<Auth.Apis.RequestOtpResponse> {
        const response = await api.post<Auth.Apis.RequestOtpResponse>(
            'auth/request-aadhar',
            data,
        )
        return response.data
    },
    async verifyOtp(
        data: Auth.Apis.VerifyOtpPayload,
    ): Promise<Auth.Apis.VerifyOtpResponse> {
        const response = await api.post<Auth.Apis.VerifyOtpResponse>(
            'auth/verify-aadhar',
            data,
        )

        return response.data
    },

    async forgotPassword(
        data: Auth.Apis.ForgotPasswordPayload,
    ): Promise<Auth.Apis.ForgotPasswordResponse> {
        const response = await api.post<Auth.Apis.ForgotPasswordResponse>(
            '/auth/forgot-password',
            data,
        )

        return response.data
    },

    async verifyForgotPassword(
        data: Auth.Apis.VerifyForgotPasswordPayload,
    ): Promise<Auth.Apis.VerifyForgotPasswordResponse> {
        const response = await api.post<Auth.Apis.VerifyForgotPasswordResponse>(
            '/auth/verify-forgot-password',
            data,
        )

        return response.data
    },

    async resetPassword(
        data: Auth.Apis.ResetPasswordPayload,
    ): Promise<Auth.Apis.ResetPasswordResponse> {
        const response = await api.post<Auth.Apis.ResetPasswordResponse>(
            '/auth/reset-password',
            data,
        )

        return response.data
    },
}
