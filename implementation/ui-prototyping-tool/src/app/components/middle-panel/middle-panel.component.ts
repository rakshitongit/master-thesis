import { DragAxis, DragConstrainPosition, DragDrop, DragDropConfig, DragDropModule, DragRef } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, RendererFactory2, ViewChild } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
    selector: 'app-middle-panel',
    templateUrl: './middle-panel.component.html',
    styleUrls: ['./middle-panel.component.scss']
})
export class MiddlePanelComponent implements OnInit {

    toAddElement!: string

    private renderer!: Renderer2;

    @ViewChild('cardContent', { static: false })
    el!: ElementRef

    constructor(private shared: CommunicationService, private rendererFactory: RendererFactory2, private changeDetector: ChangeDetectorRef, private drag: DragDrop) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    ngOnInit() {
        this.shared.getAddUIElement().subscribe(val => {
            this.toAddElement = val
            console.log('Add element', this.toAddElement)
            this.addUIElement()
            // call dynamic caller
        })
    }

    clickme(elementName: string) {
        this.shared.setSelectedElement(elementName)
    }

    addUIElement() {
        console.log('Add element', this.toAddElement)
        // Use Angular's Renderer2 to create the div element
        const recaptchaContainer = this.renderer.createElement('div');
        const brel = this.renderer.createElement('br');
        let dragRef: DragRef = this.drag.createDrag(recaptchaContainer)
        this.renderer.setAttribute(recaptchaContainer, 'cdkDrag', '')
        const text = this.renderer.createText(this.toAddElement)
        // this.renderer(recaptchaContainer, 'div elememnt')
        this.renderer.appendChild(recaptchaContainer, text);
        this.renderer.appendChild(this.el.nativeElement, brel);
        this.renderer.appendChild(this.el.nativeElement, recaptchaContainer);
        console.log(recaptchaContainer)
        this.renderer.addClass(recaptchaContainer, 'example-box');
        this.changeDetector.detectChanges()
        this.addListener(recaptchaContainer, this.toAddElement)
        this.getPosition(dragRef)
    }

    getPosition(dragRef: DragRef) {
        dragRef.ended.subscribe(val => {
            this.shared.sendUIProperties(val)
        })
    }

    addListener(recaptchaContainer: Element, elName: string) {
        this.renderer.listen(recaptchaContainer, 'click', () => {
            this.clickme(elName)
        })
    }

}
