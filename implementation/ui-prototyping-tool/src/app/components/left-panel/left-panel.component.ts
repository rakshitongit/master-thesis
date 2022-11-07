import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-left-panel',
    templateUrl: './left-panel.component.html',
    styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

    @Input('activate') activate!: boolean

    constructor() { }

    ngOnInit(): void {
    }

    dummy() {}

}
