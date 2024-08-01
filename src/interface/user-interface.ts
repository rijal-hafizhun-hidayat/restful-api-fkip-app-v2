import { user } from "@prisma/client";
import { Request } from "express";

export interface UserInterface extends Request {
  user?: user;
}
