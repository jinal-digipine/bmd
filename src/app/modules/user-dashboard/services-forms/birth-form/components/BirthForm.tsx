import {
    Button,
    FormItem,
    Input,
    Select,
    Upload,
    Card,
    Notification,
    toast,
} from '@/components/ui'
import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/Form'
import { BiCheckShield } from 'react-icons/bi'
import { OtpInput } from '@/components/shared'
import { HiOutlineUser } from 'react-icons/hi'
import DateTimepicker from '@/components/ui/DatePicker/DateTimepicker'
import { genders } from '@/app/common/components/gender-list/genders'
import SlotSelection from '@/app/common/components/slot-booking/SlotSelection'
import { District } from '@/app/@api/district-module/district.types'
import { Aadhar } from '@/app/@api/aadhar/aadhar.types'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import { Office } from '@/app/@api/office-module/office.types'
import { useNavigate } from 'react-router'
import { DistrictApis } from '@/app/@api/district-module/district.api'
import { OfficeApis } from '@/app/@api/office-module/office.api'
import { AuthApiService } from '@/app/@api/auth/authT.api'
import { DepartmentApis } from '@/app/@api/department-module/department.api'
import { Department } from '@/app/@api/department-module/department.types'
import { BirthApis } from '@/app/@api/birth-module/birth.api'
import api from '@/app/@api/api'

type BirthFormSchema = {
    babyName: string
    birthDateandTime: Date
    birthPlace: string
    babyGender: string
    babyWeight: number
    fatherAadharNumber: string
    motherAadharNumber: string
    fatherAadharCard: File | null
    motherAadharCard: File | null
    marriageCertificate: File | null
    birthHospitalReport: File | null
    rationCard: File | null
    officeId: string
    districtId: string
    slotDate?: Date | null
    slotId?: string
}
const validationSchema: ZodType<BirthFormSchema> = z.object({
    babyName: z.string().min(2, { message: "Baby's name is required" }),
    birthDateandTime: z.date({
        required_error: 'Birth date and time is required',
    }),
    birthPlace: z.string().min(1, { message: 'Birth place is required' }),
    babyWeight: z.number(),
    babyGender: z.string().min(1, { message: 'Gender is required' }),
    motherAadharNumber: z
        .string()
        .min(12, { message: 'Too short.' })
        .max(12, { message: 'Too long' }),
    fatherAadharNumber: z
        .string()
        .min(12, { message: 'Too short.' })
        .max(12, { message: 'Too long' }),
    districtId: z.string().min(1, { message: 'District required' }),
    officeId: z.string().min(1, { message: 'Office required' }),

    motherAadharCard: z.custom<File | null>().refine((file) => file !== null, {
        message: "Mother's Aadhar Card is require",
    }),
    fatherAadharCard: z.custom<File | null>().refine((file) => file !== null, {
        message: "Father's Aadhar Card is required",
    }),
    marriageCertificate: z
        .custom<File | null>()
        .refine((file) => file !== null, {
            message: 'Marriage Certificate is required',
        }),
    birthHospitalReport: z
        .custom<File | null>()
        .refine((file) => file !== null, {
            message: 'Hospital Report of Birth is required',
        }),
    rationCard: z.custom<File | null>().refine((file) => file !== null, {
        message: 'Ration Card is required',
    }),
    slotDate: z
        .date({ required_error: 'Verification date is required' })
        .optional(),
    slotId: z
        .string()
        .min(1, { message: 'Verification time slot is required' })
        .optional(),
})

