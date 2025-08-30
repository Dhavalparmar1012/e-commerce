import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../type';

export const addCatalog = async (formData: FormData) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/catalog/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data.success) toast.error(response.data.error);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'Error occurred');
  }
};

export const updateCatalog = async (id, updatedData: FormData) => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/products/update/${id}`, updatedData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data.success) toast.error(response.data.error);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'Error occurred');
  }
};

export const viewCatalog = async (search: string) => {
  try {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/catalog/get/${params}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.data.success) toast.error(response.data.error);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'Error occurred');
  }
};

export const getbyIdCatalog = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/products/getById/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.data.success) toast.error(response.data.error);
    return response.data.product;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'Error occurred');
  }
};

export const deleteCatalog = async (id) => {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/catalog/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.data.success) toast.error(response.data.error);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'Error occurred');
  }
};
