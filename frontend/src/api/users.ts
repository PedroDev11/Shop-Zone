import { authAxios, axi } from "./useAxios";
import { User } from "../Interfaces";

export const registerRequest = async (
  email: string,
  name: string,
  last_name: string,
  password: string
) => {
  await axi.post("/users/register/", { email, name, last_name, password });
};

export const loginRequest = async (email: string, password: string) => {
  const response = await axi.post("/users/login/", { email, password });
  return response;
};

export const getUsers = async () => {
  const response = await authAxios.get(`/users/get/users/`);
  return response.data;
};

export const getUser = async (id: number) => {
  const response = await authAxios.get(`/users/get/user/${id}/`);
  return response.data;
};

export const searchUsers = async (query: string) => {
  const response = await authAxios.get(`/users/search/?query=${query}`);
  return response.data;
};

export const editUser = async (data: User) => {
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("name", data.name);
  formData.append("last_name", data.last_name);

  if (data.avatar && typeof data.avatar !== "string") {
    formData.append("avatar", data.avatar);
  }

  await authAxios.put(`/users/edit/${data.email}/`, formData);
};

export const deleteUser = async (id: number) => {
  await authAxios.delete(`/users/delete/${id}/`);
};
