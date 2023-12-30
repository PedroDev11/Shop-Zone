import { authAxios } from "./useAxios";
import { Order } from "../Interfaces";

export const createOrderBack = async (data: Order) => {
  await authAxios.post("/orders/create/", data);
};

export const myOrders = async () => {
  const response = await authAxios.get(`/orders/my/orders/`);
  return response.data;
};

export const getOrder = async (id: number) => {
  const response = await authAxios.get(`/orders/get/order/${id}/`);
  return response.data;
};

export const getOrders = async () => {
  const response = await authAxios.get(`/orders/`);
  return response.data;
};

export const searchOrder = async (query: string) => {
  const response = await authAxios.get(`/orders/search/?query=${query}`);
  return response.data;
};

export const editOrder = async (id: number) => {
  await authAxios.put(`/orders/delivery/${id}/`);
};
