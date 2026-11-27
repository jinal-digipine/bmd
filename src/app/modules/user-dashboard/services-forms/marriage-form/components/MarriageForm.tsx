import { OtpInput } from '@/components/shared'
import {
    Button,
    Card,
    DatePicker,
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
import { Form } from '@/components/ui/Form'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import { useNavigate } from 'react-router'
import { Aadhar } from '@/app/@api/aadhar/aadhar.types'
import { District } from '@/app/@api/district-module/district.types'
import { DistrictApis } from '@/app/@api/district-module/district.api'
import { AuthApiService } from '@/app/@api/auth/authT.api'
import { OfficeApis } from '@/app/@api/office-module/office.api'
import { Office } from '@/app/@api/office-module/office.types'
import { DepartmentApis } from '@/app/@api/department-module/department.api'
import { Department } from '@/app/@api/department-module/department.types'
import { MarriageApis } from '@/app/@api/marriage-module/marriage.api'
import api from '@/app/@api/api'
import SlotSelection from '@/app/common/components/slot-booking/SlotSelection'

type MarriageFormSchema = {
    brideAadharNumber: string
    groomAadharNumber: string
    witnessAadharNumber: string
    brahmanAadharNumber: string
    brideFatherName: string
    brideMotherName: string
    groomFatherName: string
    groomMotherName: string
    witnessRelation: string
    marriageDate: Date
    marriagePlace: string
    districtId: string
    officeId: string
    brideAadharCard: File | null
    groomAadharCard: File | null
    witnessAadharCard: File | null
    brahmanAadharCard: File | null
    brideRationCard: File | null
    groomRationCard: File | null
    bridePhoto: File | null
    groomPhoto: File | null
    invitationCard: File | null
    slotDate?: Date | null
    slotId?: string
}

const validationSchema: ZodType<MarriageFormSchema> = z.object({
    brideAadharNumber: z
        .string()
        .min(12, { message: 'Too short.' })
        .max(12, { message: 'Too long' }),
    groomAadharNumber: z
        .string()
        .min(12, { message: 'Too short.' })
        .max(12, { message: 'Too long' }),
    witnessAadharNumber: z
        .string()
        .min(12, { message: 'Too short.' })
        .max(12, { message: 'Too long' }),
    brahmanAadharNumber: z
        .string()
        .min(12, { message: 'Too short.' })
        .max(12, { message: 'Too long' }),
    brideMotherName: z
        .string()
        .min(2, { message: "bride's mother name is required" }),
    brideFatherName: z
        .string()
        .min(2, { message: "bride's father name is required" }),
    groomMotherName: z
        .string()
        .min(2, { message: "groom's mother name is required" }),
    groomFatherName: z
        .string()
        .min(2, { message: "groom's father name is required" }),
    witnessRelation: z
        .string()
        .min(2, { message: 'relation with witness is required' }),
    marriageDate: z.date({
        required_error: 'marriage date is required',
    }),
    marriagePlace: z.string().min(1, { message: 'Marriage place is required' }),
    districtId: z.string().min(1, { message: 'District required' }),
    officeId: z.string().min(1, { message: 'Office required' }),

    brideAadharCard: z.custom<File | null>().refine((file) => file !== null, {
        message: "bride's Aadhar Card is require",
    }),
    groomAadharCard: z.custom<File | null>().refine((file) => file !== null, {
        message: "groom's Aadhar Card is require",
    }),
    witnessAadharCard: z.custom<File | null>().refine((file) => file !== null, {
        message: "witness's Aadhar Card is require",
    }),
    brahmanAadharCard: z.custom<File | null>().refine((file) => file !== null, {
        message: "priest's Aadhar Card is require",
    }),
    brideRationCard: z.custom<File | null>().refine((file) => file !== null, {
        message: ' brides Ration Card is require',
    }),
    groomRationCard: z.custom<File | null>().refine((file) => file !== null, {
        message: ' groom Ration Card is require',
    }),
    bridePhoto: z.custom<File | null>().refine((file) => file !== null, {
        message: 'bride photo is require',
    }),
    groomPhoto: z.custom<File | null>().refine((file) => file !== null, {
        message: 'groom photo is require',
    }),

    invitationCard: z.custom<File | null>().refine((file) => file !== null, {
        message: 'Marriage Card is required',
    }),
    slotDate: z.date().optional(),
    slotId: z
        .string()
        .min(1, { message: 'Verification time slot is required' })
        .optional(),
})

const MarriageForm = () => {
    const navigate = useNavigate()
    const [brideAadharData, setBrideAadharData] = useState<Aadhar.Base | null>(
        null,
    )
    const [groomAadharData, setGroomAadharData] = useState<Aadhar.Base | null>(
        null,
    )
    const [witnessAadharData, setWitnessAadharData] =
        useState<Aadhar.Base | null>(null)
    const [brahmanAadharData, setBrahmanAadharData] =
        useState<Aadhar.Base | null>(null)

    const [brideOtp, setBrideOtp] = useState('')
    const [groomOtp, setGroomOtp] = useState('')
    const [witnessOtp, setWitnessOtp] = useState('')
    const [brahmanOtp, setBrahmanOtp] = useState('')

    const [brideVToken, setBrideVToken] = useState('')
    const [groomVToken, setGroomVToken] = useState('')
    const [witnessVToken, setWitnessVToken] = useState('')
    const [brahmanVToken, setBrahmanVToken] = useState('')

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
            setDepartment(deptData)
            setDistricts(disRes.data || disRes || [])
            setOffices(officeRes.data || officeRes || [])

            const deathDept = deptData.find((dept) => dept.name === 'Marriage')

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
    } = useForm<MarriageFormSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            brideAadharNumber: '',
            groomAadharNumber: '',
            witnessAadharNumber: '',
            brahmanAadharNumber: '',
            brideMotherName: '',
            brideFatherName: '',
            groomMotherName: '',
            groomFatherName: '',
            witnessRelation: '',
            marriagePlace: '',
            marriageDate: undefined,
            districtId: '',
            brideAadharCard: null,
            groomAadharCard: null,
            witnessAadharCard: null,
            brahmanAadharCard: null,
            invitationCard: null,
            bridePhoto: null,
            groomPhoto: null,
            brideRationCard: null,
            groomRationCard: null,

            slotDate: undefined,
            slotId: '',
        },
    })
    const currentSlotDate = watch('slotDate')

    //request for otp for Bride
    const requestBrideOtp = async () => {
        try {
            const resp = await AuthApiService.requestOtp({
                aadharNumber: getValues('brideAadharNumber'),
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

    //request for otp for Groom
    const requestGroomOtp = async () => {
        try {
            const resp = await AuthApiService.requestOtp({
                aadharNumber: getValues('groomAadharNumber'),
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

    //request for otp for Witness
    const requestWitnessOtp = async () => {
        try {
            const resp = await AuthApiService.requestOtp({
                aadharNumber: getValues('witnessAadharNumber'),
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

    //request for otp for Priest
    const requestBrahmanOtp = async () => {
        try {
            const resp = await AuthApiService.requestOtp({
                aadharNumber: getValues('brahmanAadharNumber'),
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

    //verifying the otp and geting token and adharData in Bride

    const verifyBrideOtp = async () => {
        try {
            const resp = await AuthApiService.verifyOtp({
                aadharNumber: getValues('brideAadharNumber'),
                otp: brideOtp,
            })
            const verify =
                resp.data?.verificationToken || resp['verificationToken']

            if (verify) {
                setBrideVToken(verify)
            } else {
                alert('there is no verification token ')
            }

            const aadata = resp?.data?.aadharDetails || resp?.aadharDetails

            if (aadata) {
                setBrideAadharData(aadata)
            } else {
                alert('there is no adharData(Bride).')
            }
        } catch (error) {
            alert('Error in verifying OTP: ' + error)
        }
    }

    //verifying the otp and geting token and adharData in Groom

    const verifyGroomOtp = async () => {
        try {
            const resp = await AuthApiService.verifyOtp({
                aadharNumber: getValues('groomAadharNumber'),
                otp: groomOtp,
            })
            const verify =
                resp.data?.verificationToken || resp['verificationToken']

            if (verify) {
                setGroomVToken(verify)
            } else {
                alert('there is no verification token.')
            }

            const aadata = resp?.data?.aadharDetails || resp?.aadharDetails

            if (aadata) {
                setGroomAadharData(aadata)
            } else {
                alert('there is no adharData(Groom).')
            }
        } catch (error) {
            alert('Error in verifying Otp: ' + error)
        }
    }

    //verifying the otp and geting token and aadharData in Witness

    const verifyWitnessOtp = async () => {
        try {
            const resp = await AuthApiService.verifyOtp({
                aadharNumber: getValues('witnessAadharNumber'),
                otp: witnessOtp,
            })
            const verify =
                resp.data?.verificationToken || resp['verificationToken']

            if (verify) {
                setWitnessVToken(verify)
            } else {
                alert('there is no verification token')
            }

            const aadata = resp?.data?.aadharDetails || resp?.aadharDetails

            if (aadata) {
                setWitnessAadharData(aadata)
            } else {
                alert('there is no adharData(Witness).')
            }
        } catch (error) {
            alert('Error in verifying OTP: ' + error)
        }
    }

    //verifying the otp and geting token and aadharData in Priest

    const verifyBrahmanOtp = async () => {
        try {
            const resp = await AuthApiService.verifyOtp({
                aadharNumber: getValues('brahmanAadharNumber'),
                otp: brahmanOtp,
            })
            const verify =
                resp.data?.verificationToken || resp['verificationToken']

            if (verify) {
                setBrahmanVToken(verify)
            } else {
                console.log('there is no verification token')
            }

            const aadata = resp?.data?.aadharDetails || resp?.aadharDetails

            if (aadata) {
                setBrahmanAadharData(aadata)
            } else {
                alert('there is no aadharData(Priest).')
            }
        } catch (error) {
            alert('Error in verifying OTP: ' + error)
        }
    }

    //onsubmit function with using formData for sumitting
    const onSubmit = async (values: MarriageFormSchema) => {
        try {
            const formData = new FormData()
            formData.append('brideAadharId', values.brideAadharNumber)
            formData.append('groomAadharId', values.groomAadharNumber)
            formData.append('witnessAadharId', values.witnessAadharNumber)
            formData.append('brahmanAadharId', values.brahmanAadharNumber)
            formData.append('brideMotherName', values.brideMotherName)
            formData.append('brideFatherName', values.brideFatherName)
            formData.append('groomMotherName', values.groomMotherName)
            formData.append('groomFatherName', values.groomFatherName)
            // formData.append('status', 'pending')
            formData.append('witnessRelation', values.witnessRelation)
            formData.append('marriageDate', values.marriageDate.toISOString())
            formData.append('marriagePlace', values.marriagePlace)
            formData.append('districtId', values.districtId)
            formData.append('brideVerificationToken', brideVToken)
            formData.append('groomVerificationToken', groomVToken)
            formData.append('witnessVerificationToken', witnessVToken)
            formData.append('brahmanVerificationToken', brahmanVToken)
            formData.append('slotId', String(values.slotId))

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
                alert('Error ocuured in mapping officeDepartmentId')
                return
            }

            if (values.brideAadharCard) {
                formData.append('brideAadharCard', values.brideAadharCard)
            }
            if (values.groomAadharCard) {
                formData.append('groomAadharCard', values.groomAadharCard)
            }
            if (values.witnessAadharCard) {
                formData.append('witnessAadharCard', values.witnessAadharCard)
            }
            if (values.brahmanAadharCard) {
                formData.append('brahmanAadharCard', values.brahmanAadharCard)
            }
            if (values.brideRationCard) {
                formData.append('brideRationCard', values.brideRationCard)
            }
            if (values.groomRationCard) {
                formData.append('groomRationCard', values.groomRationCard)
            }
            if (values.bridePhoto) {
                formData.append('bridePhoto', values.bridePhoto)
            }
            if (values.groomPhoto) {
                formData.append('groomPhoto', values.groomPhoto)
            }
            if (values.invitationCard) {
                formData.append('invitationCard', values.invitationCard)
            }

            const res = await MarriageApis.create(formData)
            if (res) {
                toast.push(
                    <Notification closable type="success" duration={3000}>
                        Marriage Certificate Registration successfully🥳
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
            <div className="grid grid-cols-5 grid-rows-1 gap-4">
                <div className="col-span-3">
                    <h2>Marriage Application</h2>
                </div>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* SECTION : Bride's information  */}
                <Card className="mt-4">
                    <h4 className="mb-6 ">Bride&apos;s Information</h4>
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-6 w-full">
                            <div className="flex gap-2 mt-6">
                                <FormItem
                                    asterisk
                                    label="Bride Aadhar Id"
                                    invalid={Boolean(errors.brideAadharNumber)}
                                    errorMessage={
                                        errors.brideAadharNumber?.message
                                    }
                                >
                                    <Controller
                                        name="brideAadharNumber"
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
                                    onClick={requestBrideOtp}
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
                                        value={brideOtp}
                                        placeholder=""
                                        inputClass="h-[58px]"
                                        length={6}
                                        onChange={(val) => setBrideOtp(val)}
                                    />

                                    <Button
                                        block
                                        variant="solid"
                                        type="button"
                                        className="h-[58px] flex items-center justify-center"
                                        onClick={verifyBrideOtp}
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
                                        onClick={requestBrideOtp}
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </div>
                        </div>
                        {brideAadharData && (
                            <>
                                <div className="grid grid-cols-6 gap-2 w-full">
                                    <div className="col-span-2 col-start-1 ">
                                        <div>
                                            <p className="font-semibold mb-2">
                                                Bride&apos;s Name
                                            </p>
                                            <p className=" w-full h-[48px] p-3 rounded-xl bg-gray-100 font-semibold text-black cursor-not-allowed">
                                                {brideAadharData?.firstName}{' '}
                                                {brideAadharData?.middleName}{' '}
                                                {brideAadharData?.lastName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-span-1 col-start-3   ">
                                        <p className="font-semibold mb-2">
                                            Gender
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-black font-semibold  cursor-not-allowed">
                                            {brideAadharData?.gender}
                                        </p>
                                    </div>
                                    <div className="col-span-3 col-start-4 ">
                                        <p className="font-semibold mb-2">
                                            Perment Address
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 font-semibold text-black cursor-not-allowed">
                                            {brideAadharData?.street}
                                            {', '}
                                            {brideAadharData?.city}
                                            {', '}
                                            {brideAadharData?.district}
                                            {', '}
                                            {brideAadharData?.state} {'-'}{' '}
                                            {brideAadharData?.pinCode}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 w-full">
                                    <div className="col-span-1 ">
                                        <p className="font-semibold mb-2">
                                            Bride&apos;s Email Id
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-black font-semibold  cursor-not-allowed">
                                            {brideAadharData?.email}
                                        </p>
                                    </div>
                                    <div className="col-span-1 col-start-2 ">
                                        <p className="font-semibold mb-2">
                                            Bride&apos;s Mobile Number
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-black font-semibold cursor-not-allowed">
                                            {brideAadharData?.contact}
                                        </p>
                                    </div>
                                    <div className="col-span-1 col-start-3 ">
                                        <p className="font-semibold mb-2">
                                            Bride&apos;s Date of Birth
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-black font-semibold  cursor-not-allowed">
                                            {brideAadharData?.dob}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="grid grid-cols-2 gap-6 w-full">
                            <div className="flex gap-2 ">
                                <FormItem
                                    asterisk
                                    className="w-full"
                                    label="Bride's Mother Name"
                                    invalid={Boolean(errors.brideMotherName)}
                                    errorMessage={
                                        errors.brideMotherName?.message
                                    }
                                >
                                    <Controller
                                        name="brideMotherName"
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
                            <div className="flex gap-2  ">
                                <FormItem
                                    asterisk
                                    className="w-full"
                                    label="Bride's Father Name"
                                    invalid={Boolean(errors.brideFatherName)}
                                    errorMessage={
                                        errors.brideFatherName?.message
                                    }
                                >
                                    <Controller
                                        name="brideFatherName"
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
                {/* SECTION : Groom's information  */}
                <Card className="mt-4">
                    <h4 className="mb-6 ">Groom&apos;s Information</h4>
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-6 w-full">
                            <div className="flex gap-2 mt-6">
                                <FormItem
                                    asterisk
                                    label="Groom Aadhar Id"
                                    invalid={Boolean(errors.groomAadharNumber)}
                                    errorMessage={
                                        errors.groomAadharNumber?.message
                                    }
                                >
                                    <Controller
                                        name="groomAadharNumber"
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
                                    onClick={requestGroomOtp}
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
                                        value={groomOtp}
                                        placeholder=""
                                        inputClass="h-[58px]"
                                        length={6}
                                        onChange={(val) => setGroomOtp(val)}
                                    />

                                    <Button
                                        block
                                        variant="solid"
                                        type="button"
                                        className="h-[58px] flex items-center justify-center"
                                        onClick={verifyGroomOtp}
                                    >
                                        <BiCheckShield className="w-9 h-9" />
                                    </Button>
                                </div>
                                <div className=" text-center">
                                    <span className="font-semibold">
                                        Didn&apos;t receive OTP?
                                    </span>
                                    <button
                                        className="heading-text font-bold underline"
                                        type="button"
                                        onClick={requestGroomOtp}
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </div>
                        </div>
                        {groomAadharData && (
                            <>
                                <div className="grid grid-cols-6 gap-2 w-full">
                                    <div className="col-span-2 col-start-1 ">
                                        <div>
                                            <p className="font-semibold mb-2">
                                                Groom&apos;s Name
                                            </p>
                                            <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 font-semibold text-black cursor-not-allowed">
                                                {groomAadharData?.firstName}{' '}
                                                {groomAadharData?.middleName}{' '}
                                                {groomAadharData?.lastName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-span-1 col-start-3   ">
                                        <p className="font-semibold mb-2">
                                            Gender
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-black font-semibold  cursor-not-allowed">
                                            {groomAadharData?.gender}
                                        </p>
                                    </div>
                                    <div className="col-span-3 col-start-4 ">
                                        <p className="font-semibold mb-2">
                                            Perment Address
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 font-semibold text-black cursor-not-allowed">
                                            {groomAadharData?.street}
                                            {', '}
                                            {groomAadharData?.city}
                                            {', '}
                                            {groomAadharData?.district}
                                            {', '}
                                            {groomAadharData?.state} {'-'}{' '}
                                            {groomAadharData?.pinCode}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 w-full">
                                    <div className="col-span-1">
                                        <p className="font-semibold mb-2">
                                            Groom&apos;s Email Id
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-black font-semibold  cursor-not-allowed">
                                            {groomAadharData?.email}
                                        </p>
                                    </div>
                                    <div className="col-span-1 col-start-2 ">
                                        <p className="font-semibold mb-2">
                                            Groom&apos;s Mobile Number
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-black font-semibold  cursor-not-allowed">
                                            {groomAadharData?.contact}
                                        </p>
                                    </div>
                                    <div className="col-span-1 col-start-3 ">
                                        <p className="font-semibold mb-2">
                                            Groom&apos;s Date of Birth
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-black font-semibold  cursor-not-allowed">
                                            {groomAadharData?.dob}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="grid grid-cols-2 gap-6 w-full">
                            <div className="flex gap-2">
                                <FormItem
                                    asterisk
                                    className="w-full"
                                    label="Groom's Mother Name"
                                    invalid={Boolean(errors.groomMotherName)}
                                    errorMessage={
                                        errors.groomMotherName?.message
                                    }
                                >
                                    <Controller
                                        name="groomMotherName"
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
                            <div className="flex gap-2">
                                <FormItem
                                    asterisk
                                    className="w-full"
                                    label="Groom's Father Name"
                                    invalid={Boolean(errors.groomFatherName)}
                                    errorMessage={
                                        errors.groomFatherName?.message
                                    }
                                >
                                    <Controller
                                        name="groomFatherName"
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
                {/* SECTION: Marriage Information */}
                <Card className="mt-4">
                    <h4 className="mb-6 ">Marriage Information</h4>

                    <div className="grid grid-cols-4 grid-rows-1 gap-2">
                        <div>
                            <FormItem
                                asterisk
                                label="Date of Marriage"
                                invalid={Boolean(errors.marriageDate)}
                                errorMessage={errors.marriageDate?.message}
                            >
                                <Controller
                                    name="marriageDate"
                                    control={control}
                                    render={({ field }) => (
                                        <DatePicker
                                            placeholder="Pick a date and time"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                        </div>
                        <div className="col-span-1">
                            <FormItem
                                asterisk
                                label="Place Of Marriage"
                                invalid={Boolean(errors.marriagePlace)}
                                errorMessage={errors.marriagePlace?.message}
                            >
                                <Controller
                                    name="marriagePlace"
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
                        <div className="col-start-3">
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
                        <div className="col-start-4">
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
                                            value={
                                                offices
                                                    .map((office) => ({
                                                        label: office.name,
                                                        value: office._id,
                                                    }))
                                                    .find(
                                                        (office) =>
                                                            office.value ===
                                                            field.value,
                                                    ) || null
                                            }
                                        />
                                    )}
                                />
                            </FormItem>
                        </div>
                    </div>
                </Card>
                {/* SECTION : Witness's information  */}
                <Card className="mt-4">
                    <h4 className="mb-6 ">Witness&apos;s Information</h4>

                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-6 w-full">
                            <div className="flex gap-2 mt-6 ">
                                <FormItem
                                    asterisk
                                    label="Witness Aadhar Id"
                                    invalid={Boolean(
                                        errors.witnessAadharNumber,
                                    )}
                                    errorMessage={
                                        errors.witnessAadharNumber?.message
                                    }
                                >
                                    <Controller
                                        name="witnessAadharNumber"
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
                                    onClick={requestWitnessOtp}
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
                                        value={witnessOtp}
                                        placeholder=""
                                        inputClass="h-[58px]"
                                        length={6}
                                        onChange={(val) => setWitnessOtp(val)}
                                    />

                                    <Button
                                        block
                                        variant="solid"
                                        type="button"
                                        className="h-[58px] flex items-center justify-center"
                                        onClick={verifyWitnessOtp}
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
                                        onClick={requestWitnessOtp}
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </div>
                        </div>
                        {witnessAadharData && (
                            <>
                                <div className="grid grid-cols-3 gap-2 w-full">
                                    <div className="col-span-1">
                                        <div>
                                            <p className="font-semibold mb-2">
                                                Witness&apos;s Name
                                            </p>
                                            <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 font-semibold text-black cursor-not-allowed">
                                                {witnessAadharData?.firstName}{' '}
                                                {witnessAadharData?.middleName}{' '}
                                                {witnessAadharData?.lastName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-span-1 col-start-2 ">
                                        <p className="font-semibold mb-2">
                                            Witness&apos;s Mobile Number
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-gray-900 font-semibold  cursor-not-allowed">
                                            {witnessAadharData?.contact}
                                        </p>
                                    </div>
                                    <div className="col-span-1 col-start-3 ">
                                        <FormItem
                                            asterisk
                                            label="Witness Relation"
                                            invalid={Boolean(
                                                errors.witnessRelation,
                                            )}
                                            errorMessage={
                                                errors.witnessRelation?.message
                                            }
                                        >
                                            <Controller
                                                name="witnessRelation"
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
                                <div className="grid grid-cols-6 gap-2 w-full">
                                    {' '}
                                    <div className="col-span-2">
                                        <p className="font-semibold mb-2">
                                            Witness&apos;s Email Id
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-black font-semibold  cursor-not-allowed">
                                            {witnessAadharData?.email}
                                        </p>
                                    </div>
                                    <div className="col-span-1 col-start-3">
                                        <p className="font-semibold mb-2">
                                            Gender
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-black font-semibold  cursor-not-allowed">
                                            {witnessAadharData?.gender}
                                        </p>
                                    </div>
                                    <div className="col-span-3 col-start-4">
                                        <p className="font-semibold mb-2">
                                            Witness&apos;s Address
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 font-semibold text-black cursor-not-allowed">
                                            {witnessAadharData?.street}
                                            {', '}
                                            {witnessAadharData?.city}
                                            {', '}
                                            {witnessAadharData?.district}
                                            {', '}
                                            {witnessAadharData?.state} {'-'}{' '}
                                            {brideAadharData?.pinCode}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </Card>
                {/* SECTION : Priest's information  */}
                <Card className="mt-4">
                    <h4 className="mb-6 ">Priest&apos;s Information</h4>

                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-6 w-full">
                            <div className="flex gap-2 mt-6">
                                <FormItem
                                    asterisk
                                    label="Priest Aadhar Id"
                                    invalid={Boolean(
                                        errors.brahmanAadharNumber,
                                    )}
                                    errorMessage={
                                        errors.brahmanAadharNumber?.message
                                    }
                                >
                                    <Controller
                                        name="brahmanAadharNumber"
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
                                    onClick={requestBrahmanOtp}
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
                                        value={brahmanOtp}
                                        placeholder=""
                                        inputClass="h-[58px]"
                                        length={6}
                                        onChange={(val) => setBrahmanOtp(val)}
                                    />

                                    <Button
                                        block
                                        variant="solid"
                                        type="button"
                                        className="h-[58px] flex items-center justify-center"
                                        onClick={verifyBrahmanOtp}
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
                                        onClick={requestBrahmanOtp}
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </div>{' '}
                        </div>
                        {brahmanAadharData && (
                            <>
                                <div className="grid grid-cols-2 gap-6 w-full">
                                    <div className="col-span-1 ">
                                        <div>
                                            <p className="font-semibold mb-2">
                                                Priest&apos;s Name
                                            </p>
                                            <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 font-semibold text-black cursor-not-allowed">
                                                {brahmanAadharData?.firstName}{' '}
                                                {brahmanAadharData?.middleName}{' '}
                                                {brahmanAadharData?.lastName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-span-1 col-start-2 ">
                                        <p className="font-semibold mb-2">
                                            Priest&apos;s Mobile Number
                                        </p>
                                        <p className="w-full h-[48px] p-3 rounded-xl bg-gray-100 text-black font-semibold  cursor-not-allowed">
                                            {brahmanAadharData?.contact}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </Card>
                {/* SECTION : Upload Documents  */}
                <Card className="mt-4">
                    <h4 className="mb-6 ">Upload Documents</h4>
                    <FormItem
                        asterisk
                        label="Bride's Aadhar Card"
                        invalid={Boolean(errors.brideAadharCard)}
                        errorMessage={errors.brideAadharCard?.message}
                    >
                        <Controller
                            name="brideAadharCard"
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
                        label="Groom's Aadhar Card"
                        invalid={Boolean(errors.groomAadharCard)}
                        errorMessage={errors.groomAadharCard?.message}
                    >
                        <Controller
                            name="groomAadharCard"
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
                        label="Witness's Aadhar Card"
                        invalid={Boolean(errors.witnessAadharCard)}
                        errorMessage={errors.witnessAadharCard?.message}
                    >
                        <Controller
                            name="witnessAadharCard"
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
                        label="Priest's Aadhar Card"
                        invalid={Boolean(errors.brahmanAadharCard)}
                        errorMessage={errors.brahmanAadharCard?.message}
                    >
                        <Controller
                            name="brahmanAadharCard"
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
                        label="Bride's Ration Card"
                        invalid={Boolean(errors.brideRationCard)}
                        errorMessage={errors.brideRationCard?.message}
                    >
                        <Controller
                            name="brideRationCard"
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
                        label="Groom's Ration Card"
                        invalid={Boolean(errors.groomRationCard)}
                        errorMessage={errors.groomRationCard?.message}
                    >
                        <Controller
                            name="groomRationCard"
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
                        label="Bride's Photograph"
                        invalid={Boolean(errors.bridePhoto)}
                        errorMessage={errors.bridePhoto?.message}
                    >
                        <Controller
                            name="bridePhoto"
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
                        label="Groom's Photograph"
                        invalid={Boolean(errors.groomPhoto)}
                        errorMessage={errors.groomPhoto?.message}
                    >
                        <Controller
                            name="groomPhoto"
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
                        label="Invitation Card"
                        invalid={Boolean(errors.invitationCard)}
                        errorMessage={errors.invitationCard?.message}
                    >
                        <Controller
                            name="invitationCard"
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
                    officeId={officedId}
                    departmentId={departmentId}
                    slotDateValue={currentSlotDate}
                />
                <div className="mt-4 flex justify-center">
                    <Button variant="solid" type="submit">
                        Submit Application
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default MarriageForm
