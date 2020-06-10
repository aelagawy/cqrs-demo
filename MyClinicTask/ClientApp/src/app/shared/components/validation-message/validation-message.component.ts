import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css'],
  providers: [ValidationService]
})
export class ValidationMessageComponent {
  @Input() control: FormControl;

  constructor(private validation: ValidationService) { }

  get errorMessage() {
    if (this.control)
      for (let propertyName in this.control.errors) {
        if (
          this.control.errors.hasOwnProperty(propertyName) &&
          this.control.touched
        ) {
          return this.validation.getValidatorErrorMessage(
            propertyName
          );
        }
      }
    return null;
  }
}