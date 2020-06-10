import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from '../../services/employees.service';
import { EmployeeDto } from '../../models/employee';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css'],
  providers: [EmployeesService]
})
export class ViewEmployeeComponent implements OnInit {
  dto: EmployeeDto;

  constructor(private route: ActivatedRoute,
    private employeesService: EmployeesService) { }

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    this.employeesService.get(Number(employeeId))
      .then(result => {
        this.dto = result.item;
      });
  }
}
