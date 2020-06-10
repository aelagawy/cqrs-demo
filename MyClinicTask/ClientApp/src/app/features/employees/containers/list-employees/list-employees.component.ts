import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs/internal/observable/merge';
import { EmployeesService } from '../../services/employees.service';
import { EmployeesDataSource } from '../../services/employees.datasource';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
  providers: [EmployeesService]
})
export class ListEmployeesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'position', 'salary', 'tools'];
  dataSource: EmployeesDataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(private loader: LoadingService,
    private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 10;
    this.sort.active = 'firstName';
    this.sort.direction = 'asc';
    this.dataSource = new EmployeesDataSource(this.employeesService, this.loader);
    this.loadEmployees();
  }

  ngAfterViewInit() {
    this.dataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      ).subscribe();

    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        tap(() => {
          this.loadEmployees();
        })
      ).subscribe(() => this.loader.load());

    fromEvent(this.filter.nativeElement, 'search')
      .pipe(
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadEmployees();
        })
      ).subscribe(() => this.loader.load());
  }

  private loadEmployees() {
    this.dataSource.loadEmployees({ pageIndex: this.paginator.pageIndex, pageSize: this.paginator.pageSize, sort: this.sort.active, dir: this.sort.direction }, this.filter.nativeElement.value.trim());
  }
}
