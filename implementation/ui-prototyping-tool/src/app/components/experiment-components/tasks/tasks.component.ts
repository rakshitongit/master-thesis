import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DataModel, Experiment, ExperimentTask } from 'src/app/classes/concrete-classes';
import { DataModelService } from 'src/app/services/data-model.service';
import { ExperimentsService } from 'src/app/services/experiments.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

    constructor(private router: ActivatedRoute, private service: ExperimentsService, private fb: FormBuilder, private dataService: DataModelService) { }

    experiment!: Experiment

    experimentForm!: FormGroup

    addTask: ExperimentTask = new ExperimentTask()

    dataModels: DataModel[] = []

    ngOnInit(): void {
        this.getAllData()
        this.experiment = this.router.snapshot.data["experiment"]
        this.experimentForm = this.fb.group({ experimentTaskName: ['', Validators.required], experimentTaskDescription: ['', Validators.required], dataModel: ['', Validators.required] })
    }

    async deleteExperimentTask(task: ExperimentTask) {
        this.experiment.experimentTasks = this.experiment.experimentTasks.filter(t => t.id !== task.id)
        try {
            await firstValueFrom(this.service.createNewExperimentVariant(this.experiment))
        } catch(e) {
            console.error(e)
        }
    }

    async getAllData() {
        try {
            this.dataModels = await firstValueFrom(this.dataService.getAllData())
        } catch(e) {
            console.error(e)
        }
    }

    async submitExperimentTask() {
        const task: ExperimentTask = new ExperimentTask()
        task.name = this.experimentForm.value.experimentTaskName
        task.description = this.experimentForm.value.experimentTaskDescription
        task.dataModel = this.experimentForm.value.dataModel
        task.id = uuidv4()
        if(this.experiment.experimentTasks) {
            this.experiment.experimentTasks.push(task)
        } else {
            this.experiment.experimentTasks = [task]
        }
        try {
            await firstValueFrom(this.service.createNewExperimentVariant(this.experiment, true, task))
            this.experimentForm.reset()
        } catch(e) {
            console.error(e)
        }
    }

}
