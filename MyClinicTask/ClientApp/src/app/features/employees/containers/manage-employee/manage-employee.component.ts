import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Utils } from 'src/app/core/utils';
import { NationalityDto, PositionDto } from '../../models/lookup';
import { LookupsService } from '../../services/lookups.service';
import { EmployeesService } from '../../services/employees.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { PostEmployeeCmd } from '../../models/employee';
import { numbersOnlyValidator } from 'src/app/shared/services/validation.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css'],
  providers: [LookupsService, EmployeesService]
})
export class ManageEmployeeComponent implements OnInit {
  form: FormGroup;
  nationalities: NationalityDto[] = [];
  positions: PositionDto[] = [];

  get firstName() { return this.form.get('firstName'); };
  get middleName() { return this.form.get('middleName'); };
  get lastName() { return this.form.get('lastName'); };
  get dateOfBirth() { return this.form.get('dateOfBirth'); };
  get nationality() { return this.form.get('nationalityId'); };
  get position() { return this.form.get('positionId'); };
  get salary() { return this.form.get('salary'); };

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loader: LoadingService,
    private alert: AlertService,
    private lookupsService: LookupsService,
    private employeesService: EmployeesService) { }

  async ngOnInit() {
    this.formInit();
    await Promise.all([
      this.lookupsService.getNationalities()
        .then(result => this.nationalities = result.list),
      this.lookupsService.getPositions()
        .then(result => this.positions = result.list)
    ]);
  }

  onSubmit() {
    if (!this.form.valid)
      return Utils.validateAllFormFields(this.form);

    if (this.dateOfBirth.value)
      this.dateOfBirth.setValue(moment(this.dateOfBirth.value).format());

    this.loader.load();

    this.employeesService.create(this.form.value as PostEmployeeCmd)
      .then(id => {
        this.alert.success('Adding done successfully.');
        setTimeout(() => {
          this.router.navigate(['../view', id], { relativeTo: this.route })
        }, 1000);
      }).finally(() => this.loader.load(false));
  }

  private formInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      nationalityId: ['', [Validators.required]],
      positionId: ['', [Validators.required]],
      salary: ['', [Validators.required/*, numbersOnlyValidator*/]]
    });
  }
}
