import SlotSelection from '@/app/common/components/slot-booking/SlotSelection'
import { OtpInput } from '@/components/shared'
import {
    Button,
    Card,
    Form,
    FormItem,
    Input,
    Notification,
    Select,
    toast,
    Upload,
} from '@/components/ui'
import { useEffect, useState } from 'react'
import { BiCheckShield } from 'react-icons/bi'
import { HiOutlineUser } from 'react-icons/hi'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import { useNavigate } from 'react-router'
import { Aadhar } from '@/app/@api/aadhar/aadhar.types'
import { District } from '@/app/@api/district-module/district.types'
import { DistrictApis } from '@/app/@api/district-module/district.api'
import { AuthApiService } from '@/app/@api/auth/authT.api'
import DateTimepicker from '@/components/ui/DatePicker/DateTimepicker'
import { Department } from '@/app/@api/department-module/department.types'
import { Office } from '@/app/@api/office-module/office.types'
import api from '@/app/@api/api'
import { DeathApis } from '@/app/@api/death-module/death.api'
import { OfficeApis } from '@/app/@api/office-module/office.api'
import { DepartmentApis } from '@/app/@api/department-module/department.api'

const deathType = [
    { value: 'naturaldeath', label: 'Natural' },
    { value: 'unnaturaldeath', label: 'Un-natural' },
]

type DeathFormSchema = {
    deceasedAadharNumber: string
    applicantAadharNumber: string
    placeOfDeath: string
    deathDateandTime: Date
    deceasedFatherName: string
    deceasedMotherName: string
    deathType: string
    deceasedAadharCard: File | null
    applicantAadharCard: File | null
    deceasedRationCard: File | null
    deceasedPhoto: File | null
    deceasedMedicalCertificate: File | null
    pmReport: File | null
    fir: File | null
    officeId: string
    districtId: string
    slotDate?: Date | null
    slotId?: string
}

