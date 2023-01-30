import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeAll, Observable } from 'rxjs';
import { url } from '../classes/abstract-classes'
import { View } from '../classes/concrete-classes';

@Injectable({
    providedIn: 'root'
})
export class ViewsService {

    localUrl: string = url + 'views'

    constructor(private http: HttpClient) { }

    saveView(view: View): Observable<void> {
        return this.http.post<void>(this.localUrl, view)
    }

    getMasterView(): Observable<View> {
        return this.http.get<View[]>(this.localUrl).pipe(mergeAll())
    }
}
