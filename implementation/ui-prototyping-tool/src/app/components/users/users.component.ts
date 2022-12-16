import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { User, UserSet } from 'src/app/classes/concrete-classes';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    users: User[] = []

    constructor(private uService: UserService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

    ngOnInit() {
        this.getUsers()
    }

    async getUsers() {
        try {
            this.users = await lastValueFrom(this.uService.getUsers())
        } catch (e) {
            console.error(e)
        }
    }

    async createNewUsers() {
        const dialogRef = this.dialog.open(DialogForConfirmation, {
            width: '250px',
        });

        let result = await firstValueFrom(dialogRef.afterClosed())
        console.log('The dialog was closed', result);
        if (result) {
            try {
                await lastValueFrom(this.uService.createSetofUsers(result))
                this.getUsers()
            } catch (e) {
                console.error(e)
            }
        }
    }

    getVariants(user: User): string {
        return user.experimentVariants.map(t => t.variant_name).reduce((p, c) => c + '' + p, '')
    }

}

@Component({
    templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogForConfirmation implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<DialogForConfirmation>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder
    ) { }

    form!: FormGroup

    user: UserSet = new UserSet()

    ngOnInit(): void {
        this.form = this.fb.group({ number_of_users: ['', Validators.required], password: ['', Validators.required] })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}