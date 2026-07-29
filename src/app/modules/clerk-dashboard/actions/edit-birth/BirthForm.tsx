import {
    FormItem,
    Input,
    Select,
    Card,
    Button,
    Notification,
    toast,
} from '@/components/ui'
import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/Form'
import { useForm, Controller } from 'react-hook-form'
import DateTimepicker from '@/components/ui/DatePicker/DateTimepicker'
import { useNavigate } from 'react-router'
import { Application } from '@/app/@api/application-module/application.types'
import { ApplicationApis } from '@/app/@api/application-module/application.api'
import { BirthApis } from '@/app/@api/birth-module/birth.api'
import { Birth } from '@/app/@api/birth-module/birth.types'
import { genders } from '@/app/common/components/gender-list/genders'

interface EditBirthFormProps {
    id: Application.Id
}

type EditFormValues = {
    babyName: string
    birthDateAndTime: Date
    birthPlace: string
    babyGender: string
    babyWeight: number
}

const EditBirthForm = ({ id }: EditBirthFormProps) => {
    const navigate = useNavigate()
    const [serviceId, setServiceId] = useState<Birth.Id | null>(null)

    const { control, handleSubmit, reset } = useForm<EditFormValues>({
        defaultValues: {
            babyName: '',
            birthDateAndTime: undefined,
            birthPlace: '',
            babyGender: '',
            babyWeight: undefined,
        },
    })

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await ApplicationApis.get(id)
                const appData = res.data || res
                console.log('the fetched data is =', appData)

                if (appData) {
                    const birthDetail = appData.serviceId as Birth.Detail
                    setServiceId(birthDetail._id)

                    reset({
                        babyName: birthDetail.babyName,
                        birthDateAndTime: birthDetail.birthDateAndTime
                            ? new Date(birthDetail.birthDateAndTime)
                            : undefined,
                        birthPlace: birthDetail.birthPlace,
                        babyGender: birthDetail.babyGender,
                        babyWeight: birthDetail.babyWeight,
                    })
                }
            } catch {
                toast.push(
                    <Notification closable type="danger" duration={3000}>
                        Failed to Fetch and Pre-fill application data.
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
                alert('There is no serviceId')
                return
            }

            await BirthApis.update(serviceId, {
                babyName: values.babyName,
                birthDateAndTime: values.birthDateAndTime.toISOString(),
                birthPlace: values.birthPlace,
                babyGender: values.babyGender,
                babyWeight: values.babyWeight,
            })

            toast.push(
                <Notification closable type="success" duration={3000}>
                    Updated the Application Data Successfully!
                </Notification>,
            )

            navigate('/app/clerk/applications')
        } catch {
            toast.push(
                <Notification closable type="danger" duration={3000}>
                    Failed to update birth application.
                </Notification>,
            )
            navigate('/app/clerk/applications')
        }
    }

    return (
        <div className="flex justify-center items-center px-4 py-6">
            <div className="w-full max-w-6xl mx-auto">
                <h3>Update Birth Application</h3>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Card className="mt-4">
                        <h5 className="mb-6">Baby&apos;s Information</h5>
                        <div className="grid grid-cols-6 grid-rows-3 gap-2">
                            <div className="col-span-6">
                                <FormItem asterisk label="Baby Name">
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
                                <FormItem asterisk label="Date & Time of Birth">
                                    <Controller
                                        name="birthDateAndTime"
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
                                <FormItem asterisk label="Baby's Birth Weight">
                                    <Controller
                                        name="babyWeight"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="number"
                                                placeholder="e.g. 3.4 (in kg)"
                                                autoComplete="off"
                                                value={field.value ?? ''}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value
                                                            ? Number(
                                                                  e.target
                                                                      .value,
                                                              )
                                                            : undefined,
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                            <div className="col-span-2 col-start-5 row-start-2">
                                <FormItem asterisk label="Gender">
                                    <Controller
                                        name="babyGender"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                placeholder="Please Select"
                                                options={genders}
                                                value={
                                                    genders.find(
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
                            <div className="col-span-6 row-start-3">
                                <FormItem asterisk label="Place Of Birth">
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

export default EditBirthForm
