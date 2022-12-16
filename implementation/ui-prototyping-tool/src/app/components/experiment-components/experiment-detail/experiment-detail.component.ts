import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Experiment, Variant } from 'src/app/classes/concrete-classes';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
    selector: 'app-experiment-detail',
    templateUrl: './experiment-detail.component.html',
    styleUrls: ['./experiment-detail.component.scss']
})
export class ExperimentDetailComponent implements OnInit {

    constructor(private router: ActivatedRoute, private shared: CommunicationService) { }

    currentVariant!: Variant
    currentExperiment!: Experiment

    ngOnInit(): void {
        this.currentVariant = this.router.snapshot.data["variant"]
        this.currentExperiment = this.router.snapshot.data["experiment"]
        this.shared.experiment = this.currentExperiment
    }

}
