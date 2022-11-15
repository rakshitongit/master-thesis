import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-abstract-element',
    styleUrls: ['./abstract-element.component.scss'],
    templateUrl: './abstract-element.component.html'
})
export class AbstractElementComponent implements OnInit {

    @Input()
    prop: any

    constructor() {
    }
    
    
    async ngOnInit() {
        
    }

}