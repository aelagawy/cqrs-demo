export interface NationalitiesVm {
    list: NationalityDto[];
}

export interface PositionsVm {
    list: PositionDto[];
}

export interface NationalityDto {
    id: number,
    name: string
}

export interface PositionDto {
    id: number,
    title: string
}