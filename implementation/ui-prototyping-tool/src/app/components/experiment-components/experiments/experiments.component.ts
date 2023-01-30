import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { EvaluationType, Experiment } from 'src/app/classes/concrete-classes';
import { ExperimentsService } from 'src/app/services/experiments.service';

@Component({
    selector: 'app-experiments',
    templateUrl: './experiments.component.html',
    styleUrls: ['./experiments.component.scss']
})
export class ExperimentsComponent implements OnInit {

    experiments: Experiment[] = []

    addExperiment: Experiment = new Experiment()
    experimentEval: string[] = Object.keys(EvaluationType)

    experimentForm!: FormGroup

    constructor(private exService: ExperimentsService, private fb: FormBuilder, private router: Router) { }

    async ngOnInit() {
        this.experimentForm = this.fb.group({ experimentName: ['', Validators.required], experimentStartDate: ['', Validators.required], experimentEndDate: ['', Validators.required], experimentPriority: ['', Validators.required], experimentEval: ['', Validators.required] })
        this.refreshExperiments()
    }

    async refreshExperiments() {
        try {
            this.experiments = await firstValueFrom(this.exService.getExperiments())
        } catch (e) {
            console.error(e)
        }
    }


    async submitExperiment() {
        const experiment: Experiment = new Experiment()
        experiment.name = this.experimentForm.value.experimentName
        experiment.start = this.experimentForm.value.experimentStartDate
        experiment.end = this.experimentForm.value.experimentEndDate
        experiment.priority = this.experimentForm.value.experimentPriority
        experiment.evaluationType = this.experimentForm.value.experimentEval
        await lastValueFrom(this.exService.createNewExperiment(experiment))
        this.experimentForm.reset()
        this.refreshExperiments()
    }

    async deleteExperiment(experiment: Experiment) {
        this.experiments = this.experiments.filter(exp => exp.id !== experiment.id)
        await lastValueFrom(this.exService.deleteExperiment(experiment))
    }

    viewExperiment(experiment: Experiment) {
        this.router.navigateByUrl('/experiments/' + experiment.id)
    }

}
