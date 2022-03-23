import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { User } from "../users/shared/user.model";
import { catchError, map, tap } from "rxjs/operators";
import { UserDto } from "../users/shared/user.dto";
import { UserStatus } from "../users/shared/user-status.enum";
import { ResponseError } from "../users/shared/response-error.model";
import { createUserErrorText, userRetrievalErrorText } from "../shared/ui-text";
import { ResponseSuccess } from "../users/shared/response-success.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly rootUrl = 'http://localhost:3000'

  constructor(private httpClient: HttpClient) {
  }

  findUser(username: string): Observable<User> {
    return this.httpClient.get<any>(this.rootUrl + '/users?username=' + username)
      .pipe(
        map(user => user.data),
        tap(user => console.log('find user: ', user))
      )
  }

  getUsers(): Observable<User[] | ResponseError> {
    return this.httpClient.get<any>(this.rootUrl + '/users')
      .pipe(
        map(response => response.data.map(user => (
          {
            username: user.username,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            fullName: user.first_name + ' ' + (user.last_name || ''),
            status: user.id_status === 1 ? UserStatus.Active : UserStatus.Inactive,
            dateCreated: user.created_date
          } as User))),
        tap(data => console.log('users response: ', data)),
        catchError(err => UserService.handleHttpError(err, userRetrievalErrorText))
      )
  }

  addUser(user: User): Observable<ResponseSuccess | ResponseError> {
    const userDto = UserService.createUserObjForTransfer(user);
    return this.httpClient.post<any>(this.rootUrl + '/users', { user: userDto })
      .pipe(
        map(response => ({
          message: response.message,
          user: response.data.user
        } as ResponseSuccess)),
        catchError(err => UserService.handleHttpError(err, createUserErrorText))
      );
  }

  private static handleHttpError(error: HttpErrorResponse, userText: string): Observable<ResponseError> {
    const errorObj: ResponseError = {
      errorNumber: error.status,
      message: error.statusText,
      userMessage: userText
    }
    return throwError(errorObj);
  }

  private static createUserObjForTransfer(user: User): UserDto {
    const defaultUserStatus = 1;
    return {
      username: user.username,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      id_status: defaultUserStatus
    };
  }
}
