import api from "../api";
import type { User } from "./user.types";

export const UserApis = {
  async list(): Promise<User.Apis.ListResponse> {
    const response = await api.get<User.Apis.ListResponse>("/user/all");
    return response.data;
  },

  async get(id: User.Id): Promise<User.Apis.GetResponse> {
    const response = await api.get<User.Apis.GetResponse>(`/user/${id}`);
    return response.data;
  },

  async create(data: User.Apis.Create): Promise<User.Apis.CreateResponse> {
    const response = await api.post<User.Apis.CreateResponse>(
      "/user/create",
      data,
    );
    return response.data;
  },
  async update(
    id: User.Id,
    data: User.Apis.Update,
  ): Promise<User.Apis.UpdateResponse> {
    const response = await api.patch<User.Apis.UpdateResponse>(
      `/user/${id}`,
      data,
    );
    return response.data;
  },

  async delete(id: User.Id): Promise<User.Apis.DeleteResponse> {
    const response = await api.delete<User.Apis.DeleteResponse>(`/user/${id}`);

    return response.data;
  },
};
