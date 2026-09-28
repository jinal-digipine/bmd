import {
    FormItem,
    Input,
    Card,
    Button,
    DatePicker,
    Notification,
    toast,
} from '@/components/ui'
import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/Form'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Application } from '@/app/@api/application-module/application.types'
import { Marriage } from '@/app/@api/marriage-module/marriage.types'
import { ApplicationApis } from '@/app/@api/application-module/application.api'
import { MarriageApis } from '@/app/@api/marriage-module/marriage.api'

interface EditMarriageFormProps {
    id: Application.Id
}

type EditFormValues = {
    marriageDate: Date
    marriagePlace: string
    brideMotherName: string
    brideFatherName: string
    groomMotherName: string
    groomFatherName: string
}

const EditMarriageForm = ({ id }: EditMarriageFormProps) => {
    const [serviceId, setServiceId] = useState<Marriage.Id | null>(null)
    const navigate = useNavigate()

    const { control, handleSubmit, reset } = useForm<EditFormValues>({
        defaultValues: {
            marriageDate: undefined,
            marriagePlace: '',
            brideMotherName: '',
            brideFatherName: '',
            groomMotherName: '',
            groomFatherName: '',
        },
    })

    useEffect(() => {
        const getData = async () => {
            try {
                const resp = await ApplicationApis.get(id)
                const appData = resp.data || resp

                if (appData) {
                    const marriageDetail = appData.serviceId as Marriage.Detail
                    setServiceId(marriageDetail._id)

                    reset({
                        marriageDate: marriageDetail.marriageDate
                            ? new Date(marriageDetail.marriageDate)
                            : undefined,
                        marriagePlace: marriageDetail.marriagePlace,
                        brideMotherName: marriageDetail.brideMotherName,
                        brideFatherName: marriageDetail.brideFatherName,
                        groomMotherName: marriageDetail.groomMotherName,
                        groomFatherName: marriageDetail.groomFatherName,
                    })
                }
            } catch {
                toast.push(
                    <Notification closable type="danger" duration={3000}>
                        Failed to Pre-fetch and fill application data.
                    </Notification>,
                )
            }
        }
        if (id) {
            getData()
        }
    }, [id, reset])

    const handleCancel = () => {
        navigate('/app/clerk/applications')
    }

    const onSubmit = async (values: EditFormValues) => {
        try {
            if (!serviceId) {
                alert('There is no serviceId!')
                return
            }

            await MarriageApis.update(serviceId, {
                marriageDate: values.marriageDate.toISOString(),
                marriagePlace: values.marriagePlace,
                brideMotherName: values.brideMotherName,
                brideFatherName: values.brideFatherName,
                groomMotherName: values.groomMotherName,
                groomFatherName: values.groomFatherName,
            })

            toast.push(
                <Notification closable type="success" duration={3000}>
                    Marriage Application updated successfully.
                </Notification>,
            )

            navigate('/app/clerk/applications')
        } catch {
            toast.push(
                <Notification closable type="danger" duration={3000}>
                    Failed to update the application data.
                </Notification>,
            )
            navigate('/app/clerk/applications')
        }
    }

    return (
        <div className="flex justify-center items-center px-4 py-6">
            <div className="w-full max-w-6xl mx-auto">
                <h3>Update Marriage Application</h3>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Card className="mt-4">
                        <h5 className="mb-6">Marriage Information</h5>

                        <div className="grid grid-cols-4 grid-rows-1 gap-2">
                            <div className="col-span-2">
                                <FormItem asterisk label="Date of Marriage">
                                    <Controller
                                        name="marriageDate"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                placeholder="Pick a date"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                            <div className="col-span-2">
                                <FormItem asterisk label="Place of Marriage">
                                    <Controller
                                        name="marriagePlace"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                placeholder="e.g. Shagun Farm, Nikol, Ahmedabad"
                                                autoComplete="off"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                        </div>

                        <h5 className="my-6">Parents Information</h5>
                        <div className="grid grid-cols-6 grid-rows-2 gap-2">
                            <div className="col-span-3 row-start-1">
                                <FormItem asterisk label="Bride's Mother Name">
                                    <Controller
                                        name="brideMotherName"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                placeholder="e.g. Jonh Doe"
                                                autoComplete="off"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                            <div className="col-span-3 col-start-4 row-start-1">
                                <FormItem asterisk label="Bride's Father Name">
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
                            <div className="col-span-3 row-start-2">
                                <FormItem asterisk label="Groom's Mother Name">
                                    <Controller
                                        name="groomMotherName"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                placeholder="e.g. John doe"
                                                autoComplete="off"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                            <div className="col-span-3 col-start-4 row-start-2">
                                <FormItem asterisk label="Groom's Father Name">
                                    <Controller
                                        name="groomFatherName"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                placeholder="e.g. John doe"
                                                autoComplete="off"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                        </div>
                    </Card>

                    <div className="mt-4 flex justify-between">
                        <Button
                            type="button"
                            variant="solid"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button variant="solid" type="submit">
                            Update
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default EditMarriageForm
