import api from '@/app/@api/api'
import { slotApis } from '@/app/@api/slot-module/slot.api'
import { Slot } from '@/app/@api/slot-module/slot.types'
import { FormItem, Select, Card, Alert } from '@/components/ui'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

const SlotSelection = ({
    control,
    errors,
    departmentId,
    officeId,
    slotDateValue,
}) => {
    const [slotDates, setSlotDates] = useState<string[]>([])
    const [timeSlots, setTimeSlots] = useState<Slot.Base[]>([])

    useEffect(() => {
        const fetchDatesData = async () => {
            if (!officeId || !departmentId) return

            try {
                const response = await api.get('/office-department/mapping', {
                    params: {
                        officeId,
                        departmentId,
                    },
                })

                const mappingData = response.data || response

                if (!mappingData || !mappingData._id) {
                    console.log('there is no data.')
                    return
                }

                const officeDepartmentIdVal = mappingData._id

                const res = await slotApis.requestDates({
                    officedepartmentId: officeDepartmentIdVal,
                })

                const datesRes = res.data || res || []
                setSlotDates(datesRes)
            } catch (err) {
                alert('Error occurred in fetching verification dates: ' + err)
            }
        }

        fetchDatesData()
    }, [officeId, departmentId])

    useEffect(() => {
        const fetchTimeSlotsData = async () => {
            if (!officeId || !departmentId || !slotDateValue) {
                setTimeSlots([])
                return
            }

            try {
                const response = await api.get('/office-department/mapping', {
                    params: { officeId, departmentId },
                })
                const mappingData = response.data || response

                if (mappingData?._id) {
                    const FinalDateString = String(slotDateValue).split('T')[0]

                    const res = await slotApis.requestTimeSlots({
                        officedepartmentId: mappingData._id,
                        slotDate: FinalDateString,
                    } as any)

                    setTimeSlots(res.data || res || [])
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchTimeSlotsData()
    }, [slotDateValue, officeId, departmentId])
    return (
        <Card className="mt-6 mb-0 pb-2 ">
            <h4 className="mb-6">Select Verification Slot</h4>
            <Card className="bg-neutral-50 pb-2">
                <h5 className="text-amber-700">Important Notice</h5>
                <p className="mt-3">
                    Please select your verification slot carefully. Once your
                    application is submitted, the selected slot cannot be
                    changed or rescheduled.
                </p>
                <p className="mt-3">
                    You must attend the online video verification meeting at the
                    selected date and time. Failure to join the meeting will
                    result in rejection of your application.
                </p>
                <p className="mt-3">
                    Certificate issuance is subject to successful verification
                    and approval by the assigned clerk.
                </p>
            </Card>
            <div className="grid grid-cols-4 grid-rows-1 gap-2 mt-4">
                <div className="col-span-2">
                    <FormItem
                        asterisk
                        label="Pick Verification Date"
                        invalid={Boolean(errors.slotDate)}
                        errorMessage={errors.slotDate?.message}
                    >
                        <Controller
                            name="slotDate"
                            control={control}
                            render={({ field }) => {
                                const dateOptions = slotDates.map(
                                    (isoString) => {
                                        const dateOnly = isoString.split('T')[0]
                                        return {
                                            label: dateOnly,
                                            value: dateOnly,
                                        }
                                    },
                                )

                                const currentValue = field.value
                                    ? String(field.value).split('T')[0]
                                    : ''

                                return (
                                    <Select
                                        placeholder="Select Date"
                                        options={dateOptions}
                                        onChange={(option) =>
                                            field.onChange(option?.value || '')
                                        }
                                        value={
                                            dateOptions.find(
                                                (opt) =>
                                                    opt.value === currentValue,
                                            ) || null
                                        }
                                    />
                                )
                            }}
                        />
                    </FormItem>
                </div>
                <div className="col-span-2 col-start-3 ">
                    <FormItem
                        asterisk
                        label="Pick a time slot"
                        invalid={Boolean(errors.slotId)}
                        errorMessage={errors.slotId?.message}
                    >
                        <Controller
                            name="slotId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    placeholder="Pick a time slot"
                                    options={timeSlots.map((item) => ({
                                        label: `${item.startTime} - ${item.endTime}`,
                                        value: item._id,
                                    }))}
                                    value={timeSlots
                                        .map((item) => ({
                                            label: `${item.startTime} - ${item.endTime}`,
                                            value: item._id,
                                        }))
                                        .find(
                                            (opt) => opt.value === field.value,
                                        )}
                                    onChange={(option) =>
                                        field.onChange(option?.value || '')
                                    }
                                />
                            )}
                        />
                    </FormItem>
                </div>
            </div>
            <Alert showIcon>
                Slot can not be changed after submission. Missing it will result
                in application rejection.
            </Alert>
        </Card>
    )
}

export default SlotSelection
