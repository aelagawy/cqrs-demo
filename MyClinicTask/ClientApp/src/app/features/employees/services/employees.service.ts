import { Injectable } from "@angular/core";
import { ApiHandler } from "src/app/core/api-handler";
import { EndPoint } from "src/app/core/end-point";
import { EmployeeVm, EmployeesVm, PostEmployeeCmd } from "../models/employee";
import { PaginationQuery } from "src/app/shared/models/pagination";

@Injectable()
export class EmployeesService {
    constructor(private api: ApiHandler) { }

    get(id: number) {
        return this.api.get<EmployeeVm>(EndPoint.EMPLOYEES, id).toPromise();
    }

    search(pagination: PaginationQuery, query: string = '') {
        return this.api.get<EmployeesVm>(EndPoint.EMPLOYEES, null, { ...pagination, query });
    }

    create(cmd: PostEmployeeCmd) {
        return this.api.create<PostEmployeeCmd, number>(EndPoint.EMPLOYEES, cmd).toPromise();
    }
}