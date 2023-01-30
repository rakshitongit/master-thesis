import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { View } from '../classes/concrete-classes';
import { HelperService } from '../services/helper.service';

@Injectable({
    providedIn: 'root'
})
export class ViewResolver implements Resolve<View> {

    constructor(private helper: HelperService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<View> | Promise<View> {
        const id = route.paramMap.get('id')
        if(id == null) {
            return this.helper.getData()
        }
        return this.helper.getViewFromId(id || '')
    }
}
