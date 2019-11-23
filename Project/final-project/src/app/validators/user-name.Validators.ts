import { AbstractControl, ValidatorFn } from '@angular/forms';

export function userNameValidator(notAllowedName: RegExp): ValidatorFn {
  return (control: AbstractControl):  { [key: string]: any } | null => {
    const notAllowed = notAllowedName.test(control.value);
    return notAllowed ? { notAllowedName: {value: control.value} } : null;
  };
}
