import { user } from "@prisma/client";

export type RegisterRequest = {
  name: string;
  username: string;
  role_id: number;
  prodi_id?: number
  email: string;
  password: string;
};

export type SearchUsers = {
  page?: string,
  q?: string,
  role_id?: string
}

export type UpdateRequest = {
  name: string;
  username: string;
  email: string;
  role_id: number;
};

export type UserResponse = {
  name: string;
  username: string;
  email: string;
};

export type PasswordRequest = {
  password: string;
};

export type RegisterResponse = {
  token: string;
};

export function toUserResponse(user: user): UserResponse {
  return {
    name: user.name,
    username: user.username,
    email: user.email,
  };
}
