import api from "../api";
import type { Department } from "./department.types";

export const DepartmentApis = {
  async list(): Promise<Department.Apis.ListResponse> {
    const response =
      await api.get<Department.Apis.ListResponse>("/department/all");
    return response.data;
  },

  async get(id: Department.Id): Promise<Department.Apis.GetResponse> {
    const response = await api.get<Department.Apis.GetResponse>(
      `/department/${id}`,
    );
    return response.data;
  },
};
