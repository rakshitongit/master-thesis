import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';
import { url } from '../classes/abstract-classes';
import { DataModel, TaskProgress, View } from '../classes/concrete-classes';
var dasherize = require('dasherize');

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    private _timer: { time: number } = { time: 0 }
    get timer() {
        return this._timer
    }

    private interval: any;

    private _masterView!: View

    constructor(private http: HttpClient) { }

    getExperimentData(): Observable<any> {
        return this.http.get<any>(url + 'user/experiments')
    }

    updateExperimentData(experiment: any): Observable<any> {
        return this.http.post<any>(url + 'user/experiments', experiment)
    }

    getData(): Observable<View> {
        return this.http.get<any>(url + 'user/experiments').pipe(map(t => t.masterView))
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

    getDataFromKey(key: string): Observable<DataModel | undefined> {
        return this.http.get<DataModel[]>(url + 'data-models').pipe(map(items => items.find(item => item.key === key)))
    }

    analyseKeyFromDatModel(key: string, tasks: any[]): boolean {
        const toRet: boolean = false
        if(this.canStartTimer()) {
            return false
        }
        if (key.trim() !== '') {
            for (let t of tasks) {
                if (t.description.toString().indexOf(key) != -1) {
                    // task completed
                    t.status = TaskProgress.COMPLETED
                    t.timeTaken = this.timer
                    return true
                }
            }
        }
        return toRet
    }

    canStartTimer(): boolean {
        if (this.interval == undefined) {
            return true
        }
        return false
    }

    startTimer() {
        this.interval = setInterval(() => {
            this._timer.time++;
        }, 1000)
    }

    stopTimer() {
        clearInterval(this.interval)
        this.interval = undefined
    }
}
