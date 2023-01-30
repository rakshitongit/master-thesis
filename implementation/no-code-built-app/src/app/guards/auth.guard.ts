import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean | UrlTree> {

        try {
            await lastValueFrom(this.userService.loadCurrentUser())
            console.log('true')
            return true
        } catch (e) {
            if (e instanceof HttpErrorResponse) {
                if(e.status === 200) {
                    return true
                }
                if (e.status === 401) {
                    this.router.navigateByUrl("/login")
                } else {
                    this.router.navigateByUrl("/login")
                    // this.router.navigateByUrl("/500")
                }
            }
            return false
        }

    }

}
