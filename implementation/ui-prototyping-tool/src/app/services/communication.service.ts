import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommunicationService {

    selectedElement: Subject<string> = new Subject()
    addUIElement: Subject<string> = new Subject()
    UIProperties: Subject<Object> = new Subject()

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
}