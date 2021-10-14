import { AbstractControl, ValidatorFn } from '@angular/forms';

export const greaterThanZeroValidator: ValidatorFn = (control: AbstractControl) => {
  return (typeof control.value !== 'number' || control.value === 0) ? {greaterThanZero: true} : null;
};

