import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ComponentContainer, View } from '../classes/concrete-classes';

@Injectable({
    providedIn: 'root'
})
export class CommunicationService {

    selectedElement: Subject<any> = new Subject()
    addUIElement: Subject<string> = new Subject()
    UIProperties: Subject<any> = new Subject()
    canvasView: Subject<View> = new Subject()
    private _deleteElement: Subject<ComponentContainer> = new Subject()

    masterView!: View

    getSelectedElement() {
        return this.selectedElement
    }

    setSelectedElement(value: any) {
        this.selectedElement.next(value)
    }

    setAddUIElement(value: string) {
        this.addUIElement.next(value)
    }

    sendUIProperties(val: Object) {
        this.UIProperties.next(val)
    }

    receiveUIProperties() {
        return this.UIProperties
    }

    getAddUIElement() {
        return this.addUIElement
    }

    setCanvasView(val: View) {
        this.canvasView.next(val)
    }

    getCanvasView() {
        return this.canvasView
    }

    sendDeleteElement(val: ComponentContainer) {
        this._deleteElement.next(val)
    }

    getDeleteElement() {
        return this._deleteElement
    }
}