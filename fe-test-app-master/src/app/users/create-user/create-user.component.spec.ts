import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserComponent } from './create-user.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { UserService } from "../../services/user.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {  ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserComponent ],
      imports: [ MatSnackBarModule, ReactiveFormsModule, HttpClientModule, RouterModule, RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule ],
      providers: [ UserService ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
