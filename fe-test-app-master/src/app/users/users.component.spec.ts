import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { UserService } from "../services/user.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { HttpClientModule } from "@angular/common/http";
import { MatSortModule } from "@angular/material/sort";
import { CustomDatePipe } from "../shared/custom-date.pipe";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  const userServiceStub: Partial<UserService> = {
    getUsers() {
      return of([]);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, HttpClientModule, MatTableModule,
        MatSortModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule],
      declarations: [UsersComponent, CustomDatePipe],
      providers: [{ provide: UserService, useValue: userServiceStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getUsers()', function () {
      const getUsersSpy = spyOn(component, 'getUsers');
      component.ngOnInit();
      expect(getUsersSpy).toHaveBeenCalledTimes(1);
    });
  })

  //TODO - fix test
  // describe('getUsers', () => {
  //   const user1 = {username: 'm', fullName: 'm', lastName: 'h'} as User;
  //   const user2 = {username: 'm', fullName: 'm', lastName: 'h'} as User;
  //   it('should return requested users', function () {
  //     const getUsersSpy1 = spyOn(userServiceStub, 'getUsers').and.returnValue(of([user1, user2]));
  //     component.getUsers();
  //     expect(getUsersSpy1).toHaveBeenCalledTimes(1);
  //     expect(component.dataSource.data.length).toEqual(2);
  //   });
  // })
});
