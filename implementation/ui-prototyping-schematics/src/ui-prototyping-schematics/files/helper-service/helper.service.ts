import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
var dasherize = require('dasherize');

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor(private http: HttpClient) { }

    getData() {
        return this.http.get<any>("https://raw.githubusercontent.com/rakshitongit/ui-prototyping-schematics-files/main/files/example.json")
    }

    async getRoutingData(id: string) {
        const data = (await firstValueFrom(this.getData())).schemaForAngular
        if (data.id == id) {
            return dasherize(data.name)
        } else {
            for (let v of data.children) {
                if (v.id == id) {
                    return dasherize(v.name)
                }
            }
        }
        return undefined
    }
}
