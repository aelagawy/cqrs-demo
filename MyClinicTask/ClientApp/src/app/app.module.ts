import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './shared/components/nav-menu/nav-menu.component';
import { ListEmployeesComponent } from './features/employees/containers/list-employees/list-employees.component';
import { ViewEmployeeComponent } from './features/employees/containers/view-employee/view-employee.component';
import { ManageEmployeeComponent } from './features/employees/containers/manage-employee/manage-employee.component';
import { ValidationMessageComponent } from './shared/components/validation-message/validation-message.component';
import { BodyLoaderComponent } from './shared/components/body-loader/body-loader.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ListEmployeesComponent,
    ViewEmployeeComponent,
    ManageEmployeeComponent,
    ValidationMessageComponent,
    BodyLoaderComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'employees' },
      {
        path: 'employees', children: [
          { path: '', pathMatch: 'full', redirectTo: 'list' },
          { path: 'list', component: ListEmployeesComponent },
          { path: 'add', component: ManageEmployeeComponent },
          { path: 'view/:id', component: ViewEmployeeComponent },
        ]
      },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['L', 'l']
        },
        display: {
          dateInput: ['L', 'l'],
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
