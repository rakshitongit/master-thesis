import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-default',
    styleUrls: ['./default.component.scss'],
    templateUrl: './default.component.html'
})
export class DefaultComponent implements OnInit, OnDestroy {

    mobileQuery!: MediaQueryList;

    activate: boolean = true

    private _mobileQueryListener: () => void

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    
    
    async ngOnInit() {
        
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

}