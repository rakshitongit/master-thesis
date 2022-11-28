import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Variant } from '../classes/concrete-classes';
import { ExperimentsService } from '../services/experiments.service';

@Injectable({
  providedIn: 'root'
})
export class SingleVariantResolver implements Resolve<Variant> {

  constructor(private exService: ExperimentsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Variant> {
    return this.exService.getExperimentVariant(route.paramMap.get('id') || '', route.paramMap.get('variantId') || '')
  }
}
