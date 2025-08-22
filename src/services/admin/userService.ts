import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ErrorResponse, RegisterParams } from './type';

export const registerUser = async (userData: RegisterParams) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`, userData);

    if (!response.data.success) toast.error(response.data.error);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'Error occurred');
  }
};

export const forgotPasswordEmail = async (email: string | null) => {
  try {
    const response = await axios.post(`api/forgot-password`, { email });

    if (!response.data.success) toast.error(response.data.error);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'Error occurred');
  }
};

export const otpVerification = async (otp: string | null) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/verify-otp`, { otp });

    if (!response.data.success) toast.error(response.data.error);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'Error occurred');
  }
};

export const resetPassword = async (email: string | null, password: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reset-password`, { email, password });

    if (!response.data.success) toast.error(response.data.error);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'Error occurred');
  }
};
