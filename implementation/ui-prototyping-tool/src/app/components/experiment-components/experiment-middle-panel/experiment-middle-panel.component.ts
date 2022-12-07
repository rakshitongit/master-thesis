import { DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, RendererFactory2, ViewChild } from '@angular/core';
import { ComponentContainer, CSSProperty, Variant, View } from 'src/app/classes/concrete-classes';
import { ContainerType } from 'src/app/classes/ud-enums';
import { CommunicationService } from 'src/app/services/communication.service';
import { ExperimentsService } from 'src/app/services/experiments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-experiment-middle-panel',
    templateUrl: './experiment-middle-panel.component.html',
    styleUrls: ['./experiment-middle-panel.component.scss']
})
export class ExperimentMiddlePanelComponent implements OnInit {

    currentView: View = new View()

    private renderer!: Renderer2;

    toAddElement!: string

    @Input('currentVariant')
    currentVariant!: Variant

    @ViewChild('cardContent', { static: false })
    el!: ElementRef

    height: string = '200px'
    width: string = '200px'

    elementsOnCanVas: ComponentContainer[] = []

    constructor(private shared: CommunicationService, private changeDetector: ChangeDetectorRef, private rendererFactory: RendererFactory2, private drag: DragDrop, private eService: ExperimentsService, private _snackBar: MatSnackBar) {
        this.getExperimentCanvasView()
        this.updateCanvas()
        this.addUIElementEvent()
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    ngOnInit(): void {
    }

    addUIElementEvent() {
        this.shared.getAddUIElementExperiment().subscribe(val => {
            this.toAddElement = val
            if (this.currentView.name == '' || this.currentView.name == undefined) {
                this._snackBar.open('Please select the View!', 'Ok')
            } else {
                this.addUIElement()
            }
        })
    }

    getExperimentCanvasView() {
        this.shared.getExperimentCanvasView().subscribe(view => {
            this.currentView = view
            this.getUIElementsForCurrentView(this.currentView)
            // this.variantBtn = true
            this.changeDetector.detectChanges()
        })
    }

    updateCanvas() {
        this.shared.getExperimentPropertyCanvas().subscribe((val: View) => {
            this.height = val.cssProperty.height
            this.width = val.cssProperty.width
        })
    }

    getUIElementsForCurrentView(view: View) {
        this.el.nativeElement.innerHTML = ''
        this.height = (view.cssProperty?.height || '200')
        this.width = view.cssProperty?.width || '200'
        const elLeft = this.el.nativeElement.getBoundingClientRect().left
        const elTop = this.el.nativeElement.getBoundingClientRect().top
        for (let el of view.elements) {
            let dist: any = { x: 0, y: 0 }
            dist.x = el.cssProperty?.dropPoint?.x - elLeft - 45
            dist.y = el.cssProperty?.dropPoint?.y - elTop - 10
            const recaptchaContainer = this.renderer.createElement('div');
            let dragRef: DragRef = this.drag.createDrag(recaptchaContainer)
            dragRef.withBoundaryElement(this.el)
            dragRef.setFreeDragPosition(dist)
            this.renderer.setAttribute(recaptchaContainer, 'contenteditable', 'true')
            const text = this.renderer.createText(el.name)
            this.renderer.appendChild(recaptchaContainer, text);
            this.renderer.appendChild(this.el.nativeElement, recaptchaContainer);
            this.renderer.addClass(recaptchaContainer, 'example-box');
            this.changeDetector.detectChanges()
            this.elementsOnCanVas.push(el)
            this.addListener(recaptchaContainer, el)
            this.getPosition(dragRef, el.id)
        }
    }

    getPosition(dragRef: DragRef, id: string) {
        const toAdd: ComponentContainer | undefined = this.elementsOnCanVas.find(item => item.id == id)
        if (toAdd !== undefined) {
            dragRef.ended.subscribe(val => {
                toAdd.cssProperty.dropPoint = val.dropPoint
                // this.shared.sendUIProperties(toAdd)
                this.updateMasterView()
            })
        }
    }

    addListener(recaptchaContainer: Element, el: ComponentContainer) {
        this.renderer.listen(recaptchaContainer, 'click', () => {
            this.shared.setExperimentSelectedElement(el)
        })

        this.renderer.listen(recaptchaContainer, 'keydown', (event) => {
            console.log(event.key)
            if (event.key == 'Delete' || event.key == 'Backspace') {
                recaptchaContainer.remove()
                this.currentView.elements = this.currentView.elements.filter(e => e.id !== el.id)
                // if(this.currentVariant) {
                //     this.currentVariant.elements = this.currentVariant.elements.filter(e => e.id !== el.id)
                // } else {
                //     this.currentView.elements = this.currentView.elements.filter(e => e.id !== el.id)
                // }
                // this.shared.sendDeleteElement(el)
                this.updateMasterView()
            }
        })
    }

    updateMasterView() {
        console.log(this.currentVariant)
        this.shared.saveVariantExperiment(this.currentVariant)
    }

    showVariantButton(): boolean {
        return this.currentView.variants?.length > 0
    }

    addUIElement() {
        let component: ComponentContainer = new ComponentContainer()
        component.name = this.toAddElement
        component.id = uuidv4()
        component.type = ContainerType.COMPONENT
        component.cssProperty = new CSSProperty().json
        const recaptchaContainer = this.renderer.createElement('div');
        const brel = this.renderer.createElement('br');
        let dragRef: DragRef = this.drag.createDrag(recaptchaContainer)
        dragRef.withBoundaryElement(this.el)
        this.renderer.setAttribute(recaptchaContainer, 'contenteditable', 'true')
        const text = this.renderer.createText(this.toAddElement)
        this.renderer.appendChild(recaptchaContainer, text);
        this.renderer.appendChild(this.el.nativeElement, recaptchaContainer);
        this.renderer.appendChild(this.el.nativeElement, brel);
        console.log(recaptchaContainer)
        this.renderer.addClass(recaptchaContainer, 'example-box');
        this.changeDetector.detectChanges()
        this.elementsOnCanVas.push(component)
        this.addListener(recaptchaContainer, component)
        this.getPosition(dragRef, component.id)
        this.addElementToView(component)
    }

    addElementToView(component: ComponentContainer) {
        if (this.currentVariant) {
            this.currentVariant.masterView.children.forEach(el => {
                if (el.variants?.map(t => t.id).includes(this.currentVariant.id)) {
                    const variant = el.variants.filter(v => v.id == this.currentVariant.id)[0]
                    variant.elements.push(component)
                }
            })
        }
        this.shared.saveVariantExperiment(this.currentVariant)
    }

}
