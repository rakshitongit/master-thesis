import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    user: any = {}

    form!: FormGroup

    constructor(private userService: UserService, private fb: FormBuilder, private router: Router) { }

    ngOnInit(): void {
        this.form = this.fb.group({ email: ['', Validators.email], password: ['', Validators.required] })
    }

    async onSubmit() {
        try {
            this.user.email = this.form.value['email']
            this.user.password = this.form.value['password']
            const token: any = await lastValueFrom(this.userService.login(this.user))
            localStorage.setItem('token', token.token)
            this.router.navigateByUrl('/default/master/view')
        } catch (e) {
            console.error(e)
        }
    }

}
