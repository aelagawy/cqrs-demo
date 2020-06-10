import { Injectable, EventEmitter } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LoadingService {
    public bodyLoading: EventEmitter<boolean>;

    constructor() {
        this.bodyLoading = new EventEmitter();
    }

    public load(loading: boolean = true) {
        this.bodyLoading.emit(loading);
    }
}
