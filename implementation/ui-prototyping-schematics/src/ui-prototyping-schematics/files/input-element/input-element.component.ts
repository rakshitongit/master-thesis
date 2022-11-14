
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-input-element',
    styleUrls: ['./input-element.component.scss'],
    templateUrl: './input-element.component.html'
})
export class InputElementComponent implements OnInit {

    @Input()
    prop: any

    constructor() {
    }
    
    
    async ngOnInit() {
        
    }

}