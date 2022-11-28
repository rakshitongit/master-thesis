import { Component, Input, OnInit } from '@angular/core';
import { AbstractContainer, AbstractUIProperty, Interaction } from 'src/app/classes/abstract-classes';
import { ComponentContainer, CSSProperty, Variant, View } from 'src/app/classes/concrete-classes';
import { ContainerType } from 'src/app/classes/ud-enums';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
    selector: 'app-experiment-right-panel',
    templateUrl: './experiment-right-panel.component.html',
    styleUrls: ['./experiment-right-panel.component.scss']
})
export class ExperimentRightPanelComponent implements OnInit {

    @Input('currentVariant')
    currentVariant!: Variant

    elementName!: string

    element!: AbstractContainer

    interactions: Interaction[] = []

    selectInteraction!: string

    showHeightWidth: boolean = false

    showElementProperty: boolean = false

    constructor(private shared: CommunicationService) { }

    ngOnInit(): void {
        this.element = new ComponentContainer()
        this.updateCanvasView()
        this.updateSelectedElement()
    }

    updateCanvasView() {
        this.shared.getExperimentCanvasView().subscribe(val => {
            this.element = val
            this.elementName = val.name
            if (this.element.type == ContainerType.VIEW) {
                if (this.element.cssProperty == undefined) {
                    this.element.cssProperty = new CSSProperty().json
                    this.element.cssProperty.height = 200
                }
                setTimeout(() => this.showHeightWidth = true, 100)
                this.showElementProperty = false
            } else {
                this.showHeightWidth = false
                this.showElementProperty = true
            }
            this.updateMasterView()  
        })
    }

    getData() {
        return this.currentVariant.masterView.children
    }

    updateSelectedElement() {
        this.shared.getExperimentSelectedElement().subscribe(val => {
            this.showHeightWidth = false
            this.element = val
            this.elementName = val.name
            // this.getProperties()
            if ((this.element as ComponentContainer)?.interactions?.length > 0) {
                this.selectInteraction = (this.element as ComponentContainer).interactions[0].connectionId
            } else {
                this.selectInteraction = ''
            }
            this.interactions = (this.element as ComponentContainer).interactions
            this.showElementProperty = true
        })
    }

    getMasterData() {
        return this.currentVariant.masterView
    }

    updateMasterView() {
        this.shared.saveVariantExperiment(this.currentVariant)
    }

    updateDimention() {
        this.shared.updateExperimentPropertyCanvas((this.element as View))
        this.updateMasterView()
    }

    getUIProperty(): AbstractUIProperty {
        return (this.element.property as AbstractUIProperty)
    }

    updateInteraction(interaction: Interaction) {
        interaction.connectionId = this.selectInteraction
        this.updateMasterView()
    }

    deleteInteraction(interaction: Interaction) {
        this.interactions = this.interactions.filter(it => it.id !== interaction.id);
        (this.element as ComponentContainer).interactions = this.interactions
        this.selectInteraction = ''
        this.updateMasterView()
    }

    displayInteractions(): boolean {
        return this.element.type == ContainerType.COMPONENT
    }

}
