import { InjectionToken } from '@angular/core';

export const defaultErrors = {
  max: ({ max, actual }: { max: number; actual: number }) => `Wartość ${actual} jest większa od maksymalnej ${max}`,
  required: (error: any) => `Pole jest wymagane`,
  minlength: ({ requiredLength, actualLength }: { requiredLength: number; actualLength: number }) =>
    `Wartość powinna zawierać co najmniej ${requiredLength}, podano ${actualLength}`,
  maxlength: ({ requiredLength, actualLength }: { requiredLength: number; actualLength: number }) =>
    `Wartość powinna zawierać co najwyżej ${requiredLength}, podano ${actualLength}`,
  invalidDate: () => `Wartość powinna być w formacie RRRR-MM-DD gg:mm`,
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors,
});
