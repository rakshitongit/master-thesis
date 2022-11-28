import { Component, Input, OnInit } from '@angular/core';
import { Variant } from 'src/app/classes/concrete-classes';

@Component({
    selector: 'app-experiment-right-panel',
    templateUrl: './experiment-right-panel.component.html',
    styleUrls: ['./experiment-right-panel.component.scss']
})
export class ExperimentRightPanelComponent implements OnInit {

    @Input('currentVariant')
    currentVariant!: Variant

    constructor() { }

    ngOnInit(): void {
    }

}
