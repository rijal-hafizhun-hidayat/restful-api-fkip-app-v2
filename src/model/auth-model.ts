import { user } from "@prisma/client";

export type LoginRequest = {
  username: string;
  password: string;
};

export type TokenRequest = {
  token: string;
};

export type UpdatePasswordRequest = {
    password: string
}

export type LoginResponse = {
  name: string;
  token?: string | null;
};

export type UpdateProfileRequest = {
  name: string;
  username: string;
  email: string;
};

export function toLoginResponse(user: user, token: string): LoginResponse {
  return {
    name: user.name,
    token: token,
  };
}

export function toUpdateProfileRequest(user: user): UpdateProfileRequest {
  return {
    name: user.name,
    username: user.username,
    email: user.email,
  };
}
