import { DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, RendererFactory2, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';
import { ComponentContainer, CSSProperty } from 'src/app/classes/concrete-classes';
import { CommunicationService } from 'src/app/services/communication.service';
import { ContainerType } from 'src/app/classes/abstract-classes';

@Component({
    selector: 'app-middle-panel',
    templateUrl: './middle-panel.component.html',
    styleUrls: ['./middle-panel.component.scss']
})
export class MiddlePanelComponent implements OnInit {

    toAddElement!: string

    private renderer!: Renderer2;

    height: string = '200px'
    width: string = ''
    canvasName: string = ''

    @ViewChild('cardContent', { static: false })
    el!: ElementRef

    elementsOnCanVas: ComponentContainer[] = []

    constructor(private shared: CommunicationService, private rendererFactory: RendererFactory2, private changeDetector: ChangeDetectorRef, private drag: DragDrop, private _snackBar: MatSnackBar) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    ngOnInit() {
        this.shared.getAddUIElement().subscribe(val => {
            this.toAddElement = val
            console.log('Add element', this.toAddElement)
            if (this.canvasName == '' || this.canvasName == undefined) {
                this._snackBar.open('Please select the View!', 'Ok')
            } else {
                this.addUIElement()
            }
        })

        this.shared.getCanvasView().subscribe(val => {
            this.canvasName = val.name
            console.log("clicked ", val)
            this.el.nativeElement.textContent = ''
        })
    }

    clickme(element: ComponentContainer) {
        this.shared.setSelectedElement(element)
    }

    addUIElement() {
        let component: ComponentContainer = new ComponentContainer()
        component.name = this.toAddElement
        component.id = uuidv4()
        component.type = ContainerType.COMPONENT
        component.cssProperty = new CSSProperty().json
        console.log('Add element', this.toAddElement)
        const recaptchaContainer = this.renderer.createElement('div');
        const brel = this.renderer.createElement('br');
        let dragRef: DragRef = this.drag.createDrag(recaptchaContainer)
        dragRef.withBoundaryElement(this.el)
        this.renderer.setAttribute(recaptchaContainer, 'contenteditable', 'true')
        const text = this.renderer.createText(this.toAddElement)
        this.renderer.appendChild(recaptchaContainer, text);
        this.renderer.appendChild(this.el.nativeElement, brel);
        this.renderer.appendChild(this.el.nativeElement, recaptchaContainer);
        console.log(recaptchaContainer)
        this.renderer.addClass(recaptchaContainer, 'example-box');
        this.changeDetector.detectChanges()
        this.elementsOnCanVas.push(component)
        this.addListener(recaptchaContainer, component)
        this.getPosition(dragRef, component.id)
    }

    getPosition(dragRef: DragRef, id: string) {
        const toAdd: ComponentContainer | undefined = this.elementsOnCanVas.find(item => item.id == id)
        if (toAdd !== undefined) {
            dragRef.ended.subscribe(val => {
                toAdd.cssProperty = val
                this.shared.sendUIProperties(toAdd)
            })
        }
    }

    addListener(recaptchaContainer: Element, el: ComponentContainer) {
        this.renderer.listen(recaptchaContainer, 'click', () => {
            this.clickme(el)
        })

        this.renderer.listen(recaptchaContainer, 'keydown', (event) => {
            console.log(event.key)
            if (event.key == 'Delete' || event.key == 'Backspace') {
                recaptchaContainer.remove()
                this.shared.sendDeleteElement(el)
            }
        })
    }
}
