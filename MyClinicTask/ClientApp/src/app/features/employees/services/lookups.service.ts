import { Injectable } from "@angular/core";
import { EndPoint } from "src/app/core/end-point";
import { ApiHandler } from "src/app/core/api-handler";
import { NationalitiesVm, PositionsVm } from "../models/lookup";

@Injectable()
export class LookupsService {
    constructor(private api: ApiHandler) { }

    getNationalities() {
        return this.api.get<NationalitiesVm>(EndPoint.NATIONALITIES).toPromise();
    }

    getPositions() {
        return this.api.get<PositionsVm>(EndPoint.POSITIONS).toPromise();
    }
}