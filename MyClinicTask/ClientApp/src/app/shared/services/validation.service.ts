import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable()
export class ValidationService {
    getValidatorErrorMessage(validatorName: string) {
        let config = {
          required: 'Field is required.',
          invalidNumbersOnly: 'Numbers only!',
        };
    
        return config[validatorName];
      }
}

const NUMBERS_ONLY_REGEX = /\d+/g
export function numbersOnlyValidator(control: AbstractControl) { 
  return NUMBERS_ONLY_REGEX.test(control.value) ? null : { invalidNumbersOnly: true };
}