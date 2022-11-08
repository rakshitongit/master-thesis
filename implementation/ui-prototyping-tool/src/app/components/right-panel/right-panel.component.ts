import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AbstractProperty } from 'src/app/classes/abstract-classes';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
    selector: 'app-right-panel',
    templateUrl: './right-panel.component.html',
    styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {

    elementName!: string

    element!: any //AbstractProperty

    constructor(private shared: CommunicationService) { }

    ngOnInit() {
        this.shared.getSelectedElement().subscribe(val => {
            this.elementName = val
            this.getProperties()
        })
        this.shared.receiveUIProperties().subscribe(val=> {
            this.element = val
            console.log(val)
        })
        // get element property
    }

    getProperties() {
        this.shared.receiveUIProperties().subscribe(val=> {
            this.element = val
            console.log(val)
        })
    }

}
