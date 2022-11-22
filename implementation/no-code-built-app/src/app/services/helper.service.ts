import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';
import { url } from '../classes/abstract-classes';
import { View } from '../classes/concrete-classes';
var dasherize = require('dasherize');

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    private _masterView!: View

    constructor(private http: HttpClient) { }

    getData(): Observable<View> {
        return this.http.get<any>(url + "json/example.json").pipe(map(t => t.schemaForAngular))
    }

    async getRoutingData(id: string) {
        const data = (await firstValueFrom(this.getData()))
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

    async getViewFromId(id: string): Promise<View> {
        if (id) {
            const masterView: View = await lastValueFrom(this.getData())
            if (masterView.id == id) {
                return masterView
            } else {
                for (let c of masterView.children) {
                    if (c.id === id) {
                        return c
                    }
                }
            }
        }
        return new View()
    }
}
