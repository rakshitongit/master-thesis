import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../classes/abstract-classes';
import { User, UserSet } from '../classes/concrete-classes';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(url + 'users')
    }

    createSetofUsers(set: UserSet) {
        return this.http.post(url + 'users/newSet', set)
    }
}
