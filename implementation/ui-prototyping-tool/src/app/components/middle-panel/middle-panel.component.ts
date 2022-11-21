import { DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, RendererFactory2, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';
import { ComponentContainer, CSSProperty, View } from 'src/app/classes/concrete-classes';
import { CommunicationService } from 'src/app/services/communication.service';
import { ContainerType } from 'src/app/classes/ud-enums';

@Component({
    selector: 'app-middle-panel',
    templateUrl: './middle-panel.component.html',
    styleUrls: ['./middle-panel.component.scss']
})
export class MiddlePanelComponent implements OnInit {

    toAddElement!: string

    private renderer!: Renderer2;

    height: string = '200px'
    width: string = '200px'
    currentView!: View

    @ViewChild('cardContent', { static: false })
    el!: ElementRef

    elementsOnCanVas: ComponentContainer[] = []

    constructor(private shared: CommunicationService, private rendererFactory: RendererFactory2, private changeDetector: ChangeDetectorRef, private drag: DragDrop, private _snackBar: MatSnackBar) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    ngOnInit() {
        this.currentView = new View()
        this.shared.getAddUIElement().subscribe(val => {
            this.toAddElement = val
            console.log('Add element', this.toAddElement)
            if (this.currentView.name == '' || this.currentView.name == undefined) {
                this._snackBar.open('Please select the View!', 'Ok')
            } else {
                this.addUIElement()
            }
        })

        this.shared.getCanvasView().subscribe(val => {
            // console.log(this.el)
            this.el.nativeElement.innerHTML = ''
            this.currentView = val
            this.height = (this.currentView.cssProperty?.height || '200')
            this.width = this.currentView.cssProperty?.width || '200'
            this.getUIElementsForCurrentView()
            this.changeDetector.detectChanges()
        })

        this.shared.getUpdatePropertyCanvas().subscribe((val: View) => {
            this.height = val.cssProperty.height
            this.width = val.cssProperty.width
        })
    }

    getUIElementsForCurrentView() {
        const elLeft = this.el.nativeElement.getBoundingClientRect().left
        const elTop = this.el.nativeElement.getBoundingClientRect().top
        for (let el of this.currentView.elements) {
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
            // this.addElementToView(el)
        }
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
        if (this.shared.masterView.id == this.currentView.id) {
            this.shared.masterView.elements.push(component)
        } else {
            // check children
            this.shared.masterView.children.forEach(el => {
                if (el.id === this.currentView.id) {
                    el.elements.push(component)
                }
            })
        }
        this.shared.saveMasterView()
    }

    getPosition(dragRef: DragRef, id: string) {
        const toAdd: ComponentContainer | undefined = this.elementsOnCanVas.find(item => item.id == id)
        if (toAdd !== undefined) {
            dragRef.ended.subscribe(val => {
                toAdd.cssProperty.dropPoint = val.dropPoint
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
                this.currentView.elements = this.currentView.elements.filter(e => e.id !== el.id)
                this.shared.sendDeleteElement(el)
                this.updateMasterView()
            }
        })
    }

    updateMasterView() {
        if(this.currentView.id !== this.shared.masterView.id) {
            this.shared.masterView.children.forEach(el => {
                if (el.id === this.currentView.id) {
                    el = this.currentView
                }
            })
        }
        this.shared.saveMasterView()
    }
}
