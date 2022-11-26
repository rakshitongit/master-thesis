import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/classes/concrete-classes';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    users: User[] = []

    constructor(private uService: UserService) { }

    async ngOnInit() {
        try {
            this.users = await lastValueFrom(this.uService.getUsers())
        } catch(e) {
            console.error(e)
        }
    }

    async createNewUsers() {
        const res = window.confirm("Do you really want to add new set of users?")
        if(res) {
            try {
                await lastValueFrom(this.uService.createSetofUsers())
            } catch(e) {
                console.error(e)
            }
        }
    }

}
