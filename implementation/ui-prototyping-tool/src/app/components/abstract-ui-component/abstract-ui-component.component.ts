import { Component, Input, OnInit } from '@angular/core';
import { AbstractUIProperty } from 'src/app/classes/abstract-classes';
import { ButtonElementProperty, InputElementProperty, SelectElementProperty, SimpleIteratorProperty } from 'src/app/classes/concrete-classes';

@Component({
    selector: 'app-abstract-ui-component',
    templateUrl: './abstract-ui-component.component.html',
    styleUrls: ['./abstract-ui-component.component.scss']
})
export class AbstractUiComponentComponent implements OnInit {

    @Input()
    prop!: AbstractUIProperty

    @Input()
    name!: string

    constructor() { }

    ngOnInit(): void {
    }

    getInputElementProperty(): InputElementProperty {
        return this.prop as InputElementProperty
    }

    getSelectElementProperty(): SelectElementProperty {
        return this.prop as SelectElementProperty
    }

    getButtonElementProperty(): ButtonElementProperty {
        return this.prop as ButtonElementProperty
    }

    getSimpleIteratorProperty(): SimpleIteratorProperty {
        return this.prop as SimpleIteratorProperty
    }

}
