/**
 * This represents the shape the user data should be in when making a request to the api.
 */
export interface UserDto {
  username: string,
  first_name: string,
  last_name?: string,
  email: string,
  id_status: number
}
