import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { EmployeesService } from './employees.service'
import { LoadingService } from "src/app/shared/services/loading.service";
import { EmployeeDto, EmployeesVm } from "../models/employee";
import { PaginationQuery } from "src/app/shared/models/pagination";

export class EmployeesDataSource implements DataSource<EmployeeDto> {
    public EmployeesSubject = new BehaviorSubject<EmployeeDto[]>([]);
    public countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();

    constructor(private EmployeesService: EmployeesService, private loader: LoadingService) { }

    loadEmployees(pagination: PaginationQuery, query: string = null) {
        this.EmployeesService.search(pagination, query)
            .pipe(
                catchError(() => of([])),
                finalize(() => { })
            )
            .subscribe((result: EmployeesVm) => {
                this.EmployeesSubject.next(result.list);
                this.countSubject.next(result.recordsCount);
                this.loader.load(false);
            });
    }

    connect(): Observable<EmployeeDto[]> {
        return this.EmployeesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.EmployeesSubject.complete();
        this.countSubject.complete();
    }
}
