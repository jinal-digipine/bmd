import { ApplicationApis } from '@/app/@api/application-module/application.api'
import { Application } from '@/app/@api/application-module/application.types'
import { DeathApis } from '@/app/@api/death-module/death.api'
import { Death } from '@/app/@api/death-module/death.types'
import {
    Button,
    Card,
    Form,
    FormItem,
    Input,
    Notification,
    toast,
} from '@/components/ui'
import DateTimepicker from '@/components/ui/DatePicker/DateTimepicker'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

interface EditDeathFormProp {
    id: Application.Id
}

type EditFormVal = {
    deceasedFatherName?: string
    deceasedMotherName?: string
    placeOfDeath?: string
    dateAndTimeOfDeath?: Date
}

const EditDeathForm = ({ id }: EditDeathFormProp) => {
    const navigate = useNavigate()
    const [serviceId, setServiceId] = useState<Death.Id | null>(null)

    const { control, handleSubmit, reset } = useForm<EditFormVal>({
        defaultValues: {
            deceasedMotherName: '',
            deceasedFatherName: '',
            placeOfDeath: '',
            dateAndTimeOfDeath: undefined,
        },
    })

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await ApplicationApis.get(id)
                const appData = res.data || res

                if (appData) {
                    const deathData = appData.serviceId as Death.Detail
                    setServiceId(deathData._id)

                    //filling the data in formfield from existing data
                    reset({
                        deceasedMotherName: deathData.deceasedMotherName,
                        deceasedFatherName: deathData.deceasedFatherName,
                        placeOfDeath: deathData.placeOfDeath,
                        dateAndTimeOfDeath: deathData.dateAndTimeOfDeath
                            ? new Date(deathData.dateAndTimeOfDeath)
                            : undefined,
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
    const onSubmit = async (values: EditFormVal) => {
        try {
            if (!serviceId) {
                alert('there is not service')
                return
            }
            await DeathApis.update(serviceId, {
                placeOfDeath: values.placeOfDeath,
                dateAndTimeOfDeath: values.dateAndTimeOfDeath?.toISOString(),
                deceasedMotherName: values.deceasedMotherName,
                deceasedFatherName: values.deceasedFatherName,
            })
            toast.push(
                <Notification closable type="success" duration={3000}>
                    Application Data Updated Successfully.
                </Notification>,
            )
            navigate('/app/clerk/applications')
        } catch {
            toast.push(
                <Notification closable type="danger" duration={3000}>
                    Failed to Update the Death Application Data!
                </Notification>,
            )
            navigate('/app/clerk/applications')
        }
    }
    return (
        <div className="flex  justify-center items-center px-4 py-6">
            <div className="w-full max-w-6xl mx-auto">
                <h3>Update Death Application</h3>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Card className="mt-4">
                        <h5 className="mb-6 ">Deceased&apos;s Information</h5>
                        <div className="grid grid-cols-6 grid-rows-2 gap-2">
                            <div className="col-span-3 row-start-1">
                                <FormItem asterisk label="Place Of Death">
                                    <Controller
                                        name="placeOfDeath"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                placeholder="e.g. Vishal Hospital, Sector-24, Gandhinagar, Gujarat."
                                                autoComplete="off"
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                            <div className="col-span-3 col-start-4 row-start-1">
                                <FormItem asterisk label="Date & Time of Death">
                                    <Controller
                                        name="dateAndTimeOfDeath"
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

                            <div className="col-span-3 row-start-2">
                                <FormItem
                                    asterisk
                                    label="Deceased's Mother Name"
                                >
                                    <Controller
                                        name="deceasedMotherName"
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
                            <div className="col-span-3 col-start-4 row-start-2">
                                <FormItem
                                    asterisk
                                    label="Deceased's Father Name"
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
                    </Card>
                    <div className="mt-2 grid grid-col-2 grid-row-1">
                        <div className="col-start-1 ml-2">
                            <Button variant="solid" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                        <div className="col-start-2  flex justify-end mr-2">
                            <Button variant="solid" type="submit">
                                Update
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default EditDeathForm
