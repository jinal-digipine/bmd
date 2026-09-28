import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import { FormItem, Form } from '@/components/ui/Form'
import { DatePicker, Input, Notification, Select, toast } from '@/components/ui'
import { useNavigate } from 'react-router'
import { HolidayApis } from '@/app/@api/holiday/holiday.api'
import { OfficeApis } from '@/app/@api/office-module/office.api'
import { Office } from '@/app/@api/office-module/office.types'
import { z, ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { Holiday } from '@/app/@api/holiday/holiday.types'

type HolidayFormSchema = {
    title: string
    description: string
    holidayDate: Date
    year: string
    isNationalHoliday: string
    officeId?: string
}

const isNationalHolidayOPtion = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
]

const validationSchema: ZodType<HolidayFormSchema> = z.object({
    title: z.string().min(2, { message: 'title is required' }),
    description: z.string().min(10, { message: 'description is required ' }),
    holidayDate: z.date({ required_error: 'Date is required' }),
    year: z.string().min(1, { message: 'year is required' }),
    isNationalHoliday: z
        .string()
        .min(1, { message: 'select one of the option' }),
    officeId: z.string().optional(),
})
const AddHoliday = () => {
    const [dialogIsOpen, setIsOpen] = useState(true)
    const navigate = useNavigate()
    const [officeList, setOfficeList] = useState<Office.Detail[]>([])

    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
        navigate('/app/admin/holidays-page')
    }

    //fetching the office data from apis
    const fetchOfficeData = async () => {
        try {
            const response = await OfficeApis.list()
            setOfficeList(response.data || response || [])
        } catch (errror) {
            alert('error occured in fetching office data' + errror)
        }
    }

    useEffect(() => {
        fetchOfficeData()
    }, [])

    const {
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        watch,
    } = useForm<HolidayFormSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            title: '',
            description: '',
            isNationalHoliday: '',
            holidayDate: undefined,
            year: '',
            officeId: '',
        },
    })
    const isNationalHolidayValue = watch('isNationalHoliday')

    useEffect(() => {
        if (isNationalHolidayValue === 'yes') {
            setValue('officeId', '')
        }
    }, [isNationalHolidayValue, setValue])

    const onSubmit = async (values: HolidayFormSchema) => {
        try {
            const payloadofholiday: Holiday.Apis.Create = {
                title: values.title,
                description: values.description,
                holidayDate: values.holidayDate,
                year: values.year,
                isNationalHoliday: values.isNationalHoliday,
                officeId:
                    values.isNationalHoliday === 'no'
                        ? values.officeId
                        : undefined,
            }
            const resp = await HolidayApis.create(payloadofholiday)

            if (resp) {
                toast.push(
                    <Notification closable type="success" duration={3000}>
                        Holiday Added successfully!
                    </Notification>,
                )
            }
            navigate('/app/admin/holidays-page')
        } catch (err) {
            alert('error in adding holiday:' + err)
            navigate('/app/admin/holidays-page')
        }
    }
    return (
        <div>
            <Dialog
                isOpen={dialogIsOpen}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Add New Holiday</h5>

                <Form
                    className="overflow-y-scroll max-h-96"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormItem
                        asterisk
                        label="Holiday Name"
                        invalid={Boolean(errors.title)}
                        errorMessage={errors.title?.message}
                    >
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    placeholder="e.g. Diwali"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        asterisk
                        label="Description"
                        invalid={Boolean(errors.description)}
                        errorMessage={errors.description?.message}
                    >
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    placeholder="e.g. The Festival of Joy and FireCrackers."
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        asterisk
                        label="Date of Holiday"
                        invalid={Boolean(errors.holidayDate)}
                        errorMessage={errors.holidayDate?.message}
                    >
                        <Controller
                            name="holidayDate"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    placeholder="Pick a date"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        asterisk
                        label="Year"
                        invalid={Boolean(errors.year)}
                        errorMessage={errors.year?.message}
                    >
                        <Controller
                            name="year"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    placeholder="e.g. 2026"
                                    autoComplete="off"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        asterisk
                        label="is National Holiday"
                        invalid={Boolean(errors.isNationalHoliday)}
                        errorMessage={errors.isNationalHoliday?.message}
                    >
                        <Controller
                            name="isNationalHoliday"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    placeholder="National Holidays"
                                    options={isNationalHolidayOPtion}
                                    value={
                                        isNationalHolidayOPtion.find(
                                            (opt) => opt.value === field.value,
                                        ) || null
                                    }
                                    onChange={(option) =>
                                        field.onChange(option?.value || '')
                                    }
                                />
                            )}
                        />
                    </FormItem>
                    {isNationalHolidayValue === 'no' && (
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
                                        options={officeList.map((item) => ({
                                            label: item.name,
                                            value: item._id,
                                        }))}
                                        value={
                                            officeList
                                                .map((o) => ({
                                                    label: o.name,
                                                    value: o._id,
                                                }))
                                                .find(
                                                    (opt) =>
                                                        opt.value ===
                                                        field.value,
                                                ) || null
                                        }
                                        onChange={(option) =>
                                            field.onChange(option?.value || '')
                                        }
                                    />
                                )}
                            />
                        </FormItem>
                    )}
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            variant="plain"
                            onClick={onDialogClose}
                        >
                            Cancel
                        </Button>
                        <Button variant="solid" type="submit">
                            Add
                        </Button>
                    </div>{' '}
                </Form>
            </Dialog>
        </div>
    )
}

export default AddHoliday
