import { Component, Input, OnInit } from '@angular/core';
import { ButtonElementProperty } from 'src/app/classes/concrete-classes';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
    selector: 'app-button-element',
    templateUrl: './button-element.component.html',
    styleUrls: ['./button-element.component.scss']
})
export class ButtonElementComponent implements OnInit {

    @Input()
    prop!: ButtonElementProperty

    constructor(private shared: CommunicationService) { }

    ngOnInit(): void {
    }

    updateMasterView() {
        this.shared.saveMasterView()
    }

}
