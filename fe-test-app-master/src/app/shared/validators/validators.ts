import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";
import { UserService } from "../../services/user-service/user.service";
import { map } from "rxjs/operators";

/**
 * This is a custom validator that can be used to validate input data in a reactive form.
 * The function takes an Angular control object and returns either null if the control
 * value is valid or a validation error object.
 *
 * @param invalidChars - containing characters that are forbidden.
 */
export function invalidCharacters(invalidChars: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalidCharsFound = invalidChars.test(control.value);
    return invalidCharsFound ? { invalidCharacters: { value: control.value } } : null;
  };
}

/**
 * This is a custom validator that can be used to check data entered in a reactive form is unique.
 * The function takes an Angular control object and returns either null if the control
 * value is unique or a validation error object.
 *
 * @param userService - api service used to find if user already exists.
 */
export function duplicateName(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return userService.findUser(control.value).pipe(
      map(user => {
        return Object.keys(user).length > 0 ? { exists: true } : null
      })
    )
  };
}
