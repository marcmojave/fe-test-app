import { User } from "./user.model";

/**
 * Use this to return a message to the user after a successful request.
 */
export interface ResponseSuccess {
  message: string,
  user: User
}
