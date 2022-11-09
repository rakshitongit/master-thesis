import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractContainer, ContainerType, Interaction } from 'src/app/classes/abstract-classes';
import { ComponentContainer, OnClickInteraction } from 'src/app/classes/concrete-classes';
import { CommunicationService } from 'src/app/services/communication.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-right-panel',
    templateUrl: './right-panel.component.html',
    styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {

    elementName!: string

    element!: AbstractContainer //AbstractProperty

    interactions: Interaction[] = []

    selectInteraction!: string

    constructor(private shared: CommunicationService, private snackbar: MatSnackBar) { }

    ngOnInit() {
        this.element = new ComponentContainer()
        this.shared.getSelectedElement().subscribe(val => {
            console.log(val)
            this.element = val
            this.elementName = val.name
            this.getProperties()
            this.selectInteraction = ''
            this.interactions = []
        })
        this.getProperties()
        this.shared.getCanvasView().subscribe(val => {
            this.element = val
            console.log(val)
            this.elementName = val.name
        })
    }

    getProperties() {
        this.shared.receiveUIProperties().subscribe(val => {
            this.element = val
            this.element.cssProperty = val.cssProperty
            console.log(val)
        })
    }

    getData() {
        return this.shared.masterView.children
    }

    getMasterData() {
        return this.shared.masterView
    }

    addNewInteraction() {
        if (this.elementName) {
            const interaction: OnClickInteraction = new OnClickInteraction();
            interaction.id = uuidv4();
            (this.element as ComponentContainer).interactions = [interaction]
            this.interactions = (this.element as ComponentContainer).interactions
            console.log(this.element)
        } else {
            this.snackbar.open('Please select an element!', 'Ok')
        }
    }

    doesNotContainInteraction(): boolean {
        return (!(this.element as ComponentContainer)?.interactions || (this.element as ComponentContainer)?.interactions?.length == 0)
    }

    displayInteractions(): boolean {
        return this.element.type == ContainerType.COMPONENT
    }

    deleteInteraction(interaction: Interaction) {
        this.interactions = this.interactions.filter(it => it.id !== interaction.id);
        (this.element as ComponentContainer).interactions = this.interactions
    }

    updateInteraction(interaction: Interaction) {
        interaction.connectionId = this.selectInteraction
        console.log(this.interactions, this.element)
    }

}
