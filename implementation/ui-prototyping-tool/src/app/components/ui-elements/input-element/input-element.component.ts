import { Component, Input, OnInit } from '@angular/core';
import { InputElementProperty } from 'src/app/classes/concrete-classes';
import { InputType } from 'src/app/classes/ud-enums';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
    selector: 'app-input-element',
    templateUrl: './input-element.component.html',
    styleUrls: ['./input-element.component.scss']
})
export class InputElementComponent implements OnInit {

    @Input()
    prop!: InputElementProperty

    inputTypes: any[] = []

    constructor(private shared: CommunicationService) { }

    ngOnInit(): void {
        console.log(this.prop)
        this.inputTypes = Object.values(InputType)
    }



    updateMasterView() { 
        this.shared.saveMasterView()
    }

}
