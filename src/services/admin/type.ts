export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

export interface ErrorResponse {
  message: string;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  password: string;
  otp: string | null;
  otpExpiresAt: string | null;
  role: 'admin' | 'user' | 'moderator';
  createdAt: string;
  updatedAt: string;
  __v: number;
}
