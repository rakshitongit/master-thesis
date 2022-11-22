import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { baseUrl } from '../../classes/abstract-classes'

@Component({
    selector: 'app-default-page',
    templateUrl: './default-page.component.html',
    styleUrls: ['./default-page.component.scss']
})
export class DefaultPageComponent implements OnInit, OnDestroy {

    mobileQuery!: MediaQueryList;

    activate: boolean = true

    private _mobileQueryListener: () => void

    elementName!: string
    toAddElement!: string

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    updateElement(elementName: string) {
        this.elementName = elementName
    }

    addElement(elementName: string) {
        this.toAddElement = elementName
    }

    deployApp() {
        // window.open(url + 'download/generate-new-app.sh', '_blank')
        window.open(baseUrl + 'no-code-app', '_blank')
    }

}