const validationSchema: ZodType<DeathFormSchema> = z.object({
    deceasedAadharNumber: z
        .string()
        .min(12, { message: 'Too short.' })
        .max(12, { message: 'Too long' }),
    applicantAadharNumber: z
        .string()
        .min(12, { message: 'Too short.' })
        .max(12, { message: 'Too long' }),
    placeOfDeath: z.string().min(1, { message: 'Death place is required' }),
    deathDateandTime: z.date({
        required_error: 'Death date and time is required',
    }),
    deceasedFatherName: z
        .string()
        .min(2, { message: "Father's name is required" }),
    deceasedMotherName: z
        .string()
        .min(2, { message: "Mother's name is required" }),
    deathType: z.enum(['naturaldeath', 'unnaturaldeath']),
    deceasedAadharCard: z
        .custom<File | null>()
        .refine((file) => file !== null, {
            message: "Deceased's Aadhar Card is require",
        }),
    applicantAadharCard: z
        .custom<File | null>()
        .refine((file) => file !== null, {
            message: "Applicant's Aadhar Card is require",
        }),
    deceasedRationCard: z
        .custom<File | null>()
        .refine((file) => file !== null, {
            message: 'Ration Card is require',
        }),
    deceasedPhoto: z.custom<File | null>().refine((file) => file !== null, {
        message: 'Deceased photo is require',
    }),
    deceasedMedicalCertificate: z
        .custom<File | null>()
        .refine((file) => file !== null, {
            message: 'Deceased Medical Certificate is required',
        }),
    pmReport: z.custom<File | null>().refine((file) => file !== null, {
        message: 'Post-Mortem Report is required',
    }),
    fir: z.custom<File | null>().refine((file) => file !== null, {
        message: 'FIR  is required',
    }),
    districtId: z.string().min(1, { message: 'District required' }),
    officeId: z.string().min(1, { message: 'Office required' }),
    slotDate: z
        .date({ required_error: 'Verification date is required' })
        .optional(),
    slotId: z
        .string()
        .min(1, { message: 'Verification time slot is required' })
        .optional(),
})
const DeathForm = () => {
    const navigate = useNavigate()
    const [deceasedAadharData, setDeceasedAadharData] =
        useState<Aadhar.Base | null>(null)
    const [applicantAadharData, setApplicantAadharData] =
        useState<Aadhar.Base | null>(null)

    const [deceasedOtp, setDeceasedOtp] = useState('')
    const [applicantOtp, setApplicantOtp] = useState('')

    const [deceasedVToken, setDeceasedVToken] = useState('')
    const [applicantVToken, setApplicantVToken] = useState('')

    const [districts, setDistricts] = useState<District.Detail[]>([])
    const [offices, setOffices] = useState<Office.Detail[]>([])
    const [department, setDepartment] = useState<Department.Detail[]>([])

    const [departmentId, setDepartmentId] = useState('')
    const [officedId, setOfficedId] = useState('')

    useEffect(() => {}, [departmentId])
    const forlocation = async () => {
        try {
            const disRes = await DistrictApis.list()
            const officeRes = await OfficeApis.list()
            const departmentRes = await DepartmentApis.list()

            const deptData = departmentRes.data || departmentRes || []

            setDistricts(disRes.data || disRes || [])
            setOffices(officeRes.data || officeRes || [])
            setDepartment(deptData)

            const deathDept = deptData.find((dept) => dept.name === 'Death')

            if (deathDept) {
                setDepartmentId(deathDept._id)
            }
        } catch (error) {
            toast.push(
                <Notification closable type="danger" duration={3000}>
                    Something went wrong!! Try again
                </Notification>,
            )
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
        watch,
        control,
    } = useForm<DeathFormSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            deceasedAadharNumber: '',
            applicantAadharNumber: '',
            deceasedFatherName: '',
            deceasedMotherName: '',
            deathDateandTime: undefined,
            placeOfDeath: '',
            deathType: '',
            deceasedAadharCard: null,
            applicantAadharCard: null,
            deceasedMedicalCertificate: null,
            fir: null,
            pmReport: null,
            deceasedPhoto: null,
            deceasedRationCard: null,
            slotDate: undefined,
            slotId: '',
            officeId: '',
            districtId: '',
        },
    })

    const currentSlotDate = watch('slotDate')

    //request for otp for Deceased
    const requestDeceasedOtp = async () => {
        try {
            const resp = await AuthApiService.requestOtp({
                aadharNumber: getValues('deceasedAadharNumber'),
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

    //request for otp for applicant(Applicant)
    const requestApplicantOtp = async () => {
        try {
            const resp = await AuthApiService.requestOtp({
                aadharNumber: getValues('applicantAadharNumber'),
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

    //verifying the otp and geting token and AadharData in Deceased
    const verifyDeceasedOtp = async () => {
        try {
            const resp = await AuthApiService.verifyOtp({
                aadharNumber: getValues('deceasedAadharNumber'),
                otp: deceasedOtp,
            })

            const verify =
                resp.data?.verificationToken || resp['verificationToken']

            if (verify) {
                setDeceasedVToken(verify)
            } else {
                console.log('there is no verification Token')
            }
            const aadata = resp?.data?.aadharDetails || resp?.aadharDetails

            if (aadata) {
                setDeceasedAadharData(aadata)
            } else {
                alert('there is no aadharData(Deceased).')
            }
        } catch (error) {
            alert('Error in  verifying OTP: ' + error)
        }
    }
    //verifying the otp and geting token and AadharData in applicant
    const verifyApplicantOtp = async () => {
        try {
            const resp = await AuthApiService.verifyOtp({
                aadharNumber: getValues('applicantAadharNumber'),
                otp: applicantOtp,
            })

            const verify =
                resp.data?.verificationToken || resp['verificationToken']

            if (verify) {
                setApplicantVToken(verify)
            } else {
                console.log('there is no verificationToken ')
            }
            const aadata = resp?.data?.aadharDetails || resp?.aadharDetails

            if (aadata) {
                setApplicantAadharData(aadata)
            } else {
                alert('there is no AadharData(Applicant).')
            }
        } catch (error) {
            alert('Error in verifying OTP: ' + error)
        }
    }

    const onSubmit = async (values: DeathFormSchema) => {
        try {
            const formData = new FormData()
            formData.append('deceasedAadharId', values.deceasedAadharNumber)
            formData.append('applicantAadharId', values.applicantAadharNumber)
            formData.append('deceasedMotherName', values.deceasedMotherName)
            formData.append('deceasedFatherName', values.deceasedFatherName)
            formData.append(
                'dateAndTimeOfDeath',
                values.deathDateandTime.toISOString(),
            )
            formData.append('placeOfDeath', values.placeOfDeath)
            formData.append('deathType', values.deathType)
            formData.append('deceasedVerificationToken', deceasedVToken)
            formData.append('applicantVerificationToken', applicantVToken)
            formData.append('slotId', String(values.slotId))

            // mapping function for mapping officeId and departmentId to officeDepartmentId
            const mappingResponse = await api.get(
                '/office-department/mapping',
                {
                    params: {
                        officeId: values.officeId,
                        departmentId,
                    },
                },
            )
            const mappingData = mappingResponse.data || mappingResponse

            if (mappingData?._id) {
                formData.append('officeDepartmentId', mappingData._id)
            } else {
                alert('Error occured in maping of officeDepartmentId.')
                return
            }
            if (values.deceasedAadharCard) {
                formData.append('deceasedAadharCard', values.deceasedAadharCard)
            }
            if (values.applicantAadharCard) {
                formData.append(
                    'applicantAadharCard',
                    values.applicantAadharCard,
                )
            }
            if (values.deceasedMedicalCertificate) {
                formData.append(
                    'deceasedMedicalCertificate',
                    values.deceasedMedicalCertificate,
                )
            }
            if (values.fir) {
                formData.append('fir', values.fir)
            }
            if (values.pmReport) {
                formData.append('pmReport', values.pmReport)
            }
            if (values.deceasedRationCard) {
                formData.append('deceasedRationCard', values.deceasedRationCard)
            }
            if (values.deceasedPhoto) {
                formData.append('deceasedPhoto', values.deceasedPhoto)
            }

            const res = await DeathApis.create(formData)
            if (res) {
                toast.push(
                    <Notification closable type="success" duration={3000}>
                        Death Certificate Registration successfully👍
                    </Notification>,
                )
            }

            navigate('/app/user/applications')
        } catch (error) {
            alert('error ocurred at time of application submittion' + error)
        }
    }

    return (
        <div className="max-w-6xl">
            <h2>Death Application</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* SECTION : Deceased's information  */}
                <Card className="mt-4">
                    <h4 className="mb-6">Deceased&apos;s Information</h4>
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-6 w-full">
                            <div className="flex gap-2 mt-6">
                                <FormItem
                                    asterisk
                                    label="Deceased Aadhar Id"
                                    invalid={Boolean(
                                        errors.deceasedAadharNumber,
                                    )}
                                    errorMessage={
                                        errors.deceasedAadharNumber?.message
                                    }
                                >
                                    <Controller
                                        name="deceasedAadharNumber"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                prefix={
                                                    <HiOutlineUser className="text-lg" />
                                                }
                                                placeholder="e.g. 1234 1234 1234"
                                                autoComplete="off"
                                                className="w-110"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                                <Button
                                    type="button"
                                    variant="solid"
                                    className="h-[48px] mt-7"
                                    onClick={requestDeceasedOtp}
                                >
                                    Send
                                </Button>
                            </div>

                            <div className="pr-2">
                                <h6 className="ml-1">OTP Verification</h6>
                                <p className="ml-1">
                                    We have sent you One Time Password to your
                                    email.
                                </p>

                                <div className="flex gap-2 justify-evenly">
                                    <OtpInput
                                        value={deceasedOtp}
                                        placeholder=""
                                        inputClass="h-[58px]"
                                        length={6}
                                        onChange={(val) => setDeceasedOtp(val)}
                                    />

                                    <Button
                                        block
                                        variant="solid"
                                        type="button"
                                        className="h-[58px] flex items-center justify-center"
                                        onClick={verifyDeceasedOtp}
                                    >
                                        <BiCheckShield className="w-9 h-9" />
                                    </Button>
                                </div>
                                <div className="text-center">
                                    <span className="font-semibold">
                                        Didn&apos;t receive OTP?
                                    </span>
                                    <button
                                        className="heading-text font-bold underline"
                                        type="button"
                                        onClick={requestDeceasedOtp}
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </div>
                        </div>
                        {deceasedAadharData && (
                            <>
                                <div className="grid grid-cols-6 gap-2 w-full">
                                    <div className="col-span-3 ">
                                        <div>
                                            <p className="font-semibold mb-2">
                                                Deceased&apos;s Name
                                            </p>
                                            <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 font-semibold text-black cursor-not-allowed">
                                                {deceasedAadharData?.firstName}{' '}
                                                {deceasedAadharData?.middleName}{' '}
                                                {deceasedAadharData?.lastName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-span-2 col-start-4 ">
                                        <p className="font-semibold mb-2">
                                            Deceased&apos;s Date of Birth
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-black font-semibold  cursor-not-allowed">
                                            {deceasedAadharData?.dob}
                                        </p>
                                    </div>
                                    <div className="col-start-6 ">
                                        <p className="font-semibold mb-2">
                                            Gender
                                        </p>
                                        <p className=" w-full h-[48px] p-3 rounded-xl bg-gray-100 text-black font-semibold  cursor-not-allowed">
                                            {deceasedAadharData?.gender}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-2 w-full">
                                    <div className="col-span-4 ">
                                        <p className="font-semibold mb-2">
                                            Deceased&apos;s Perment Address
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 font-semibold text-black cursor-not-allowed">
                                            {deceasedAadharData?.street}
                                            {', '}
                                            {deceasedAadharData?.city}
                                            {', '}
                                            {deceasedAadharData?.district}
                                            {', '}
                                            {deceasedAadharData?.state} {'-'}{' '}
                                            {deceasedAadharData?.pinCode}
                                        </p>
                                    </div>
                                    <div className="col-start-5 col-span-1">
                                        <FormItem
                                            asterisk
                                            label="Select District"
                                            className=" flex-1"
                                        >
                                            <Controller
                                                name="districtId"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        placeholder="Select District"
                                                        options={districts.map(
                                                            (item) => ({
                                                                label: item.name,
                                                                value: item._id,
                                                            }),
                                                        )}
                                                        onChange={(option) =>
                                                            field.onChange(
                                                                option?.value ||
                                                                    '',
                                                            )
                                                        }
                                                        value={districts
                                                            .map((dis) => ({
                                                                label: dis.name,
                                                                value: dis._id,
                                                            }))
                                                            .find(
                                                                (dis) =>
                                                                    dis.value ===
                                                                    field.value,
                                                            )}
                                                    />
                                                )}
                                            />
                                        </FormItem>
                                    </div>
                                    <div className="col-start-6 col-span-1">
                                        <FormItem
                                            asterisk
                                            label="Select Office"
                                            className="flex-1"
                                        >
                                            <Controller
                                                name="officeId"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        placeholder="Select Office"
                                                        options={offices.map(
                                                            (item) => ({
                                                                label: item.name,
                                                                value: item._id,
                                                            }),
                                                        )}
                                                        onChange={(option) => {
                                                            const selectedVal =
                                                                option?.value ||
                                                                ''
                                                            field.onChange(
                                                                selectedVal,
                                                            )
                                                            setOfficedId(
                                                                selectedVal,
                                                            )
                                                        }}
                                                        value={offices
                                                            .map((office) => ({
                                                                label: office.name,
                                                                value: office._id,
                                                            }))
                                                            .find(
                                                                (office) =>
                                                                    office.value ===
                                                                    field.value,
                                                            )}
                                                    />
                                                )}
                                            />
                                        </FormItem>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="grid grid-cols-3 gap-2 w-full">
                            <div className="col-span-1 ">
                                <FormItem
                                    asterisk
                                    label="Place Of Death"
                                    invalid={Boolean(errors.placeOfDeath)}
                                    errorMessage={errors.placeOfDeath?.message}
                                >
                                    <Controller
                                        name="placeOfDeath"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                placeholder="e.g. Flat 101, Shree Residency, Sector 21, Gandhinagar, Gujarat"
                                                autoComplete="off"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                            <div className="col-span-1 col-start-2 ">
                                <FormItem
                                    asterisk
                                    label="Date & Time of Death"
                                    invalid={Boolean(errors.deathDateandTime)}
                                    errorMessage={
                                        errors.deathDateandTime?.message
                                    }
                                >
                                    <Controller
                                        name="deathDateandTime"
                                        control={control}
                                        render={({ field }) => (
                                            <DateTimepicker
                                                placeholder="Pick a date and time"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                            <div className="col-span-1 col-start-3 ">
                                <FormItem
                                    asterisk
                                    label="Death Type"
                                    invalid={Boolean(errors.deathType)}
                                    errorMessage={errors.deathType?.message}
                                >
                                    <Controller
                                        name="deathType"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                placeholder="Please Select"
                                                options={deathType}
                                                value={
                                                    deathType.find(
                                                        (opt) =>
                                                            opt.value ===
                                                            field.value,
                                                    ) || null
                                                }
                                                onChange={(option) =>
                                                    field.onChange(
                                                        option?.value || '',
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 w-full">
                            <div className="col-span-1 ">
                                <FormItem
                                    asterisk
                                    label="Deceased's Mother Name"
                                    invalid={Boolean(errors.deceasedMotherName)}
                                    errorMessage={
                                        errors.deceasedMotherName?.message
                                    }
                                >
                                    <Controller
                                        name="deceasedMotherName"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                placeholder="e.g. Johnnita Doe"
                                                autoComplete="off"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                            <div className="col-span-1 col-start-2 ">
                                <FormItem
                                    asterisk
                                    label="Deceased's Father Name"
                                    invalid={Boolean(errors.deceasedFatherName)}
                                    errorMessage={
                                        errors.deceasedFatherName?.message
                                    }
                                >
                                    <Controller
                                        name="deceasedFatherName"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                placeholder="e.g. John Doe"
                                                autoComplete="off"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </Card>
                {/* SECTION : Applicant's information  */}
                <Card className="mt-4">
                    <h4 className="mb-6 ">Applicant&apos;s Information</h4>

                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-6 w-full">
                            <div className="flex gap-2 mt-6">
                                <FormItem
                                    asterisk
                                    label="Applicant Aadhar Id"
                                    invalid={Boolean(
                                        errors.applicantAadharNumber,
                                    )}
                                    errorMessage={
                                        errors.applicantAadharNumber?.message
                                    }
                                >
                                    <Controller
                                        name="applicantAadharNumber"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                prefix={
                                                    <HiOutlineUser className="text-lg" />
                                                }
                                                placeholder="e.g. 1234 1234 1234"
                                                autoComplete="off"
                                                className="w-110"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                                <Button
                                    type="button"
                                    variant="solid"
                                    className="h-[48px] mt-7"
                                    onClick={requestApplicantOtp}
                                >
                                    Send
                                </Button>
                            </div>

                            <div className="pr-2">
                                <h6 className="ml-1">OTP Verification</h6>
                                <p className="ml-1">
                                    We have sent you One Time Password to your
                                    email.
                                </p>
                                <div className="flex gap-2 justify-evenly">
                                    <OtpInput
                                        value={applicantOtp}
                                        placeholder=""
                                        inputClass="h-[58px]"
                                        length={6}
                                        onChange={(val) => setApplicantOtp(val)}
                                    />

                                    <Button
                                        block
                                        variant="solid"
                                        type="button"
                                        className="h-[58px] flex items-center justify-center"
                                        onClick={verifyApplicantOtp}
                                    >
                                        <BiCheckShield className="w-9 h-9" />
                                    </Button>
                                </div>
                                <div className=" text-center">
                                    <span className="font-semibold">
                                        Didn&apos;t receive OTP?{' '}
                                    </span>
                                    <button
                                        className="heading-text font-bold underline"
                                        type="button"
                                        onClick={requestApplicantOtp}
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </div>
                        </div>
                        {applicantAadharData && (
                            <>
                                <div className="grid grid-cols-3 gap-2 w-full">
                                    <div className="col-span-1 ">
                                        <div>
                                            <p className="font-semibold mb-2">
                                                Applicant&apos;s Name
                                            </p>
                                            <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 font-semibold text-black cursor-not-allowed">
                                                {applicantAadharData?.firstName}{' '}
                                                {
                                                    applicantAadharData?.middleName
                                                }{' '}
                                                {applicantAadharData?.lastName}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-span-1 col-start-2 ">
                                        <p className="font-semibold mb-2">
                                            Applicant&apos;s Date of Birth
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-black font-semibold  cursor-not-allowed">
                                            {applicantAadharData?.dob}
                                        </p>
                                    </div>

                                    <div className="col-span-1 col-start-3 ">
                                        <p className="font-semibold mb-2">
                                            Gender
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-black font-semibold  cursor-not-allowed">
                                            {applicantAadharData?.gender}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 w-full">
                                    <div className="col-span-1 ">
                                        <p className="font-semibold mb-2">
                                            Applicant&apos;s Mobile Number
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-black font-semibold  cursor-not-allowed">
                                            {applicantAadharData?.contact}
                                        </p>
                                    </div>
                                    <div className="col-span-1 col-start-2 ">
                                        <p className="font-semibold mb-2">
                                            Applicant&apos;s Email Id
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-black font-semibold  cursor-not-allowed">
                                            {applicantAadharData?.email}
                                        </p>
                                    </div>
                                    <div className="col-span-1 col-start-3 ">
                                        <p className="font-semibold mb-2">
                                            Applicant&apos;s Perment Address
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 font-semibold text-black cursor-not-allowed">
                                            {applicantAadharData?.street}
                                            {', '}
                                            {applicantAadharData?.city}
                                            {', '}
                                            {applicantAadharData?.district}
                                            {', '}
                                            {applicantAadharData?.state} {'-'}{' '}
                                            {applicantAadharData?.pinCode}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </Card>
                {/* SECTION : upload documents */}
                <Card className="mt-6">
                    <h4 className="mb-6">Upload Documents</h4>
                    <FormItem
                        asterisk
                        label="Deceased's Aadhar Card"
                        invalid={Boolean(errors.deceasedAadharCard)}
                        errorMessage={errors.deceasedAadharCard?.message}
                    >
                        <Controller
                            name="deceasedAadharCard"
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
                        label="Applicants's Aadhar Card"
                        invalid={Boolean(errors.applicantAadharCard)}
                        errorMessage={errors.applicantAadharCard?.message}
                    >
                        <Controller
                            name="applicantAadharCard"
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
                        label="Deceased's Ration Card"
                        invalid={Boolean(errors.deceasedRationCard)}
                        errorMessage={errors.deceasedRationCard?.message}
                    >
                        <Controller
                            name="deceasedRationCard"
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
                        label="Deceased's Photograph"
                        invalid={Boolean(errors.deceasedPhoto)}
                        errorMessage={errors.deceasedPhoto?.message}
                    >
                        <Controller
                            name="deceasedPhoto"
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
                        label="Deceased Medical Certificate"
                        invalid={Boolean(errors.deceasedMedicalCertificate)}
                        errorMessage={
                            errors.deceasedMedicalCertificate?.message
                        }
                    >
                        <Controller
                            name="deceasedMedicalCertificate"
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
                        label="PostMortom Report"
                        invalid={Boolean(errors.pmReport)}
                        errorMessage={errors.pmReport?.message}
                    >
                        <Controller
                            name="pmReport"
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
                        label="FIR"
                        invalid={Boolean(errors.fir)}
                        errorMessage={errors.fir?.message}
                    >
                        <Controller
                            name="fir"
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
                </Card>
                {/* SECTION : Verification Slot Selection */}
                <SlotSelection
                    control={control}
                    errors={errors}
                    departmentId={departmentId}
                    officeId={officedId}
                    slotDateValue={currentSlotDate}
                />
                <div className="my-4 flex justify-center ">
                    <Button variant="solid" type="submit">
                        Submit Application
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default DeathForm
