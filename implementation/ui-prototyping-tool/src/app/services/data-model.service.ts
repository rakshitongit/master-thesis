import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../classes/abstract-classes';
import { DataModel } from '../classes/concrete-classes';

@Injectable({
    providedIn: 'root'
})
export class DataModelService {

    constructor(private http: HttpClient) { }

    getAllData(key?: string): Observable<DataModel[]> {
        return this.http.get<DataModel[]>(url + 'data-models')
    }

    deleteData(dataModel: DataModel) {
        return this.http.delete(url + 'data-models/' + dataModel.id)
    }
}
