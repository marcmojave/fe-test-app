import { UserDto } from "./user.dto";

/**
 * Represents the response from api http://localhost:3000/users
 */
export interface GetUsersResponse {
  data: UserDto[];
}
