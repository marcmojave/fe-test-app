import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { UserService } from "../../services/user-service/user.service";
import { duplicateName, emailValidator, invalidCharacters } from "../../shared/validators/validators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomError } from "../models/custom-error.model";
import { Router } from "@angular/router";
import { User } from "../models/user.model";

@Component({
  selector: 'exads-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public addUserForm: FormGroup;
  public readonly invalidCharactersText = '{ } [ ] " . !';
  readonly invalidCharsRegex: RegExp = /[.\[\]{}"!]/i;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.addUserForm = this.formBuilder.group({
      username: ['', {
        validators: [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          invalidCharacters(this.invalidCharsRegex)
        ],
        asyncValidators: [duplicateName(this.userService)],
        updateOn: 'blur'
      }],
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, emailValidator]]
    });
  }

  onSubmit(): void {
    this.addUser();
  }

  addUser(): void {
    if (this.addUserForm.valid) {
      this.userService.addUser(this.addUserForm.value).subscribe({
        next: (user: User) => {
          this.router.navigateByUrl('/users').then(null);
          this.snackBar.open('User ' + user.username + ' added successfully',
            null, { duration: 3000 });
        },
        error: (err: CustomError) => this.snackBar.open(err.userMessage, 'Close')
      })
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  // getters for form elements
  get username(): FormControl {
    return this.addUserForm.get('username') as FormControl;
  }

  get firstName(): FormControl {
    return this.addUserForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.addUserForm.get('lastName') as FormControl;
  }

  get email(): FormControl {
    return this.addUserForm.get('email') as FormControl;
  }
}
