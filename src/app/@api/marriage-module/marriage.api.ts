import api from "../api";
import type { Marriage } from "./marriage.types";

export const MarriageApis = {
  async list(): Promise<Marriage.Apis.ListResponse> {
    const response = await api.get<Marriage.Apis.ListResponse>("/marriage/all");
    return response.data;
  },
  async get(id: Marriage.Id): Promise<Marriage.Apis.GetResponse> {
    const response = await api.get<Marriage.Apis.GetResponse>(
      `/marriage/${id}`,
    );
    return response.data;
  },

  async create(
    data: Marriage.Apis.CreatePayload,
  ): Promise<Marriage.Apis.CreateResponse> {
    const response = await api.post<Marriage.Apis.CreateResponse>(
      "/marriage/create",
      data,
    );
    return response.data;
  },
  async update(
    id: Marriage.Id,
    data: Marriage.Apis.UpdatePayload,
  ): Promise<Marriage.Apis.UpdateResponse> {
    const response = await api.patch<Marriage.Apis.UpdateResponse>(
      `/marriage/${id}`,
      data,
    );
    return response.data;
  },
};
