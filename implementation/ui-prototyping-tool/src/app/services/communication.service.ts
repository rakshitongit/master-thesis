import { Injectable } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { ComponentContainer, View } from '../classes/concrete-classes';
import { ViewsService } from './views.service';

@Injectable({
    providedIn: 'root'
})
export class CommunicationService {

    constructor(private viewService: ViewsService) {}

    selectedElement: Subject<any> = new Subject()
    addUIElement: Subject<string> = new Subject()
    UIProperties: Subject<any> = new Subject()
    canvasView: Subject<View> = new Subject()
    private _activateViews: Subject<boolean> = new Subject()
    private _deleteElement: Subject<ComponentContainer> = new Subject()
    private _updateCanvasProperty: Subject<View> = new Subject()

    // For experiments
    private _canvasView: Subject<View> = new Subject()

    private _masterView!: View

    set masterView(view: View) {
        this._masterView = view
        // this.viewService.saveView(view).subscribe()
    }

    get masterView(): View {
        // this.viewService.saveView(this._masterView).subscribe()
        // this.viewService.getMasterView().subscribe(v => {
        //   this._masterView = v
        // })
        return this._masterView
    }

    async saveMasterView() {
        if(this.masterView !== undefined) {
            await firstValueFrom(this.viewService.saveView(this.masterView))
        }
    }

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

    updatePropertyCanvas(val: View) {
        this._updateCanvasProperty.next(val)
    }

    getUpdatePropertyCanvas() {
        return this._updateCanvasProperty;
    }

    activateView(val: boolean) {
        this._activateViews.next(val)
    }

    getActiveView(): Subject<boolean> {
        return this._activateViews
    }
    
    setExperimentCanvasView(node: View) {
        this._canvasView.next(node)
    }

    getExperimentCanvasView(): Subject<View> {
        return this._canvasView
    }
}