import { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import Select from '@/components/ui/Select'
import OtpInput from '@/components/shared/OtpInput'
import { HiOutlineUser, HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'
import type { MouseEvent } from 'react'
import { BiCheckShield } from 'react-icons/bi'
import Upload from '@/components/ui/Upload'
import { AuthApiService } from '@/app/@api/auth/authT.api'
import { useNavigate } from 'react-router'
import { Aadhar } from '@/app/@api/aadhar/aadhar.types'
import { DistrictApis } from '@/app/@api/district-module/district.api'
import { District } from '@/app/@api/district-module/district.types'
import { OfficeApis } from '@/app/@api/office-module/office.api'
import { Office } from '@/app/@api/office-module/office.types'
import { Department } from '@/app/@api/department-module/department.types'
import { DepartmentApis } from '@/app/@api/department-module/department.api'
import api from '@/app/@api/api'
import { Notification, toast } from '@/components/ui'

type SignUpFormSchema = {
    aadharNumber: string
    otp: string
    email: string
    password: string
    departmentId: string
    officeId: string
    districtId: string
    employeeId: string
    aadharCard: File | null
    govEmployeeIdCard: File | null
    signature: File | null
    verificationToken?: string
    gender?: string
    dob?: string
}

const validationSchema: ZodType<SignUpFormSchema> = z.object({
    gender: z.string().optional(),
    dob: z.string().optional(),
    districtId: z.string().min(1, { message: 'District required' }),
    officeId: z.string().min(1, { message: 'Office required' }),
    departmentId: z.string().min(1, { message: 'Department required' }),
    aadharCard: z.custom<File | null>().refine((file) => file !== null, {
        message: 'Aadhar Card is require',
    }),
    signature: z.custom<File | null>().refine((file) => file !== null, {
        message: 'Signature is requir',
    }),
    govEmployeeIdCard: z.custom<File | null>().refine((file) => file !== null, {
        message: 'Gov ID is require',
    }),
    aadharNumber: z
        .string()
        .min(12, { message: 'Too short.' })
        .max(12, { message: 'Too long' }),
    otp: z.string().min(6, { message: 'Please enter a valid OTP' }),
    verificationToken: z.string().optional(),
    email: z.string().min(4, { message: 'Please enter your email' }),
    password: z
        .string()
        .min(8, { message: 'Password must contain at least 8 letters' }),
    employeeId: z.string().min(1, { message: 'Employee ID required' }),
})

const ClerkSignUpForm = () => {
    const navigate = useNavigate()
    const [aadharData, setAadharData] = useState<Aadhar.Base | null>(null)
    const [pwInputType, setPwInputType] = useState('password')
    const [districts, setDistricts] = useState<District.Detail[]>([])
    const [offices, setOffices] = useState<Office.Detail[]>([])
    const [departments, setDepartments] = useState<Department.Detail[]>([])

    const forlocation = async () => {
        try {
            const disRes = await DistrictApis.list()
            const officeRes = await OfficeApis.list()
            const deptRes = await DepartmentApis.list()

            setDistricts(disRes.data || disRes || [])
            setOffices(officeRes.data || officeRes || [])
            setDepartments(deptRes.data || deptRes || [])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        forlocation()
    }, [])

    const {
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
        control,
    } = useForm<SignUpFormSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            aadharNumber: '',
            otp: '',
            email: '',
            password: '',
            employeeId: '',
            departmentId: '',
            officeId: '',
            districtId: '',
            aadharCard: null,
            signature: null,
            govEmployeeIdCard: null,
            verificationToken: '',
            gender: '',
            dob: '',
        },
    })

    const onSubmit = async (values: SignUpFormSchema) => {
        const activeToken = getValues('verificationToken')

        if (!activeToken) {
            alert('there is no verification Token')
            return
        }
        try {
            const formData = new FormData()
            formData.append('aadharId', values.aadharNumber)
            formData.append('email', values.email)
            formData.append('password', values.password)
            formData.append('employeeId', values.employeeId)
            formData.append('verificationToken', activeToken)
            formData.append('status', 'pending')

            //mapping the selected officeid and departmentid into officedepartmentId
            const mappingRes = await api.get('/office-department/mapping', {
                params: {
                    officeId: values.officeId,
                    departmentId: values.departmentId,
                },
            })
            const mapData = mappingRes.data || mappingRes
            if (mapData._id) {
                formData.append('officeDepartmentId', mapData._id)
            } else {
                alert('error occured in officedepartmentId mapping')
                return
            }

            if (values.aadharCard) {
                formData.append('aadharCard', values.aadharCard)
            }
            if (values.signature) {
                formData.append('signature', values.signature)
            }
            if (values.govEmployeeIdCard) {
                formData.append('govEmployeeIdCard', values.govEmployeeIdCard)
            }

            const res = await AuthApiService.signUpClerk(formData)

            if (res) {
                toast.push(
                    <Notification closable type="success" duration={3000}>
                        Clerk Registered successfully!
                    </Notification>,
                )
            }
            navigate('/app/admin/clerks-page')
        } catch (error) {
            alert('Error occured at time of clerk registration: ' + error)
            navigate('/app/admin/clerks-page')
        }
    }
    const requestOtp = async () => {
        try {
            const resp = await AuthApiService.requestOtp({
                aadharNumber: getValues('aadharNumber'),
            })
            if (resp) {
                toast.push(
                    <Notification closable type="success" duration={3000}>
                        OTP sent successfully! Please check your email.
                    </Notification>,
                )
            }
        } catch {
            toast.push(
                <Notification closable type="danger" duration={3000}>
                    Something went wrong while sending the OTP. Please try
                    again.
                </Notification>,
            )
        }
    }

    const verifyOtp = async () => {
        try {
            const resp = await AuthApiService.verifyOtp({
                aadharNumber: getValues('aadharNumber'),
                otp: getValues('otp'),
            })

            const verify =
                resp.data?.verificationToken || resp['verificationToken']

            if (verify) {
                setValue('verificationToken', verify)
            } else {
                alert(
                    'OTP requested, but no verification token found in response payload.',
                )
            }
            const aadata = resp?.data?.aadharDetails || resp?.aadharDetails

            if (aadata) {
                setAadharData(aadata)
            } else {
                alert('OTP verified, but no Aadhar details found in response.')
            }
        } catch (error) {
            alert('Error in verifying OTP: ' + error)
        }
    }

    const onPasswordVisibleClick = (e: MouseEvent) => {
        e.preventDefault()
        setPwInputType(pwInputType === 'password' ? 'text' : 'password')
    }

    const inputIcon = (
        <span
            className="cursor-pointer"
            onClick={(e) => onPasswordVisibleClick(e)}
        >
            {pwInputType === 'password' ? (
                <HiOutlineEyeOff />
            ) : (
                <HiOutlineEye />
            )}
        </span>
    )

    return (
        <div>
            <Form className="w-xl py-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex space-x-6">
                    <FormItem
                        asterisk
                        label="Aadhar Id"
                        invalid={Boolean(errors.aadharNumber)}
                        errorMessage={errors.aadharNumber?.message}
                    >
                        <Controller
                            name="aadharNumber"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    prefix={
                                        <HiOutlineUser className="text-lg" />
                                    }
                                    placeholder="e.g. 1234 1234 1234"
                                    autoComplete="off"
                                    className="w-[calc(60dvh)]"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <Button
                        type="button"
                        variant="solid"
                        className="h-[48px] mt-7"
                        onClick={requestOtp}
                    >
                        Send
                    </Button>
                </div>

                <div>
                    <div className="mb-2">
                        <h5 className="mb-0">OTP Verification</h5>
                        <p className="font-semibold heading-text">
                            We have sent you One Time Password to your email.
                        </p>
                    </div>

                    <div className="flex space-x-8">
                        <FormItem
                            invalid={Boolean(errors.otp)}
                            errorMessage={errors.otp?.message}
                        >
                            <Controller
                                name="otp"
                                control={control}
                                render={({ field }) => (
                                    <OtpInput
                                        className="space-x-2"
                                        placeholder=""
                                        inputClass="h-[58px]"
                                        length={6}
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem>
                        <Button
                            block
                            variant="solid"
                            type="button"
                            className="h-[58px] flex items-center justify-center"
                            onClick={verifyOtp}
                        >
                            <BiCheckShield className="w-9 h-9" />
                        </Button>
                    </div>

                    <div className="mt-4 text-center">
                        <span className="font-semibold">
                            Didn&apos;t receive OTP?{' '}
                        </span>
                        <button
                            type="button"
                            className="heading-text font-bold underline"
                            onClick={requestOtp}
                        >
                            Resend OTP
                        </button>
                    </div>
                </div>

                {aadharData && (
                    <div className="space-y-4">
                        <div>
                            <p className="font-semibold mb-1">User Name</p>
                            <p className="p-3 rounded-xl bg-gray-100 font-semibold text-black cursor-not-allowed">
                                {`${aadharData.firstName} ${aadharData.middleName} ${aadharData.lastName}`}
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold mb-1">Gender</p>
                            <p className="p-3 rounded-xl bg-gray-100 font-semibold text-black cursor-not-allowed">
                                {`${aadharData.gender}`}
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold mb-1">DOB</p>
                            <p className="p-3 rounded-xl bg-gray-100 font-semibold text-black cursor-not-allowed">
                                {`${aadharData.dob}`}
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold mb-1">Mobile Number</p>
                            <p className="p-3 rounded-xl bg-gray-100 text-black font-semibold my-4 cursor-not-allowed">
                                {aadharData.contact}
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex gap-4">
                    <FormItem
                        asterisk
                        label="Select District"
                        className="mt-2 flex-1"
                    >
                        <Controller
                            name="districtId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Select District"
                                    options={districts.map((item) => ({
                                        label: item.name,
                                        value: item._id,
                                    }))}
                                    onChange={(option) =>
                                        field.onChange(option?.value || '')
                                    }
                                    value={districts
                                        .map((dis) => ({
                                            label: dis.name,
                                            value: dis._id,
                                        }))
                                        .find(
                                            (dis) => dis.value === field.value,
                                        )}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        asterisk
                        label="Select Office"
                        className="mt-2 flex-1"
                    >
                        <Controller
                            name="officeId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Select Office"
                                    options={offices.map((item) => ({
                                        label: item.name,
                                        value: item._id,
                                    }))}
                                    onChange={(option) =>
                                        field.onChange(option?.value || '')
                                    }
                                    value={offices
                                        .map((o) => ({
                                            label: o.name,
                                            value: o._id,
                                        }))
                                        .find(
                                            (opt) => opt.value === field.value,
                                        )}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        asterisk
                        label="Select Department"
                        className="mt-2 flex-1"
                    >
                        <Controller
                            name="departmentId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Select Department"
                                    options={departments.map((item) => ({
                                        label: item.name,
                                        value: item._id,
                                    }))}
                                    onChange={(option) =>
                                        field.onChange(option?.value || '')
                                    }
                                    value={departments
                                        .map((d) => ({
                                            label: d.name,
                                            value: d._id,
                                        }))
                                        .find((o) => o.value === field.value)}
                                />
                            )}
                        />
                    </FormItem>
                </div>

                <FormItem
                    asterisk
                    label="Employee Id"
                    invalid={Boolean(errors.employeeId)}
                    errorMessage={errors.employeeId?.message}
                >
                    <Controller
                        name="employeeId"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                placeholder="e.g. 34876"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Email"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="email"
                                placeholder="abc12@gmail.com"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    asterisk
                    label="Password"
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type={pwInputType}
                                suffix={inputIcon}
                                placeholder="Enter a strong password"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    asterisk
                    label="Aadhar card Image"
                    invalid={Boolean(errors.aadharCard)}
                    errorMessage={errors.aadharCard?.message}
                >
                    <Controller
                        name="aadharCard"
                        control={control}
                        render={({ field }) => (
                            <Upload
                                draggable
                                uploadLimit={1}
                                onChange={(files) =>
                                    field.onChange(files?.[0] || null)
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    asterisk
                    label="Signature"
                    invalid={Boolean(errors.signature)}
                    errorMessage={errors.signature?.message}
                >
                    <Controller
                        name="signature"
                        control={control}
                        render={({ field }) => (
                            <Upload
                                draggable
                                uploadLimit={1}
                                onChange={(files) =>
                                    field.onChange(files?.[0] || null)
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    asterisk
                    label="Gov Employee Id Card"
                    invalid={Boolean(errors.govEmployeeIdCard)}
                    errorMessage={errors.govEmployeeIdCard?.message}
                >
                    <Controller
                        name="govEmployeeIdCard"
                        control={control}
                        render={({ field }) => (
                            <Upload
                                draggable
                                uploadLimit={1}
                                onChange={(files) =>
                                    field.onChange(files?.[0] || null)
                                }
                            />
                        )}
                    />
                </FormItem>

                <Button block variant="solid" type="submit">
                    Sign-up
                </Button>
            </Form>
        </div>
    )
}

export default ClerkSignUpForm
