import { DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, RendererFactory2, ViewChild } from '@angular/core';
import { ComponentContainer, Variant, View } from 'src/app/classes/concrete-classes';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
    selector: 'app-experiment-middle-panel',
    templateUrl: './experiment-middle-panel.component.html',
    styleUrls: ['./experiment-middle-panel.component.scss']
})
export class ExperimentMiddlePanelComponent implements OnInit {

    currentView: View = new View()

    private renderer!: Renderer2;

    @Input('currentVariant')
    currentVariant!: Variant

    @ViewChild('cardContent', { static: false })
    el!: ElementRef

    height: string = '200px'
    width: string = '200px'

    elementsOnCanVas: ComponentContainer[] = []

    constructor(private shared: CommunicationService, private changeDetector: ChangeDetectorRef, private rendererFactory: RendererFactory2, private drag: DragDrop,) {
        this.getExperimentCanvasView()
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    ngOnInit(): void {
    }

    getExperimentCanvasView() {
        this.shared.getExperimentCanvasView().subscribe(view => {
            this.currentView = view
            this.getUIElementsForCurrentView(this.currentView)
            // this.variantBtn = true
            this.changeDetector.detectChanges()
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
            })
        }
    }

    addListener(recaptchaContainer: Element, el: ComponentContainer) {
        this.renderer.listen(recaptchaContainer, 'click', () => {
            // this.clickme(el)
        })

        this.renderer.listen(recaptchaContainer, 'keydown', (event) => {
            console.log(event.key)
            if (event.key == 'Delete' || event.key == 'Backspace') {
                recaptchaContainer.remove()
                // if(this.currentVariant) {
                //     this.currentVariant.elements = this.currentVariant.elements.filter(e => e.id !== el.id)
                // } else {
                //     this.currentView.elements = this.currentView.elements.filter(e => e.id !== el.id)
                // }
                // this.shared.sendDeleteElement(el)
                // this.updateMasterView()
            }
        })
    }

    showVariantButton(): boolean {
        return false
    }

    showVariant(v: View) {

    }

}
