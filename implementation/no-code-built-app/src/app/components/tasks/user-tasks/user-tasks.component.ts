import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';

@Component({
    selector: 'app-user-tasks',
    templateUrl: './user-tasks.component.html',
    styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent implements OnInit {

    tasks: any[] = []

    constructor(private helper: HelperService, private snackbar: MatSnackBar) { }

    async ngOnInit() {
        this.tasks = (await firstValueFrom(this.helper.getExperimentData())).experimentTasks
    }

    startTask(task: any) {
        if (this.helper.canStartTimer()) {
            this.helper.startTimer()
            task.status = 'In Progress'
            task.timeTaken = this.helper.timer
            this.snackbar.open("Task started!", 'Ok', { duration: 2000 })
        } else {
            this.snackbar.open("A task is already running, please finish that or stop it", 'Ok', { duration: 2000 })
        }
    }

    stopTask(task: any) {
        if (!this.helper.canStartTimer()) {
            this.helper.stopTimer()
            task.timeTaken = this.helper.timer
            this.snackbar.open("Task stopped!", 'Ok', { duration: 2000 })
        } else {
            this.snackbar.open("No task is running!", 'Ok', { duration: 2000 })
        }
    }

}