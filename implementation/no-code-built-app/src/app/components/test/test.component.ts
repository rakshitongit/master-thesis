import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-test-component',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {

    // // the measurements defined by the feature model
    // measurements: Measurement[] = []

    // // the parameters defined by the feature model
    // parameters: Parameter[] = []

    // Name of the feature which is has multiple variants
    // subFeatureName: string = ''

    // The main feature id (this is used whenever there are multiple feature models)
    // featureId: string = ''
    property = {"height":"400","width":"550"}
    elements = [{"type":"COMPONENT","name":"Button","id":"6f7248d1-8cdf-44e0-b0b6-8ddcc306db33","cssProperty":{"dropPoint":{"x":"727","y":257}},"interactions":[{"action":"NAVIGATE","connector":"VIEW","id":"7354331e-5dae-4c24-87ef-7735760aa7b4","connectionId":"9c1e4db5-24bf-4a38-84f3-050313d25beb"}],"property":{"isDisabled":"true","btnName":"Disable check"}},{"type":"COMPONENT","name":"Input","id":"6225740e-a81b-4296-8266-4554dfc6f3ca","cssProperty":{"dropPoint":{"x":"727","y":303}},"property":{"labelText":"password test","type":"password"}}]

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