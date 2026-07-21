/* eslint-disable @typescript-eslint/no-namespace */
import type { Response } from '../apiLayer.type'
import { Aadhar } from '../aadhar/aadhar.types'
import { User } from '../user/user.types'

export namespace Auth {
    export enum EOtp {
        AADHAR_VERIFICATION = 'aadhar_verification',
        FORGOT_PASSWORD = 'forgot_password',
    }

    export namespace Apis {
        //login payload
        export type LoginPayload = {
            email: string
            password: string
        }
        //login response
        export type LoginResponse = {
            accessToken: string
            user: {
                _id: string
                email: string
                role: string
            }
        }
        //clerk-SignUp payload
        export type ClerkSignUpPayload = FormData

        //user SignUp payload
        export type UserSignUpPayload = {
            aadharNumber: Aadhar.Base['aadharNumber']
            verificationToken: string
            email: string
            password: string
            role: string
        }
        //signup response
        export type SignUpResponse = Response.Normal<{
            userId: User.Id
            aadharDetails: Aadhar.Id
        }>

        //request otp payload
        export type RequestOtpPayload = {
            aadharNumber: string
        }
        export type RequestOtpResponse = Response.Normal<{
            message: string
        }>

        //verify otp payload
        export type VerifyOtpPayload = {
            aadharNumber: string
            otp: string
        }

        export type VerifyOtpResponse = Response.Normal<{
            aadharDetails: Aadhar.Base
            verificationToken: string
        }>

        //forgot pass payload
        export type ForgotPasswordPayload = {
            email: string
        }
        export type ForgotPasswordResponse = Response.Normal<{
            message: string
        }>

        //verify-forgot-password
        export type VerifyForgotPasswordPayload = {
            email: string
            otp: string
        }
        export type VerifyForgotPasswordResponse = Response.Normal<{
            resetToken: string
        }>

        //reset pass payload
        export type ResetPasswordPayload = {
            resetToken: string
            password: string
            confirmPassword: string
        }
        export type ResetPasswordResponse = Response.Normal<{
            message: string
        }>
    }
}
