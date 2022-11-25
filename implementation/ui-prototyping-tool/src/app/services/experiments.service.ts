import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../classes/abstract-classes';
import { Experiment } from '../classes/concrete-classes';

@Injectable({
    providedIn: 'root'
})
export class ExperimentsService {

    constructor(private http: HttpClient) { }

    getExperiments(): Observable<Experiment[]> {
        return this.http.get<Experiment[]>(url + 'experiments')
    }

    getExperiment(id: string): Observable<Experiment> {
        return this.http.get<Experiment>(url + 'experiments/' + id)
    }

    createNewExperiment(experiment: Experiment) {
        return this.http.post(url + 'experiments', experiment)
    }

    deleteExperiment(experiment: Experiment) {
        return this.http.delete(url + 'experiments/' + experiment.id)
    }

    createNewExperimentVariant(experiment: Experiment) {
        return this.http.patch(url + 'experiments/' + experiment.id, {...experiment})
    }
}
