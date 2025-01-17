import { async, TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { User } from "../users/shared/user.model";
import { ResponseError } from "../users/shared/response-error.model";
import { userRetrievalErrorText } from "../shared/ui-text";

describe('UserService', () => {
  // creates mock http requests & includes methods to specify http response from mock request
  // can write tests against the mock request, aswell as how your application processed the response returned by
  // mock request
  let httpTestingController: HttpTestingController;
  let userService: UserService;

  const testUsers = {
    "data": [
      {
        "id": 1,
        "first_name": "Charo",
        "last_name": "Uccello",
        "email": "cuccello0@bing.com",
        username: "cuccello0",
        "created_date": "2019-09-28T14:55:58Z",
        "id_status": 3
      },
      {
        "id": 2,
        "first_name": "Levy",
        "last_name": "Linnard",
        "email": "llinnard1@hatena.ne.jp",
        "username": "llinnard1",
        "created_date": "2019-12-03T07:38:12Z",
        "id_status": 1
      }] };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();

    httpTestingController = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    afterEach(() => {
      // all http requests handled & none pending
      httpTestingController.verify();
    });

    it('should GET all users', () => {
      userService.getUsers().subscribe((data: User[]) => {
        expect(data.length).toEqual(2);
      });

      // ensure only 1 request matching the url is sent
      const usersRequest: TestRequest = httpTestingController.expectOne('http://localhost:3000/users');
      // good to check here that correct verb being used, correct header meta data etc
      expect(usersRequest.request.method).toEqual('GET');
      // add users to the body of response sent to calling code
      // this is how you generate a http response for the request
      usersRequest.flush(testUsers);
    });

    it('should return a ResponseError', () => {
      userService.getUsers().subscribe(
        (err: ResponseError) => {
          expect(err.userMessage).toEqual(userRetrievalErrorText);
        }
      );
      const usersRequest: TestRequest = httpTestingController.expectOne('http://localhost:3000/users');
      usersRequest.flush({
        status: 500,
        statusText: 'Server Error'
      });
    });

  });
});
