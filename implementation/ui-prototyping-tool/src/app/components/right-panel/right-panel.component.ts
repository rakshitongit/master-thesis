import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractContainer, AbstractUIProperty, ContainerType, Interaction } from 'src/app/classes/abstract-classes';
import { ButtonElementProperty, ComponentContainer, CSSProperty, InputElementProperty, OnClickInteraction, SelectElementProperty, View } from 'src/app/classes/concrete-classes';
import { UIElements } from 'src/app/classes/ud-enums';
import { CommunicationService } from 'src/app/services/communication.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-right-panel',
    templateUrl: './right-panel.component.html',
    styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {

    elementName!: string

    element!: AbstractContainer

    interactions: Interaction[] = []

    selectInteraction!: string

    showHeightWidth: boolean = false

    constructor(private shared: CommunicationService, private snackbar: MatSnackBar) { }

    ngOnInit() {
        this.element = new ComponentContainer()
        this.updateSelectedElement()
        this.getProperties()
        this.updateCanvasView()
        this.updateDeletionUIElement()
    }

    updateDeletionUIElement() {
        this.shared.getDeleteElement().subscribe(val => {
            // delete properties of that element
            this.interactions = []
            this.element = new ComponentContainer()
            console.log('Deletes')
        })
    }

    updateCanvasView() {
        this.shared.getCanvasView().subscribe(val => {
            this.element = val
            this.elementName = val.name
            if (this.element.type == ContainerType.VIEW) {
                console.log("Hex", this.element.cssProperty)
                if (this.element.cssProperty == undefined) {
                    this.element.cssProperty = new CSSProperty().json
                    this.element.cssProperty.height = '200'
                }
                setTimeout(() => this.showHeightWidth = true, 100)
            } else {
                this.showHeightWidth = false
            }
        })
    }

    updateSelectedElement() {
        this.shared.getSelectedElement().subscribe(val => {
            this.showHeightWidth = false
            this.element = val
            this.elementName = val.name
            this.getProperties()
            if ((this.element as ComponentContainer)?.interactions?.length > 0) {
                this.selectInteraction = (this.element as ComponentContainer).interactions[0].connectionId
            } else {
                this.selectInteraction = ''
            }
            console.log(this.element, this.shared.masterView)
            this.interactions = (this.element as ComponentContainer).interactions
            this.addConcreteUIProperties()
        })
    }

    addConcreteUIProperties() {
        switch (this.element.name) {
            case UIElements.BUTTON:
                this.element.property = new ButtonElementProperty()
                break
            case UIElements.INPUT:
                this.element.property = new InputElementProperty()
                break
            case UIElements.SELECT:
                this.element.property = new SelectElementProperty()
                break
        }
    }

    updateDimention() {
        this.shared.updatePropertyCanvas((this.element as View))
    }

    getProperties() {
        this.shared.receiveUIProperties().subscribe(val => {
            this.showHeightWidth = false
            this.element = val
            this.elementName = this.element.name
            this.element.cssProperty = val.cssProperty
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
        this.selectInteraction = ''
    }

    updateInteraction(interaction: Interaction) {
        interaction.connectionId = this.selectInteraction
    }

}
