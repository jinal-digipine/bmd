import api from "../api";
import type { Death } from "./death.types";

export const DeathApis = {
  async list(): Promise<Death.Apis.ListResponse> {
    const response = await api.get<Death.Apis.ListResponse>("/death/all");
    return response.data;
  },
  async get(id: Death.Id): Promise<Death.Apis.GetResponse> {
    const response = await api.get<Death.Apis.GetResponse>(`/death/${id}`);
    return response.data;
  },

  async create(
    data: Death.Apis.CreatePayload,
  ): Promise<Death.Apis.CreateResponse> {
    const response = await api.post<Death.Apis.CreateResponse>(
      "/death/create",
      data,
    );
    return response.data;
  },

  async update(
    id: Death.Id,
    data: Death.Apis.UpdatePayload,
  ): Promise<Death.Apis.UpdateResponse> {
    const response = await api.patch<Death.Apis.UpdateResponse>(
      `/death/${id}`,
      data,
    );
    return response.data;
  },
};
