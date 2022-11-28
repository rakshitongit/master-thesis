import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Variant } from 'src/app/classes/concrete-classes';

@Component({
    selector: 'app-experiment-detail',
    templateUrl: './experiment-detail.component.html',
    styleUrls: ['./experiment-detail.component.scss']
})
export class ExperimentDetailComponent implements OnInit {

    constructor(private router: ActivatedRoute) { }

    currentVariant!: Variant

    ngOnInit(): void {
        this.currentVariant = this.router.snapshot.data["variant"]
        console.info(this.currentVariant)
    }

}
