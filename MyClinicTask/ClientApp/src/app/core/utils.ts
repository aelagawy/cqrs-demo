import { FormControl, FormArray, FormGroup } from "@angular/forms";

export class Utils {
    public static validateAllFormFields(formGroup: FormGroup | FormArray) {
        ((formGroup instanceof FormArray) ? formGroup.controls :
            Object.keys(formGroup.controls)).forEach((field, i) => {
                const control = formGroup instanceof FormArray ?
                    formGroup.controls[i]
                    : formGroup.get(field);
                if (control instanceof FormControl) {
                    control.markAsTouched({ onlySelf: true });
                } else if (control instanceof FormGroup
                    || control instanceof FormArray) {
                    this.validateAllFormFields(control);
                }
            });
    }
}