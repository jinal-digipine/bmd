import api from '../api'
import type { State } from './state.types'

export const StateApis = {
    async list(
        page: number,
        limit: number,
        search?: string,
    ): Promise<State.Apis.ListResponse> {
        const response = await api.get<State.Apis.ListResponse>('/state/all', {
            params: { page, limit, search },
        })
        return response.data
    },

    async get(id: State.Id): Promise<State.Apis.GetResponse> {
        const response = await api.get<State.Apis.GetResponse>(`/state/${id}`)
        return response.data
    },
    async create(data: State.Apis.Create): Promise<State.Apis.CreateResponse> {
        const response = await api.post<State.Apis.CreateResponse>(
            '/state/create',
            data,
        )
        return response.data
    },
    async delete(id: State.Id): Promise<State.Apis.DeleteResponse> {
        const response = await api.delete<State.Apis.DeleteResponse>(
            `/state/${id}`,
        )
        return response.data
    },
}
