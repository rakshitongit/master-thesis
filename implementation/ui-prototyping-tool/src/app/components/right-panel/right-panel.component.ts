import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractContainer, AbstractUIProperty, Interaction } from 'src/app/classes/abstract-classes';
import { ButtonElementProperty, ComponentContainer, CSSProperty, GridIteratorProperty, InputElementProperty, OnClickInteraction, SelectElementProperty, SimpleIteratorProperty, View } from 'src/app/classes/concrete-classes';
import { ContainerType, UIElements } from 'src/app/classes/ud-enums';
import { CommunicationService } from 'src/app/services/communication.service';
import { ViewsService } from 'src/app/services/views.service';
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

    showElementProperty: boolean = false

    constructor(private shared: CommunicationService, private snackbar: MatSnackBar, private viewService: ViewsService) { }

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
                if (this.element.cssProperty == undefined) {
                    this.element.cssProperty = new CSSProperty().json
                    this.element.cssProperty.height = '200'
                }
                setTimeout(() => this.showHeightWidth = true, 100)
                this.showElementProperty = false
            } else {
                this.showHeightWidth = false
                this.showElementProperty = true
            }
            this.shared.saveMasterView()
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
            // this.shared.saveMasterView()
            this.interactions = (this.element as ComponentContainer).interactions
            this.addConcreteUIProperties()
            this.showElementProperty = true
        })
    }

    addConcreteUIProperties() {
        if (this.element.property == undefined) {
            switch (this.element.name) {
                case UIElements.BUTTON:
                    (this.element as ComponentContainer).property = new ButtonElementProperty()
                    break
                case UIElements.INPUT:
                    (this.element as ComponentContainer).property = new InputElementProperty()
                    break
                case UIElements.SELECT:
                    (this.element as ComponentContainer).property = new SelectElementProperty()
                    break
                case UIElements.SIMPLE_ITERATOR:
                    (this.element as ComponentContainer).property = new SimpleIteratorProperty()
                    break
                case UIElements.GRID_ITERATOR:
                    (this.element as ComponentContainer).property = new GridIteratorProperty()
                    break
            }
        }
    }

    updateDimention() {
        this.shared.updatePropertyCanvas((this.element as View))
        this.shared.saveMasterView()
    }

    getProperties() {
        this.shared.receiveUIProperties().subscribe(val => {
            this.showHeightWidth = false
            this.element = val
            this.elementName = this.element.name
            this.element.cssProperty = val.cssProperty
        })
        console.log(this.shared.masterView)
        this.shared.saveMasterView()
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

    updateMasterView() {
        this.shared.saveMasterView()
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
        this.shared.saveMasterView()
    }

    getUIProperty(): AbstractUIProperty {
        return (this.element.property as AbstractUIProperty)
    }

}
