import { Component, OnInit } from '@angular/core';
import { View } from 'src/app/classes/concrete-classes';

@Component({
    selector: 'app-experiment-middle-panel',
    templateUrl: './experiment-middle-panel.component.html',
    styleUrls: ['./experiment-middle-panel.component.scss']
})
export class ExperimentMiddlePanelComponent implements OnInit {

    currentView: View = new View()

    height: string = '200px'
    width: string = '200px'

    constructor() { }

    ngOnInit(): void {
    }

    showVariantButton(): boolean {
        return false
    }

    showVariant(v: View) {

    }

}
