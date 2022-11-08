import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { View } from '../classes/concrete-classes';

@Injectable({
    providedIn: 'root'
})
export class CommunicationService {

    selectedElement: Subject<string> = new Subject()
    addUIElement: Subject<string> = new Subject()
    UIProperties: Subject<Object> = new Subject()
    canvasView: Subject<View> = new Subject()

    getSelectedElement() {
        return this.selectedElement
    }

    setSelectedElement(value: string) {
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
}