import api from '../api'
import type { Slot } from './slot.types'

export const slotApis = {
    async list(): Promise<Slot.Apis.ListResponse> {
        const response = await api.get<Slot.Apis.ListResponse>('/slot/all')
        return response.data
    },

    async requestDates(
        data: Slot.Apis.GetDatePayload,
    ): Promise<Slot.Apis.GetDatesResponse> {
        const id = data.officedepartmentId

        const response = await api.get<Slot.Apis.GetDatesResponse>(
            `slot/available-dates/${id}`,
        )
        return response.data
    },

    async requestTimeSlots(
        data: Slot.Apis.GetTimeSlotsPayload,
    ): Promise<Slot.Apis.GetTimeSlotsResponse> {
        const response = await api.get<Slot.Apis.GetTimeSlotsResponse>(
            'slot/available-slots',
            {
                params: {
                    officeDepartmentId: data.officedepartmentId,
                    slotDate: data.slotDate,
                },
            },
        )
        return response.data
    },
}
