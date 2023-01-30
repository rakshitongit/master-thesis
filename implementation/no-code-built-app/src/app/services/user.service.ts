import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../classes/abstract-classes';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    loadCurrentUser(): Observable<any> {
        return this.http.get<any>(url + 'whoAmI');
    }

    login(user: any) {
        return this.http.post(url + 'users/login', user)
    }

    logOut() {
        localStorage.clear()
    }

}
