
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-button-element',
    styleUrls: ['./button-element.component.scss'],
    templateUrl: './button-element.component.html'
})
export class ButtonElementComponent implements OnInit {

    @Input()
    prop: any

    constructor() {
    }
    
    
    async ngOnInit() {
        
    }

}