import { Product } from "../Interfaces";
import { authAxios, axi } from "./useAxios";

export const get_products = async ({ pageParams = 1 }) => {
  const response = await axi.get(`/products/?page=${pageParams}&pages=9`);
  return response.data;
};

export const getProductAdmin = async (id: number) => {
  const response = await authAxios.get(`/products/get/admin/${id}/`);
  return response.data;
};

export const getProductSolo = async (slug: string) => {
  const response = await authAxios.get(`/products/get/${slug}/`);
  return response.data;
};

export const searchProducts = async (query: string) => {
  const response = await authAxios.get(`/products/search/?query=${query}`);
  return response.data;
};

export const getProductsByCategory = async (category: string) => {
  const response = await authAxios.get(`/products/category/${category}/`);
  return response.data;
};

export const postProduct = async (data: Product) => {
  // Nos permite enviar archivos con javascript
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("count_in_stock", data.count_in_stock.toString());
  formData.append("category", data.category);
  formData.append("price", data.price.toString());

  if (data.image) {
    formData.append("image", data.image);
  }

  await authAxios.post("/products/create/", formData);
};

export const editProduct = async (data: Product) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("count_in_stock", data.count_in_stock.toString());
  formData.append("category", data.category);
  formData.append("price", data.price.toString());

  if (data.image && typeof data.image !== "string") {
    formData.append("image", data.image);
  }

  await authAxios.put(`/products/edit/${data.id}/`, formData);
};

export const deleteProduct = async (id: number) => {
  await authAxios.delete(`/products/delete/${id}/`);
};

export const createReviewBack = async (
  description: string,
  rating: number,
  productId: number
) => {
  await authAxios.post(`/products/review/${productId}/`, {
    description,
    rating,
  });
};
