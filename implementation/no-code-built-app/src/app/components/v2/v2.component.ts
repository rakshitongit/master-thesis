import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-v2-component',
	templateUrl: './v2.component.html',
	styleUrls: ['./v2.component.scss'],
})
export class V2Component implements OnInit {

    // // the measurements defined by the feature model
    // measurements: Measurement[] = []

    // // the parameters defined by the feature model
    // parameters: Parameter[] = []

    // Name of the feature which is has multiple variants
    // subFeatureName: string = ''

    // The main feature id (this is used whenever there are multiple feature models)
    // featureId: string = ''
    property = {"height":"400","width":"400"}
    elements = [{"type":"COMPONENT","name":"Button","id":"1e0ed5a9-63be-49c9-96db-e63627eba393","cssProperty":{"dropPoint":{"x":"775","y":264}},"property":{"btnName":"Go to Test","isDisabled":"false"},"interactions":[{"action":"NAVIGATE","connector":"VIEW","id":"ea288944-7eab-44ec-b7a8-1682b2b75809","connectionId":"9c1e4db5-24bf-4a38-84f3-050313d25beb"}]}]

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