import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-v1-component',
	templateUrl: './v1.component.html',
	styleUrls: ['./v1.component.scss'],
})
export class V1Component implements OnInit {

    // // the measurements defined by the feature model
    // measurements: Measurement[] = []

    // // the parameters defined by the feature model
    // parameters: Parameter[] = []

    // Name of the feature which is has multiple variants
    // subFeatureName: string = ''

    // The main feature id (this is used whenever there are multiple feature models)
    // featureId: string = ''
    property = {"height":"300","width":"600"}
    elements = []

    // This component does not have any variants
    constructor() { }
	
    async ngOnInit() {
        try {
            this.property.height = (parseInt(this.property.height) * 2).toString()
            this.property.width = (parseInt(this.property.width) * 2).toString()
            // this.property.width = this.property.width * 2 
        } catch(e) {
            console.error(e)
        }
    }
}