const BirthForm = () => {
    const navigate = useNavigate()
    const [motherAadharData, setMotherAadharData] =
        useState<Aadhar.Base | null>(null)
    const [fatherAadharData, setFatherAadharData] =
        useState<Aadhar.Base | null>(null)

    const [motherOtp, setMotherOtp] = useState('')
    const [fatherOtp, setFatherOtp] = useState('')
    const [motherVToken, setMotherVToken] = useState('')
    const [fatherVToken, setFatherVToken] = useState('')

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

            const birthDept = deptData.find((dept) => dept.name === 'Birth')

            if (birthDept) {
                setDepartmentId(birthDept._id)
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
    } = useForm<BirthFormSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            babyName: '',
            birthDateandTime: undefined,
            birthPlace: '',
            babyGender: '',
            babyWeight: undefined,
            motherAadharNumber: '',
            fatherAadharNumber: '',
            officeId: '',
            districtId: '',
            fatherAadharCard: null,
            motherAadharCard: null,
            marriageCertificate: null,
            birthHospitalReport: null,
            rationCard: null,

            slotDate: undefined,
            slotId: '',
        },
    })

    const currentSlotDate = watch('slotDate')

    //request for otp for mother
    const requestMotherOtp = async () => {
        try {
            const resp = await AuthApiService.requestOtp({
                aadharNumber: getValues('motherAadharNumber'),
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
    //for father request otp
    const requestFatherOtp = async () => {
        try {
            const resp = await AuthApiService.requestOtp({
                aadharNumber: getValues('fatherAadharNumber'),
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

    //verifying the otp and geting token in mother

    const verifyMotherOtp = async () => {
        try {
            const resp = await AuthApiService.verifyOtp({
                aadharNumber: getValues('motherAadharNumber'),
                otp: motherOtp,
            })

            const verify =
                resp.data?.verificationToken || resp['verificationToken']

            if (verify) {
                setMotherVToken(verify)
            } else {
                alert('no verificationToken is there')
            }

            const aadata = resp?.data?.aadharDetails || resp?.aadharDetails

            if (aadata) {
                setMotherAadharData(aadata)
            } else {
                alert('no adharData is available(Mother).')
            }
        } catch (error) {
            alert('Error occured in verifyOtp:' + error)
        }
    }
    //verifying the otp and geting token in father

    const verifyFatherOtp = async () => {
        try {
            const resp = await AuthApiService.verifyOtp({
                aadharNumber: getValues('fatherAadharNumber'),
                otp: fatherOtp,
            })

            const verify =
                resp.data?.verificationToken || resp['verificationToken']

            if (verify) {
                setFatherVToken(verify)
            } else {
                alert('no verificationToken is there')
            }
            const aadata = resp?.data?.aadharDetails || resp?.aadharDetails

            if (aadata) {
                setFatherAadharData(aadata)
            } else {
                alert('there is not aadharData (Father).')
            }
        } catch (error) {
            alert('Error occured in verifyOtp:' + error)
        }
    }

    //onsubmit function with using formdata
    const onSubmit = async (values: BirthFormSchema) => {
        try {
            const formData = new FormData()
            formData.append('babyName', values.babyName)
            formData.append(
                'birthDateAndTime',
                values.birthDateandTime.toISOString(),
            )
            formData.append('birthPlace', values.birthPlace)
            formData.append('babyGender', values.babyGender)
            formData.append('babyWeight', String(values.babyWeight))
            formData.append('fatherAadharId', values.fatherAadharNumber)
            formData.append('motherAadharId', values.motherAadharNumber)
            formData.append('motherVerificationToken', motherVToken)
            formData.append('fatherVerificationToken', fatherVToken)
            formData.append('slotId', String(values.slotId))

            //mapping officeId and departmentId values into officeDepartmentId
            const mappingRes = await api.get('/office-department/mapping', {
                params: {
                    officeId: values.officeId,
                    departmentId,
                },
            })
            const mapData = mappingRes.data || mappingRes

            if (mapData?._id) {
                formData.append('officeDepartmentId', mapData._id)
            } else {
                alert('Error ocuured in officeDepartmentId mapping')
                return
            }

            if (values.motherAadharCard) {
                formData.append('motherAadharCard', values.motherAadharCard)
            }
            if (values.fatherAadharCard) {
                formData.append('fatherAadharCard', values.fatherAadharCard)
            }
            if (values.marriageCertificate) {
                formData.append(
                    'marriageCertificate',
                    values.marriageCertificate,
                )
            }
            if (values.birthHospitalReport) {
                formData.append(
                    'birthHospitalReport',
                    values.birthHospitalReport,
                )
            }
            if (values.rationCard) {
                formData.append('rationCard', values.rationCard)
            }

            const res = await BirthApis.create(formData)

            if (res) {
                toast.push(
                    <Notification closable type="success" duration={3000}>
                        Birth Certificate Registration successfully🥳
                    </Notification>,
                )
            }

            navigate('/app/user/applications')
        } catch (error) {
            alert(
                'Error occured at time of submitting Birth-Application-Form:' +
                    error,
            )
        }
    }
    return (
        <div className="max-w-6xl">
            <h2>Birth Application</h2>

            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* SECTION : baby's information  */}
                <Card className="mt-4">
                    <h4 className="mb-6 ">Baby&apos;s Information</h4>
                    <div className="grid grid-cols-6 grid-rows-3 gap-x-4">
                        <div className="col-span-6">
                            <FormItem
                                asterisk
                                label="Baby Name"
                                invalid={Boolean(errors.babyName)}
                                errorMessage={errors.babyName?.message}
                            >
                                <Controller
                                    name="babyName"
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
                        <div className="col-span-2 row-start-2">
                            <FormItem
                                asterisk
                                label="Date & Time of Birth"
                                invalid={Boolean(errors.birthDateandTime)}
                                errorMessage={errors.birthDateandTime?.message}
                            >
                                <Controller
                                    name="birthDateandTime"
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
                        <div className="col-span-2 col-start-3 row-start-2">
                            <FormItem
                                asterisk
                                label="Baby's Birth Weight"
                                invalid={Boolean(errors.babyWeight)}
                                errorMessage={errors.babyWeight?.message}
                            >
                                <Controller
                                    name="babyWeight"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="number"
                                            placeholder="e.g. 3.4 (in kg) "
                                            autoComplete="off"
                                            value={field.value ?? ''}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.value
                                                        ? Number(e.target.value)
                                                        : undefined,
                                                )
                                            }
                                        />
                                    )}
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-2 col-start-5 row-start-2">
                            <FormItem
                                asterisk
                                label="Gender"
                                invalid={Boolean(errors.babyGender)}
                                errorMessage={errors.babyGender?.message}
                            >
                                <Controller
                                    name="babyGender"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            placeholder="Please Select"
                                            options={genders}
                                            value={genders.find(
                                                (opt) =>
                                                    opt.value === field.value,
                                            )}
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
                        <div className="col-span-4 row-start-3">
                            <FormItem
                                asterisk
                                label="Place Of Birth"
                                invalid={Boolean(errors.birthPlace)}
                                errorMessage={errors.birthPlace?.message}
                            >
                                <Controller
                                    name="birthPlace"
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
                        <div className="col-start-5 row-start-3">
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
                                            options={districts.map((item) => ({
                                                label: item.name,
                                                value: item._id,
                                            }))}
                                            onChange={(option) =>
                                                field.onChange(
                                                    option?.value || '',
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
                        <div className="col-start-6 row-start-3">
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
                                            options={offices.map((item) => ({
                                                label: item.name,
                                                value: item._id,
                                            }))}
                                            onChange={(option) => {
                                                const selectedVal =
                                                    option?.value || ''
                                                field.onChange(selectedVal)
                                                setOfficedId(selectedVal)
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
                </Card>
                {/* SECTION : parents information */}
                <Card className="mt-6">
                    <h4 className="mb-6">Parents Information</h4>
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-6 w-full">
                            <div className="flex gap-2 ">
                                <FormItem
                                    asterisk
                                    label="Mother Aadhar Id"
                                    invalid={Boolean(errors.motherAadharNumber)}
                                    errorMessage={
                                        errors.motherAadharNumber?.message
                                    }
                                >
                                    <Controller
                                        name="motherAadharNumber"
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
                                    onClick={requestMotherOtp}
                                >
                                    Send
                                </Button>
                            </div>

                            <div className="flex gap-2">
                                <FormItem
                                    asterisk
                                    label="Father Aadhar Id"
                                    invalid={Boolean(errors.fatherAadharNumber)}
                                    errorMessage={
                                        errors.fatherAadharNumber?.message
                                    }
                                >
                                    <Controller
                                        name="fatherAadharNumber"
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
                                    onClick={requestFatherOtp}
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 w-full">
                            {/* OTP field */}
                            <div className="pr-2">
                                <h6 className="ml-6">OTP Verification</h6>
                                <p className="ml-6">
                                    We have sent you One Time Password to your
                                    email.
                                </p>

                                <div className="flex gap-x-3 ">
                                    <OtpInput
                                        value={motherOtp}
                                        placeholder=""
                                        inputClass="h-[58px]"
                                        length={6}
                                        onChange={(val) => setMotherOtp(val)}
                                    />

                                    <Button
                                        block
                                        variant="solid"
                                        type="button"
                                        className="h-[58px] flex items-center justify-center"
                                        onClick={verifyMotherOtp}
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
                                        onClick={requestMotherOtp}
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </div>
                            <div className=" pr-2">
                                {/* OTP field */}
                                <h6 className="ml-6">OTP Verification</h6>
                                <p className="ml-6">
                                    We have sent you One Time Password to your
                                    email.
                                </p>
                                <div className="flex gap-x-3 justify-evenly">
                                    <OtpInput
                                        value={fatherOtp}
                                        placeholder=""
                                        inputClass="h-[58px]"
                                        length={6}
                                        onChange={(val) => setFatherOtp(val)}
                                    />

                                    <Button
                                        block
                                        variant="solid"
                                        type="button"
                                        className="h-[58px] flex items-center justify-center"
                                        onClick={verifyFatherOtp}
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
                                        onClick={requestFatherOtp}
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* fields from aadharcard */}
                        {(motherAadharData || fatherAadharData) && (
                            <>
                                <div className="grid grid-cols-2 gap-6 w-full">
                                    <div>
                                        <p className="font-semibold mb-2">
                                            Mother Name
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 font-semibold text-gray-900 cursor-not-allowed mr-20">
                                            {motherAadharData?.firstName}{' '}
                                            {motherAadharData?.middleName}{' '}
                                            {motherAadharData?.lastName}{' '}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-2">
                                            Father Name
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 font-semibold text-gray-900 cursor-not-allowed">
                                            {fatherAadharData?.firstName}{' '}
                                            {fatherAadharData?.middleName}{' '}
                                            {fatherAadharData?.lastName}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6 w-full">
                                    <div>
                                        <p className="font-semibold mb-2">
                                            Mother Mobile Number
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-gray-900 font-semibold  cursor-not-allowed">
                                            {'+91 '} {motherAadharData?.contact}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-2">
                                            Father Mobile Number
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-gray-900 font-semibold  cursor-not-allowed">
                                            {'+91 '} {fatherAadharData?.contact}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6 w-full">
                                    <div>
                                        <p className="font-semibold mb-2">
                                            Mother Email Id
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-gray-900 font-semibold  cursor-not-allowed">
                                            {motherAadharData?.email}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-2">
                                            Father Email Id
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-gray-900 font-semibold  cursor-not-allowed">
                                            {fatherAadharData?.email}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="font-semibold mb-2">
                                        Perment Address
                                    </p>
                                    <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 font-semibold text-gray-900 cursor-not-allowed">
                                        {fatherAadharData?.street}
                                        {', '}
                                        {fatherAadharData?.city}
                                        {', '}
                                        {fatherAadharData?.district}
                                        {', '}
                                        {fatherAadharData?.state} {''}
                                        {'- '}
                                        {fatherAadharData?.pinCode}
                                    </p>
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
                        label="Mother's Aadhar Card"
                        invalid={Boolean(errors.motherAadharCard)}
                        errorMessage={errors.motherAadharCard?.message}
                    >
                        <Controller
                            name="motherAadharCard"
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
                        label="Father's Aadhar Card"
                        invalid={Boolean(errors.fatherAadharCard)}
                        errorMessage={errors.fatherAadharCard?.message}
                    >
                        <Controller
                            name="fatherAadharCard"
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
                        label="Marriage Certificate"
                        invalid={Boolean(errors.marriageCertificate)}
                        errorMessage={errors.marriageCertificate?.message}
                    >
                        <Controller
                            name="marriageCertificate"
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
                        label="Hospital Birth Report"
                        invalid={Boolean(errors.birthHospitalReport)}
                        errorMessage={errors.birthHospitalReport?.message}
                    >
                        <Controller
                            name="birthHospitalReport"
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
                        label="Ration Card"
                        invalid={Boolean(errors.rationCard)}
                        errorMessage={errors.rationCard?.message}
                    >
                        <Controller
                            name="rationCard"
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

                {/* SECTION : verification slot selection */}
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
export default BirthForm
