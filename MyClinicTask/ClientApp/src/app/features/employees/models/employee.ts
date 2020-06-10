import { NationalityDto, PositionDto } from "./lookup";

export interface EmployeesVm {
    list: EmployeeDto[],
    recordsCount: number
}

export interface EmployeeVm {
    item: EmployeeDto
}

export interface EmployeeDto {
    id: number,
    firstName: string,
    middleName: string,
    lastName: string,
    dateOfBirth: Date,
    nationality: NationalityDto,
    position: PositionDto,
    salary: number
}

export interface PostEmployeeCmd {
    firstName: string,
    middleName: string,
    lastName: string,
    dateOfBirth: string,
    nationalityId: number,
    positionId: number,
    salary: number
}