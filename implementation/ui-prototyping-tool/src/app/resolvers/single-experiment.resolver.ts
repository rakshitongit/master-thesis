import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Experiment } from '../classes/concrete-classes';
import { ExperimentsService } from '../services/experiments.service';

@Injectable({
    providedIn: 'root'
})
export class SingleExperimentResolver implements Resolve<Experiment> {

    constructor(private exService: ExperimentsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Experiment> {
        return this.exService.getExperiment(route.paramMap.get('id') || '')
    }
}
