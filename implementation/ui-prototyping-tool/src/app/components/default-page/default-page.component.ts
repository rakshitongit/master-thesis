import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-default-page',
    templateUrl: './default-page.component.html',
    styleUrls: ['./default-page.component.scss']
})
export class DefaultPageComponent implements OnInit, OnDestroy {

    mobileQuery!: MediaQueryList;

    activate: boolean = false

    private _mobileQueryListener: () => void

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

}
